
define(['cogs', 'farticle/sys/initializer/Base'], function(cogs, InitializerBase) {
    
    /**
     * The constructor creates a Position initializer for use by 
     * an runner. To add a Position to all particles created by an runner, use the
     * runner's addInitializer method.
     * 
     * @param zone The zone to place all particles in.
     */
    var Ctor = cogs.ctor(function(zone){
        this.zone = zone;
    }, InitializerBase);

    return Ctor;
});