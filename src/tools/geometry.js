export class Geometry {


    // Converts from degrees to radians.
    static toRadians(degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    static toDegrees(radians) {
        return radians * 180 / Math.PI;
    };

    /**
     * Find a point on a circle
     */
    static toPointOnCircle(center, radius, angle) {
        return {
            x: center.x + radius * Math.cos(Geometry.toRadians(angle)),
            y: center.y + radius * Math.sin(Geometry.toRadians(angle))
        };
    }

    /**
     * Transform degrees to screen coordinates
     */
    static normalizeAngle(theta) {
        return theta > 360 ? 360 - theta : theta;
    }

    /**
     * Clamp a value between to numbers
     */
    static clamp(min, max, value) {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }

}
