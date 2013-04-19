define(['cogs','./Base'], function(cogs, Base){

    /**
     * The Steady counter causes the runner to emit particles continuously
     * at a steady rate. It can be used to simulate any continuous particle
     * stream.
     */
    var Ctor = cogs.ctor(function(num){
        var me = this;

        me._num = ~~num;

    }, Base);

    return cogs.mixin(Ctor, {
        /**
         * Initilizes the counter. Returns 0 to indicate that the runner should 
         * emit no particles when it starts.
         * 
         * <p>This method is called within the runner's start method 
         * and need not be called by the user.</p>
         * 
         * @param runner The runner.
         * @return 0
         */
        start: function(){
            return this._num;
        },
        stop: function(){
            this._running = false;
        },
        resume: function(){
            this._running = true;
        },
        update: function(runner, time){
            return 0;
        },
        get complete(){
            return true;
        },
        get running(){
            return this._running;
        }
    });
});