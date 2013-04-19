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
    'farticle/sys/initializer/Choose', 
    'farticle/sys/initializer/InitializerGroup', 
    'farticle/sys/initializer/RadiusInit', 
    'farticle/sys/initializer/MassInit', 
    'farticle/d2/action/Move', 
    'farticle/d2/action/DeathZone' ,
    'farticle/d2/action/RandomDrift',
    'farticle/sys/action/Age' 
    ], 
function(cogs, CounterSteady, CounterFixed,
    Runner2D, 
    Point, Line, Rectangle, 
    Position, Velocity, 
    Lifetime, Choose, InitializerGroup, RadiusInit, MassInit,
    Move, DeathZone, RandomDrift,
    Age){
    return cogs.ctor(function(){
        var me = this;

        // me.counter = new CounterFixed( 120 );
        me.counter = new CounterSteady( 20 );
        
        var rainDrop = new InitializerGroup();
        rainDrop.initializers.push( new MassInit(1) );
        rainDrop.initializers.push( new RadiusInit(2) );
        rainDrop.initializers.push( new Position( new Line( new Point( -200, -5 ), new Point( 800, -5 ) ) ) );
        rainDrop.initializers.push( new Velocity( new Line( new Point( 0, 0 ), new Point( 150, 150 ) ) ) );
        rainDrop.initializers.push( new Lifetime( 8, 12) );
        
        var smoke = new InitializerGroup();
        smoke.initializers.push( new MassInit(10) );
        smoke.initializers.push( new RadiusInit(10) );
        smoke.initializers.push( new Position( new Line( new Point( 0, -5 ), new Point( 800, -5 ) ) ) );
        smoke.initializers.push( new Lifetime( 8, 12) );

        me.initializers.push( new Choose( [ rainDrop, smoke ], [30, 30] ) )

        me.actions.push( new Move() );
        me.actions.push( new Age( ) );
        me.actions.push( new DeathZone( new Rectangle( -200, -10, 1000, 500 ), true ) );
        me.actions.push( new RandomDrift(20, 20) );

    }, Runner2D);
});