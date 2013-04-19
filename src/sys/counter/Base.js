require(['cogs'], function  (cogs) {

    /**
     * The Counter base class must be inherit by all counters.
     * 
     * <p>A counter is a class that tells an runner how many particles to
     * emit at any time. The two methods control the rate of emission of particles
     * when the runner starts and every frame thereafter.</p>
     * 
     * <p>A counter is directly associated with an runner. A counter is set for 
     * an runner by assigning it to the runner's counter property.</p>
     * 
     */
    var Ctor = cogs.ctor(function(){
        var me = this;

        
    });

    // setup stub methods
    return cogs.stub(Ctor, [
        'start', 

        /**
         * Stops the runner from emitting particles
         */
        'stop', 

        /**
         * Resumes the runner emitting particles after a stop
         */
        'resume', 
        'update', 

        /**
         * Indicates if the counter has emitted all its particles.
         */
        'complete', 

        /**
         * Indicates if the counter is currently emitting particles
         */
        'running'
    ]);
});