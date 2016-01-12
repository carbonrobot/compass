// Converts from degrees to radians.
Math.toRadians = function (degrees) {
    return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.toDegrees = function (radians) {
    return radians * 180 / Math.PI;
};

/**
 * Find a point on a circle
 */
Math.toPointOnCircle = function (center, radius, angle) {
    return {
        x: center.x + radius * Math.cos(Math.toRadians(angle)),
        y: center.y + radius * Math.sin(Math.toRadians(angle))
    };
}

/**
 * Transform degrees to screen coordinates
 */
Math.normalizeAngle = function(theta){
    return theta > 360 ? 360 - theta : theta;
}

/**
 * Clamp a value between to numbers
 */
Math.clamp = function(min, max, value){
    if(value < min){
        return min;
    }
    if(value > max){
        return max;
    }
    return value;
}