
define(['cogs'], function(cogs) {
    
    var Ctor = cogs.ctor(function(bounce){
        var me = this;

        me._bounce = 0;
        me._maxDistance = 0;
        me._updateActivity;
        me._sign = 1;

        me.priority = -20;
        me.bounce = ~~bounce;
    });

    cogs.mixin(Ctor, {
        get bounce(){
            return this._bounce;
        },
        set bounce(value){
            this._bounce = value;
        },
        attach: function(runner){
            runner.spaceSort = true;

        },
        detach: function(runner){

        },
        frameUpdate: function(runner, time){
            var particles = runner.particles;
            var max1 = 0;
            var max2 = 0;
            particles.forEach(function(itm, idx){
                if (itm.radius > max1){
                    max2 = max1;
                    max1 = p.radius;
                }
                else if ( itm.radius > max2 ){
                    max2 = p.radius;
                }
            });

            me._maxDistance = max1 + max2;
            me._sign = - _sign;
        },
        update: function(runner, particle, time){
            var me = this;
            var p = particle;
            var e = runner;
            var particles = e.particles;
            var other;
            var i;
            var len = particles.length;
            var factor;
            var distanceSq;
            var collisionDist;
            var dx, dy;
            var n1, n2;
            var relN;
            var m1, m2;
            var f1, f2;
            for( i = p.sortID + me._sign; i < len && i >= 0 ; i += me._sign )
            {
                other = particles.item(i);
                if( ( dx = other.x - p.x ) * me._sign > me._maxDistance ) break;
                collisionDist = other.collisionRadius + p.collisionRadius;
                if( dx * me._sign > collisionDist ) continue;
                dy = other.y - p.y;
                if( dy > collisionDist || dy < -collisionDist ) continue;
                distanceSq = dy * dy + dx * dx;
                if( distanceSq <= collisionDist * collisionDist && distanceSq > 0 )
                {
                    factor = 1 / Math.sqrt( distanceSq );
                    dx *= factor;
                    dy *= factor;
                    n1 = dx * p.velX + dy * p.velY;
                    n2 = dx * other.velX + dy * other.velY;
                    relN = n1 - n2;
                    if( relN > 0 ) // colliding, not separating
                    {
                        m1 = p.mass;
                        m2 = other.mass;
                        factor = ( ( 1 + _bounce ) * relN ) / ( m1 + m2 );
                        f1 = factor * m2;
                        f2 = -factor * m1;
                        p.velX -= f1 * dx;
                        p.velY -= f1 * dy;
                        other.velX -= f2 * dx;
                        other.velY -= f2 * dy;
                        
                        runner.onParticleCollided(runner, {
                            particle: p,
                            other: other
                        });
                    }
                } 
            }
        }
    });

    return Ctor;
});