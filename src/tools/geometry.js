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


