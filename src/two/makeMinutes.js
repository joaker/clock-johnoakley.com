import { TWO_PI } from "two.js/src/utils/math";

export const DEFAULT_SCALING = 7;
export const DEFAULT_LINE_WIDTH_SCALING = 32;
export const UNITS_PER_ROTATION = 60;

export const makeMinutes = (too, scaling = DEFAULT_SCALING, linewidthScaling = DEFAULT_LINE_WIDTH_SCALING) => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / scaling;
    const lineWidth = minDimension / linewidthScaling;

    const ring = too.makeGroup();

    const bg = too.makeCircle(0,0, radius);
    bg.stroke = 'white';
    bg.fill = 'black';
    bg.linewidth = lineWidth;

    ring.add(bg);

    const hand = too.makeLine(0, 0, 0, - radius);
    hand.noFill();
    hand.stroke = 'white';
    hand.linewidth = lineWidth;
    ring.add(hand);

    return ring;
}

export const makeRotateMinutes = (hand) => (date = new Date()) => {
    const unit = date.getMinutes() + date.getSeconds() / 60;

    const rotation = unit / UNITS_PER_ROTATION * TWO_PI;

    hand.rotation = rotation;
}

