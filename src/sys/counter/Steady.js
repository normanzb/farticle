define(['cogs','./Base'], function(cogs, Base){

    /**
     * The Steady counter causes the runner to emit particles continuously
     * at a steady rate. It can be used to simulate any continuous particle
     * stream.
     */
    var Ctor = cogs.ctor(function(rate){
        var me = this;

        me._timeToNext = 0;
        me._rateInv = 0;
        me._running = false;
        me.rate = ~~(rate);

        console.log(me._timeToNext);

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
            var me = this;

            me._running = true;
            me._timeToNext = me._rateInv;

            return 0;
        },
        stop: function(){
            this._running = false;
        },
        resume: function(){
            this._running = true;
        },
        update: function(runner, time){
            var me = this;
            var count = 0;
            // console.log('sys.counter.Steady: update')

            if( !me._running )
            {
                return count;
            }

            // console.log(me._timeToNext, time);
            me._timeToNext -= time;
            // console.log(me._timeToNext)

            while( me._timeToNext <= 0 )
            {
                ++count;
                me._timeToNext += me._rateInv;
            }

            return count;
        },
        get running(){
            return this._running;
        },
        get complete(){
            return false;
        },
        get rate(){
            return this._rate;
        },
        set rate(value){
            var me = this;
            var timePassed;

            value = ~~value;

            if (me._rate == value) {
                return;
            }

            timePassed = me._rateInv - me._timeToNext;
            
            me._rate = value;
            me._rateInv = value ? 1000 / value : Number.MAX_VALUE;

            if (me._rate && value) {
                me._timeToNext = Math.max( me._rateInv - timePassed, 0 );
            }
            else{
                me._timeToNext = me._rateInv;
            }
            console.log(me._timeToNext)
        }
    });
});