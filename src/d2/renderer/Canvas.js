
define(['cogs', 'farticle/sys/renderer/Base', 'farticle/util/FrameUpdater', 'farticle/util/color/RGBA'], 
function (cogs, RendererBase, FrameUpdater, RGBA) {

    function onFrameUpdate(time){
        var me = this;

        me.render(time);
    }

    
    
    var Ctor = cogs.ctor(function(canvas){
        var me = this;

        me._canvas = canvas;
        me._context = canvas.getContext("2d");
        me._runner = null;
        me._partcile = {
            color: new RGBA(0,0,0,255)
        };
        me._handleRunnerStarted = function(){
            FrameUpdater.instance.on('update', me._handleFrameUpdate);
        };

        me._handleFrameUpdate = onFrameUpdate.bind(me);

        me._prevDisplayObj;

    }, RendererBase);

    return cogs.mixin(Ctor, {
        _getDisplayObject: function(){

        },
        render: function(time){
            var me = this;

            me.clear();

            // draw particles from runner to screen
            // console.log(me._runner.particles)
            me._runner.particles.forEach(function(particle, index){

                var displayObj = me._getDisplayObject(particle) || me._partcile;
                var scale = displayObj.scale || 1;

                if (me._prevDisplayObj != displayObj){

                    me.fillStyle.call(me, displayObj.color.toString('rgba'));
                    me._prevDisplayObj = displayObj;

                }

                me.drawCircle( particle, particle.radius * scale, displayObj);
            });

        },
        attach: function(runner){
            var me = this;

            me._runner = runner;
            runner.on('started', me._handleRunnerStarted);
        },
        detach: function(){
            var me = this;

            var runner = me._runner;

            runner.off('started', me._handleRunnerStarted);
            FrameUpdater.instance.off('update', me._handleFrameUpdate);

            me._runner = null;
        },
        clear: function() {
            var me = this;
            if (me._backgroundColor){
                me.fillStyle(me._backgroundColor);
                me._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
                return;
            }
            me._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        },
        drawCircle: function (point, radius) {
            var me = this;

            me._context.beginPath();
            me._context.arc( ~~(point.x + 0.5), ~~(point.y + 0.5), radius, 0, Math.PI * 2);
            me._context.closePath();
            me._context.fill();
        },

        fillStyle: function (fill) { 
            var me = this;
            me._context.fillStyle = fill; 
        }
    });
});