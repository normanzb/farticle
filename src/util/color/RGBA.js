define(['cogs', './RGB', '../color'], function(cogs, RGB, color) {
    
    var Ctor = cogs.ctor(function(r, g, b, a){
        
        if (a == null){
            a = color.MIN;
        }

        this._a = a > color.MAX ? color.MAX : a;

    }, RGB);

    return cogs.mixin(Ctor, {
        get alpha(){
            return this._a;
        },
        set alpha(value){
            this._a = value;
        },
        valueOf: function(){
            var me = this;
            var ret = RGB.prototype.valueOf.call(me);

            ret &= (me._a << 24);

            return ret;
        },
        toString: function(type){
            var me = this;

            if (!type){
                type = 'hex';
            }

            type = type.toLowerCase();

            switch(type){
                case 'rgba':
                case 'css3':
                    return 'rgba(' + 
                        ~~me._r + ',' + 
                        ~~me._g + ',' + 
                        ~~me._b + ',' + 
                        (me._a / 255).toFixed(3) + ')';
                case 'css2':
                    return (me.valueOf() & 0x00FFFFFF).toString(16);
                case 'hex': 
                default: 
                    return me.valueOf().toString(16);
            }
        }
    });
});