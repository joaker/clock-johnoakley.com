import { TWO_PI } from "two.js/src/utils/math";
import { DEFAULT_CENTER_SCALING, HOURS_PER_ROTATION, MILLIS_PER_ROTATION, MINUTES_PER_ROTATION, RESIZE_INTERVAL_MILLISECONDS, RESIZE_MAX_COUNT, SECONDS_PER_ROTATION } from "./constants";
import { Group } from "two.js/src/group";
import Two from "two.js";
import { Shape } from "two.js/src/shape";
import { Circle } from "two.js/src/shapes/circle";

export const makeCenter = (too: Two) => (thing: Shape) => {
    thing.translation.x = too.width / 2;
    thing.translation.y = too.height / 2;
}

export const createHand = (too: Two, scaling: number, linewidthScaling: number): Group => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / scaling;
    const lineWidth = minDimension / linewidthScaling;

    const ring = too.makeGroup();

    const bg = too.makeCircle(0, 0, radius);
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

export const createCenter = (too: Two): Circle => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / DEFAULT_CENTER_SCALING;

    const center = too.makeCircle(0, 0, radius)
    center.noStroke();
    center.fill = 'white';

    return center;

}

export const makeRotate = (hand: Shape, getRotationPercent: (date: Date) => number) => (date = new Date()) => {
    const percent = getRotationPercent(date);

    const rotation = percent * TWO_PI;

    hand.rotation = rotation;
}

export const getHoursPercent = (date = new Date()) => {

    const baseHours = date.getHours() % HOURS_PER_ROTATION;
    const minutesFraction = date.getMinutes() / MINUTES_PER_ROTATION;
    const sectionsFraction = date.getSeconds() / SECONDS_PER_ROTATION / MINUTES_PER_ROTATION;
    const millisFraction = date.getMilliseconds() / MILLIS_PER_ROTATION / SECONDS_PER_ROTATION / MINUTES_PER_ROTATION;

    const hours = baseHours + minutesFraction + sectionsFraction + millisFraction;

    return hours / HOURS_PER_ROTATION;
}

export const getMinutesPercent = (date = new Date()) => {

    const baseMinutes = date.getMinutes();
    const sectionsFraction = date.getSeconds() / SECONDS_PER_ROTATION;
    const millisFraction = date.getMilliseconds() / MILLIS_PER_ROTATION / SECONDS_PER_ROTATION;

    const minutes = baseMinutes + sectionsFraction + millisFraction;

    return minutes / MINUTES_PER_ROTATION;
}



export const getSecondsPercent = (date = new Date()) => {

    const baseSeconds = date.getSeconds();
    const millisFraction = date.getMilliseconds() / MILLIS_PER_ROTATION;

    const seconds = baseSeconds + millisFraction;

    return seconds / SECONDS_PER_ROTATION;
}

let interval: NodeJS.Timeout | null = null;
let resizeCount = 0;

export const triggerResize = () => {
    window.dispatchEvent(new Event('resize'));
    if(++resizeCount >= RESIZE_MAX_COUNT) {
        clearInterval(interval as NodeJS.Timeout)
    }
}

export const startResizeInterval = () => {
    interval = setInterval(triggerResize, RESIZE_INTERVAL_MILLISECONDS);
}