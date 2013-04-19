define([
    'cogs',
    'farticle/sys/counter/Steady',
    'farticle/sys/counter/Fixed',
    'farticle/d2/runner/Base', 
    'farticle/geom/Point', 
    'farticle/geom/Line', 
    'farticle/geom/Rectangle',
    'farticle/d2/initializer/Position', 
    'farticle/d2/initializer/Velocity', 
    'farticle/sys/initializer/Lifetime', 
    'farticle/d2/action/Move', 
    'farticle/d2/action/DeathZone' ,
    'farticle/d2/action/RandomDrift',
    'farticle/sys/action/Age' 
    ], 
function(cogs, CounterSteady, CounterFixed,
    Runner2D, 
    Point, Line, Rectangle, 
    Position, Velocity, Lifetime,
    Move, DeathZone, RandomDrift,
    Age){
    return cogs.ctor(function(){
        var me = this;

        me.counter = new CounterSteady( 30 );
            
        // addInitializer( new ImageClass( RadialDot, [2] ) );

        // me.initializers.push( new Position( new Line( new Point( -200, -5 ), new Point( 800, -5 ) ) ) );
        // me.initializers.push( new Velocity( new Line( new Point( 0, 0 ), new Point( 150, 150 ) ) ) );

        // me.initializers.push( new Position( new Point( 300, 200 ) ) );
        // me.initializers.push( new Velocity( new Line( new Point( 0, -20 ) , new Point( 0, -40 ) ) ) );

        me.initializers.push( new Position( new Rectangle( 280, 180, 40, 40 ) ) );
        me.initializers.push( new Velocity( new Line( new Point( 0, 0 ) , new Point( 0, -4 ) ) ) );
        me.initializers.push( new Lifetime( 8, 12) );
        

        me.actions.push( new Move() );
        me.actions.push( new Age( ) );
        me.actions.push( new DeathZone( new Rectangle( -200, -10, 1000, 500 ), true ) );
        me.actions.push( new RandomDrift(100, 100) );

        // me.actions.push( new RandomDrift(40, 40) );

    }, Runner2D);
});