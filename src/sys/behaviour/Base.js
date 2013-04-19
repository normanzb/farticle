
define(['cogs'], function(cogs) {

    /**
     * The Behaviour is the base for the Action, Initializer and 
     * Activity interfaces.
     */
    var Ctor = cogs.ctor(function(){

    });

    return cogs.stub(Ctor, ['priority', 'attach', 'detach']);
});