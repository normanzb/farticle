define(['cogs'], function  (cogs) {
    var EX_TYPE_ERR = 'Type err';
    var undef;

    function typeCheck(item){
        var me =this;
        if (me._type && !(item instanceof me._type)){
            throw EX_TYPE_ERR;
        }
    }

    function onAutoSortAdd(item){
        var me = this;
        var func = me._autoSort;
        var cur, ret;
        me._innerCall = true;

        for(var l = me.array.length; l--; ){
            cur = me.array[l];
            ret = func.call(me, cur, item);

            if (ret <= 0 || l <= 0){
                break;
            }
        }

        me.splice(l, 0, item);

        me._innerCall = false;
    }

    var Ctor = cogs.ctor(function(type){
        var me = this;

        me._type = type;
        me._autoSort = null;
        me._lock = false;
        me._lockedCalls = [];

        me.array = Array.apply(null, Array.prototype.slice.call(arguments).shift());

        /**
         * Fire when an item being added
         */
        me.onAdd = cogs.event();

        /**
         * Fire when an item is added
         */
        me.onAdded = cogs.event();

        /**
         * Fire when an item being removed
         */
        me.onRemove = cogs.event();

        /**
         * Fire when an item is removed
         */
        me.onRemoved = cogs.event();

        /**
         * Fire when 2 item swapped
         **/
        me.onSwap = cogs.event();

        /**
         * Fire when large chunk of data are swapped 
         */
        me.onRefreshed = cogs.event();
    });

    return cogs.mixin(Ctor, cogs.emittable, {
        item: function(index, value){
            var me = this;
            if (arguments.length <= 1){
                return me.array[index];
            }
            else{
                var removeItem = me.array[index];

                if (value == removeItem){
                    return;
                }

                var evt = {
                    index: index,
                    item: removeItem
                };

                me.emit('remove', me, evt);
                me.array[index] = null;
                me.emit('removed', me, evt);
                 
                evt = {
                    index: index,
                    item: value
                };

                me.emit('add', me, evt);
                me.array[index] = value;
                me.emit('added', me, evt);
            }
        },
        push: function(item){
            var me = this;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'push',
                    context: me,
                    args: arguments
                });
                return;
            }

            var index = me.array.length;
            var evt = {
                item: item,
                index: index
            };

            typeCheck.call(me, item);

            if (me._autoSort){
                onAutoSortAdd.call(me, item);
                return;
            }

            me.emit('add', me, evt);
            me.array.push(item);
            me.emit('added', me, evt);
        },
        pop: function(){
            var me = this;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'pop',
                    context: me,
                    args: arguments
                });
                return;
            }

            var index = me.array.length - 1;
            var item = me.array[index];
            var evt = {
                item: item,
                index: index
            };

            me.emit('remove', me, evt);
            me.array.pop();
            me.emit('removed', me, evt);
        },
        unshift: function(item){
            var me = this;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'unshift',
                    context: me,
                    args: arguments
                });
                return;
            }

            var index = 0;
            var evt = {
                item: item,
                index: index
            };

            typeCheck.call(me, item);

            if (me._autoSort){
                onAutoSortAdd.call(me, item);
                return;
            }

            me.emit('add', me, evt);
            me.array.unshift(item);
            me.emit('added', me, evt);
        },
        shift: function(){
            var me = this;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'shift',
                    context: me,
                    args: arguments
                });
                return;
            }

            var index = 0;
            var item = me.array[index];
            var evt = {
                item: item,
                index: index
            };

            me.emit('remove', me, evt);
            me.array.shift();
            me.emit('removed', me, evt);
        },
        splice: function(start, len, item){
            var me = this;
            var evt;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'splice',
                    context: me,
                    args: arguments
                });
                return;
            }

            for(var l = len; l--; ){
                evt = {
                    item: me.array[l + start],
                    index: start + l
                };
                me.emit('remove', me, evt);

                me.array.splice(evt.index, 1);

                me.emit('removed', me, evt);
            }

            // TODO: handle more items
            if (!item){
                return;
            }

            if (me._autoSort && me._innerCall != true){
                onAutoSortAdd.call(me, item);
                return;
            }

            evt = {
                item: item,
                index: start
            };

            me.emit('add', me, evt);

            me.array.splice(evt.index, 0, evt.item);

            me.emit('added', me, evt);
        },
        indexOf: function(){
            var me = this;

            return me.array.indexOf(item);
        },
        has: function(item){
            var me = this;

            var idx = me.array.indexOf(item);

            return idx >= 0? true : false;
        },
        sort: function(func){
            var me = this;
            var index = 0;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'sort',
                    context: me,
                    args: arguments
                });
                return;
            }

            var wrap = function(a, b){
                var ret = func.apply(this, arguments);
                var evt = {
                    a: a,
                    b: b
                };
                if (ret > 0){
                    me.emit('swap', me, evt);
                }

                return ret;
            }

            me.array.sort(wrap);
            me.emit('refreshed', me);
        },
        forEach: function(func, thisArg){
            var context = thisArg || this;

            return this.array.forEach(func, context);
        }, 
        reverseEach: function(func, thisArg){
            var context = thisArg || this;

            for(var l = this.array.length; l--;){
                func.call(context, this.array[l], l);
            }
        }, 
        clear: function(){
            var me = this;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'clear',
                    context: me,
                    args: arguments
                });
                return;
            }

            me.length = 0;
        },
        clone: function(source){
            var me = this;
            
            if (source){
                Array.prototype.forEach.call(source, function(item, index){
                    me.push(item);
                });
            }
        },
        get lock(){
            return this._lock;
        },
        set lock(value){
            var me = this;
            var call, descriptor, func;

            if (me._lock == value){
                return;
            }

            me._lock = value;

            if (value == false){
                for(var l = me._lockedCalls.length; l--;){
                    call = me._lockedCalls[l];

                    descriptor = Object.getOwnPropertyDescriptor(Ctor.prototype, call.name);
                    func = descriptor.get || descriptor.value;
                    func.apply(call.context, call.args);
                    // console.log(me.length,call.name,  call.args)
                }

                me._lockedCalls.length = 0;
            }
        },
        get autoSort(){
            return this._autoSort;
        },
        set autoSort(value){
            if (typeof value != 'function'){
                throw 'autoSort must be a function';
            }

            if (this._autoSort == value){
                return;
            }

            this._autoSort = value;
            this.sort(value);
        },
        get length(){
            var me = this;
            return me.array.length;
        },
        set length(len){
            var me = this;

            if (me._lock){
                me._lockedCalls.unshift({
                    name: 'length',
                    context: me,
                    args: arguments
                });
                return;
            }

            if (len > me.array.length){
                // TODO: implement the creation logic here
                return;
            }

            for(var l = me.array.length; l--; ){
                if (l < len){
                    break;
                }

                me.emit('removed', me, me.array[l], l);
            }
            me.array.length = len;
        }
    });
});