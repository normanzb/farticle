define(['cogs','../behaviour/Base'], function (cogs, BehaviourBase) {
    
    /**
     * The Action interface must be implemented by all particle actions.
     * 
     * <p>An Action is a class that is used to continuously modify an aspect 
     * of a particle by updating the particle every frame. Actions may, for 
     * example, move the particle or modify its velocity.</p>
     * 
     * <p>Actions are directly associated with runners and act on all
     * particles created or added to that runner. Actions are applied to 
     * all particles created by an runner by using the runner's addAction 
     * method. Actions are removed from the runner by using the runner's
     * removeAction method.</p>
     * 
     * <p>The key method in the Action interface is the update method.
     * This is called every frame, for every particle and is where the
     * action modifies the particle's properties.</p>
     *
     */

    var Ctor = cogs.ctor(function(){
        this._priority = 0;
    }, BehaviourBase);

    return cogs.mixin(Ctor, {
        /**
         * Returns a default priority of 0 for this action. Derived classes 
         * override this method if they want a different default priority.
         */
        get priority(){
            return this._priority;
        },
        set priority(value){
            this._priority = value;
        },
        /**
         * This method does nothing. Some derived classes override this method
         * to perform actions when the action is added to an runner.
         * 
         * @param runner The Runner that the Action was added to.
         */
        attach: function(){

        },
        /**
         * This method does nothing. Some derived classes override this method
         * to perform actions when the action is removed from the runner.
         * 
         * @param runner The Runner that the Action was removed from.
         */
        detach: function(){

        },
        /**
         * The update method is used by the runner to apply the action
         * to every particle. It is the key feature of the actions and is
         * used to update the state of every particle every frame. This method 
         * is called within the runner's update loop for every particle 
         * and need not be called by the user.
         * 
         * <p>Because the method is called for every particle, every frame it is
         * a key area for optimization of the code. When creating a custom action
         * it is usually worth making this method as efficient as possible.</p>
         * 
         * @param runner The Runner that created the particle.
         * @param particle The particle to be updated.
         * @param time The duration of the frame - used for time based updates.
         */
        update: function(){

        }
    });

});