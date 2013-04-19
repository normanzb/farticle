define(function  (argument) {
    return {
        get x(){
            return this.position.x;
        },
        set x(value){
            this.position.x = value;
        },
        get y(){
            return this.position.y;
        },
        set y(value){
            this.position.y = value;
        }
    }
});