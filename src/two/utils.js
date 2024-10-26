import { TWO_PI } from "two.js/src/utils/math";
import { DEFAULT_CENTER_SCALING, HOURS_PER_ROTATION, MILLIS_PER_ROTATION, MINUTES_PER_ROTATION, SECONDS_PER_ROTATION } from "./constants";

export const makeCenter = (too) => (thing) => {
    thing.translation.x = too.width / 2;
    thing.translation.y = too.height / 2;
}

export const createHand = (too, scaling, linewidthScaling) => {
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

export const createCenter = (too) => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / DEFAULT_CENTER_SCALING;

    const center = too.makeCircle(0, 0, radius)
    center.noStroke();
    center.fill = 'white';

    return center;

}

export const makeRotate = (hand, getRotationPercent) => (date = new Date()) => {
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
