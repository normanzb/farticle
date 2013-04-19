define(['cogs', './Base', '../color'], function(cogs, BaseColor, color) {
    
    var Ctor = cogs.ctor(function(r, g, b){

        if (r == null){
            r = color.MIN;
        }
        if (g == null){
            g = color.MIN;
        }
        if (b == null){
            b = color.MIN;
        }

        this._r = r > color.MAX ? color.MAX : r;
        this._g = g > color.MAX ? color.MAX : g;
        this._b = b > color.MAX ? color.MAX : b;

    }, BaseColor);

    return cogs.mixin(Ctor, {
        valueOf: function(){
            var me = this;
            var ret = me._b;

            ret &= (me._g << 8);
            ret &= (me._b << 16);

            return ret;
        },
        toString: function(type){
            var me = this;

            if (!type){
                type = 'hex';
            }

            type = type.toLowerCase();

            switch(type){
                case 'rgb':
                case 'css3':
                    return 'rgb(' + ~~me._r + ',' + ~~me._g + ',' + ~~me._b + ')';
                case 'css2':
                case 'hex': 
                    return (me.valueOf() & 0x00FFFFFF).toString(16);
                default: 
                    return me.valueOf().toString(16);
            }
        }
    });
});