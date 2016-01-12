/* global paper */

class Draw {

    static arc(center, radius, from, through, to, color, strokeWidth) {
        return this._arc(center, radius, from, through, to, color, strokeWidth);
    }
    
    static circle(center, radius, color, strokeWidth, fillColor){
        return new paper.Path.Circle({
            center: center,
            radius: radius,
            strokeColor: color,
            strokeWidth: strokeWidth,
            fillColor: fillColor
        });
    }
    
    static createGroup(){
        return new paper.Group();
    }
    
    static dashedLine(from, to, strokeColor, strokeWidth){
        return this.line(from, to, strokeColor, strokeWidth, [10,4]);
    }
    
    static filledCircle(center, radius, fillColor) {
        return new paper.Path.Circle({
            center: center,
            radius: radius,
            fillColor: fillColor
        });
    }
    
    static getPoint(x, y){
        return new paper.Point(x, y);
    }

    static gradientArc(center, radius, from, through, to, gradientStops, strokeWidth) {
        const getPoint = (angle) => Math.toPointOnCircle(center, radius, angle);
        const gradient = {
            gradient: {
                stops: gradientStops
            },
            origin: getPoint(from),
            destination: getPoint(to)
        };

        return this._arc(center, radius, from, through, to, gradient, strokeWidth);
    }

    static line(from, to, strokeColor, strokeWidth, dashArray) {
        return new paper.Path.Line({ 
            from: from, 
            to: to, 
            strokeColor: strokeColor, 
            strokeWidth: strokeWidth, 
            dashArray: dashArray
        });
    }

    static rectangle(options) {
        return new paper.Path.Rectangle(options);
    }
    
    static text(center, content, fontSize){
        new paper.PointText({
            point: center,
            content: content,
            fillColor: COLOR_WHITE,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: fontSize,
            justification: 'center'
        });
    }
    
    static _arc(center, radius, from, through, to, strokeColor, strokeWidth) {
        const getPoint = (angle) => Math.toPointOnCircle(center, radius, angle);
        const arc = new paper.Path({
            strokeWidth: strokeWidth,
            strokeColor: strokeColor
        });
        arc.add(getPoint(from));
        arc.arcTo(getPoint(through), getPoint(to));
        return arc;
    }
}