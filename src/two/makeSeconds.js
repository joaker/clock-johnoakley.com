import { TWO_PI } from "two.js/src/utils/math";

export const DEFAULT_SCALING = 4;
export const DEFAULT_CENTER_SCALING = 10;
export const DEFAULT_LINE_WIDTH_SCALING = 12;

export const makeSeconds = (too, scaling = DEFAULT_SCALING, centerScaling = DEFAULT_CENTER_SCALING, linewidthScaling = DEFAULT_LINE_WIDTH_SCALING) => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / scaling;
    const lineWidth = minDimension / linewidthScaling;

    const seconds = too.makeGroup();

    const bg = too.makeCircle(0,0, radius);
    bg.stroke = 'white';
    bg.fill = 'black';
    bg.linewidth = lineWidth;

    seconds.add(bg);

    const hand = too.makeLine(0, 0, 0, - radius);
    hand.noFill();
    hand.stroke = 'white';
    hand.linewidth = lineWidth;
    seconds.add(hand);


    const centerRadius = minDimension / centerScaling;

    const center = too.makeCircle(0, 0, centerRadius)
    center.noStroke();

    seconds.add(center);

    return seconds;
}

export const makeRotateSeconds = (seconds) => (date = new Date()) => {
    const millis = date.getMilliseconds();

    const rotation = millis / 1000 * TWO_PI;

    seconds.rotation = rotation;
}

