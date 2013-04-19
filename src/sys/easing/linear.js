define(['cogs'], function(cogs) {
    func = function(t, b, c, d){
        return c * t / d + b;
    };
    return {
        easeNone: func,
        easeIn: func,
        easeOut: func,
        easeInOut: func
    };
});