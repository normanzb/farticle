
define(['cogs'], function(cogs) {

    var requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;

    var cancelAnimationFrame = window.cancelAnimationFrame || 
        window.mozCancelAnimationFrame;

    function start(){
        var me = this;

        me._stopped = false;

        me._time = Date.now();
        console.log('sys.util.FrameUpdate: init time', me._time);

        me._handle = requestAnimationFrame(function loop(time){
            
            if (me._stopped){
                return;
            }

            frameUpdate.call(me, time);

            me._handle = requestAnimationFrame(loop);

        });
    }

    function stop(){
        var me = this;
        me._stopped = true;
        if (me._handle){
            cancelAnimationFrame(me._handle);
            me._handle = 0;
        }
    }

    function frameUpdate(){
        var me = this;
        var time = Date.now();
        var frameTime = (time - me._time);
        // console.log('sys.util.FrameUpdate: time, old time, frame time', time, me._time, frameTime);
        me._time = time;
        me.emit('update', me, frameTime);
    }
    
    var Ctor = cogs.ctor(function(){
        var me = this;

        me._handle = 0;
        me._stopped = false;
        me._hookCount = 0;
        me._time = Date.now();
        me.onUpdate = cogs.event();
        me.onUpdate.onHook.hook(function hookee(){

            if (me._hookCount === 0){
                start.call(me);
            }

            me._hookCount++;
        });
        me.onUpdate.onUnhook.hook(function hookee(){

            if (me._hookCount <= 1){
                stop.call(me);
            }

            me._hookCount--;
        });
    });

    cogs.mixin(Ctor, cogs.emittable);

    Ctor.instance = new Ctor;
    
    return Ctor;
});