import { TWO_PI } from "two.js/src/utils/math";

export const DEFAULT_SCALING = 4;
export const DEFAULT_LINE_WIDTH_SCALING = 16;
export const UNITS_PER_ROTATION = 12;

export const makeHours = (too, scaling = DEFAULT_SCALING, linewidthScaling = DEFAULT_LINE_WIDTH_SCALING) => {
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

export const makeRotateHours = (hand) => (date = new Date()) => {
    const unit = (date.getHours() % 12) + date.getMinutes() / 60 + date.getSeconds() / 60 / 60;

    const rotation = unit / UNITS_PER_ROTATION * TWO_PI;

    hand.rotation = rotation;
}

