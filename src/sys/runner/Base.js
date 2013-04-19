define(['cogs', 'farticle/util/Collection', '../action/Base', '../initializer/Base', 'farticle/util/FrameUpdater'],
function  (cogs, Collection, BaseAction, BaseInitializer, FrameUpdater) {

    function killAllParticles(){
        var me = this;
        var ps = me.particles;
        var p;

        for(var l = ps.length; l--;){
            var p = ps.item(l);
            p.kill();
        }

        me.particles.length = 0;
    }

    function attachToUpdater(){
        var me = this;
        FrameUpdater.instance.on('update', me._handleUpdate);
    }

    function detachFromUpdate(){
        var me = this;
        FrameUpdater.instance.off('update', me._handleUpdate);
    }

    function onUpdate( sender, time ){
        var me = this;
        // console.log('sys.runner.Base: onUpdate');
        if( me._fixedFrameTime )
        {
            me.update( me._fixedFrameTime );
        }
        else
        {
            me.update( time );
        }
    }

    function prioritySort(a, b){
        return (~~a.priority) - (~~b.priority)
    }

    /**
     * The Runner class is the base class for the Runner2D and Runner3D classes.
     * The runner class contains the common behavioour used by these two concrete
     * classes.
     * 
     * <p>An Runner manages the creation and ongoing state of particles. It uses 
     * a number of utility classes to customise its behaviour.</p>
     * 
     * <p>An runner uses Initializers to customise the initial state of particles
     * that it creates; their position, velocity, color etc. These are added to the 
     * runner using the addInitializer method.</p>
     * 
     * <p>An runner uses Actions to customise the behaviour of particles that
     * it creates; to apply gravity, drag, fade etc. These are added to the runner 
     * using the addAction method.</p>
     * 
     * <p>An runner uses Activities to alter its own behaviour, to move it or rotate
     * it for example.</p>
     * 
     * <p>An runner uses a Counter to know when and how many particles to emit.</p>
     * 
     * <p>All timings in the runner are based on actual time passed, 
     * independent of the frame rate of the flash movie.</p>
     * 
     * <p>Most functionality is best added to an runner using Actions,
     * Initializers, Activities and Counters. This offers greater 
     * flexibility to combine behaviours without needing to subclass 
     * the Runner classes.</p>
     */
    var Ctor = cogs.ctor(function(){
        var me = this;

        me._running = false;
        me._started = false;
        me._updating = false;

        /**
         * Used to alternate the direction in which the particles in the particles
         * array are processed, to iron out errors from always processing them in
         * the same order.
         */
        me._processLastFirst = false;
        me._useInternalTick = true;
        me._particleFactory = null;
        me._counter = null;
        me._fixedFrameTime = 0;
        me._maximumFrameTime = 500;

        me._particles = new Collection();

        me._actions = new Collection(BaseAction);
        me._actions.autoSort = prioritySort;

        me._initializers = new Collection(BaseInitializer);
        me._initializers.autoSort = prioritySort;

        me._activities = new Collection();
        me._activities.autoSort = prioritySort;

        me._handleUpdate = onUpdate.bind(me);
    });

    return cogs.mixin(Ctor, cogs.emittable, {
        get maximumFrameTime(){
            return this._maximumFrameTime;
        },
        set maximumFrameTime(value){
            this._maximumFrameTime = value;
        },
        get initializers(){
            return this._initializers;
        },
        get actions(){
            return this._actions;
        },
        get activities(){
            return this._activities;
        },
        get particles(){
            return this._particles;
        },
        /**
         * The Counter for the Runner. The counter defines when and
         * with what frequency the runner emits particles.
         */
        get counter(){
            return this._counter;
        },
        set counter(value){

            this._counter = value;

            if( this.running ){
                this._counter.start(this);
            }

        },
        /**
         * Indicates whether the runner should manage its own internal update
         * tick. The internal update tick is tied to the frame rate and updates
         * the particle system every frame.
         * 
         * <p>If users choose not to use the internal tick, they have to call
         * the runner's update method with the appropriate time parameter every
         * time they want the runner to update the particle system.</p>
         */ 
        get useInternalTick(){
            return this._useInternalTick;
        },
        set useInternalTick(value){
            var me = this;

            if ( me._useInternalTick == value ){
                return;
            }

            me._useInternalTick = value;

            if ( !me._started ){
                return;
            }

            if ( me._useInternalTick ){
                attachToUpdater.call(me);
            }
            else {
                detachFromUpdate.call(me);
            }
        },
        /**
         * Indicates a fixed time (in seconds) to use for every frame. Setting 
         * this property causes the runner to bypass its frame timing 
         * functionality and use the given time for every frame. This enables
         * the particle system to be frame based rather than time based.
         * 
         * <p>To return to time based animation, set this value to zero (the 
         * default).</p>
         * 
         * <p>This feature only works if useInternalTick is true (the default).</p>
         * 
         */     
        get fixedFrameTime(){
            return this._fixedFrameTime;
        },
        set fixedFrameTime(value){
            this._fixedFrameTime = value;
        },
        /**
         * Indicates if the runner is currently running.
         */
        get running(){
            return this._running;
        },
        /**
         * This is the particle factory used by the runner to create and dispose 
         * of particles. The 2D and 3D libraries each have a default particle
         * factory that is used by the Runner2D and Runner3D classes. Any custom 
         * particle factory should implement the ParticleFactory interface.
         */     
        get particleFactory(){
            return this._particleFactory;
        },
        set particleFactory(value){
            this._particleFactory = value;
        },
        /**
         * Used to sort the particles as required. In this base class this method 
         * does nothing.
         * @protected
         */
        _sortParticles: function(){

        },
        /*
         * Used internally to create a particle.
         * @protected
         */
        _createParticle: function(){
            var me = this;
            var p = me._particleFactory.produce();
            var i, len = me._initializers.length;

            me._initParticle(p);

            for(i = 0; i < len; i++){
                me._initializers.item(i).init(this, p);
            }

            me._particles.push(p);

            return p;
        },
        _initParticle: function(){

        },
        /**
         * Starts the runner. Until start is called, the runner will not emit or 
         * update any particles.
         */
        start: function(){
            var me = this;
            var i, len;

            if ( me._useInternalTick ){
                attachToUpdater.call(me);
            }

            me._started = true;
            me._running = true;
            len = me._activities.length;
            
            for ( i = 0; i < len; i++ ){
                me._activities.item(i).init(this);
            }

            len = me._counter.start(this);

            for ( i = 0; i < len; i++ ){
                me._createParticle();
            }

            me.emit('started', me);

        },
        /**
         * Pauses the runner.
         */
        pause: function(){
            this._running = false;
        },
        /**
         * Resumes the runner after a pause.
         */
        resume: function(){
            this._running = true;
        },
        /**
         * Stops the runner, killing all current particles and returning them to the 
         * particle factory for reuse.
         */
        stop: function(){
            var me = this;

            if( me._useInternalTick ){
                detachFromUpdate.call(me);
            }

            me._started = false;
            me._running = false;

            killAllParticles.call(me);

            me.emit('stopped', me);
        },
        update: function(time){
            var me = this;
            var i, p, len;

            if (!me._running){
                return;
            }

            if ( time > me._maximumFrameTime ){
                time = me._maximumFrameTime;
            }

            me._updating = true;
            // me._particles.lock = true;

            len = me._counter.update(me, time);

            for( i = 0; i < len; i++ ){
                me._createParticle();
            }

            me._sortParticles();

            me._activities.forEach(function(item, index){
                item.update(me, time);
            });

            if ( me._particles.length > 0 ){

                // update particle state
                me._actions.forEach(function(action, aIndex){
                    // var funcName = 'forEach';

                    // if (me._processLastFirst){
                    var funcName = 'reverseEach';
                    // }

                    me._particles[funcName](function(particle, pIndex){

                        action.update(me, particle, time);
                    });
                
                });

                // me._processLastFirst = !me._processLastFirst;

                // remove dead particles
                // TODO: optimize
                me._particles.reverseEach(function(particle, pIndex){
                    if ( particle.isDead ){

                        particle.kill();

                        me._particles.splice(pIndex, 1);
                    }
                });
            }
            else {
                me.emit('empty', me);
            }

            // me._particles.lock = false;
            me._updating = true;

            me.emit('updated', me);
        },
        doom: function(){
            this.dispose();
        },
        dispose: function(){
            this.stop();
        }
    });
});