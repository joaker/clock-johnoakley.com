import React from 'react';
import Two from 'two.js';
import { TWO_PI } from 'two.js/src/utils/math';
import { createCenter, createHand, getHoursPercent, getMinutesPercent, getSecondsPercent, makeCenter, makeRotate } from './utils';
import { createNumbers } from './createNumbers';
import { ACTIVE_NUMBERS_FILL, ACTIVE_NUMBERS_STROKE, DEFAULT_LINE_WIDTH_SCALING_HOUR, DEFAULT_LINE_WIDTH_SCALING_MINUTE, DEFAULT_LINE_WIDTH_SCALING_SECONDS, DEFAULT_NUMBERS_FILL, DEFAULT_NUMBERS_STROKE, DEFAULT_SCALING_HOUR, DEFAULT_SCALING_MINUTE, DEFAULT_SCALING_SECOND, HOURS_PER_ROTATION, MINUTES_PER_ROTATION, SECONDS_PER_ROTATION } from './constants.js';
import { Group } from 'two.js/src/group';
import { Circle } from 'two.js/src/shapes/circle';
import { Shape } from 'two.js/src/shape';

const elem = document.body;
const two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(elem);

let hours: Group | null = null;
let minutes: Group | null = null;
let seconds: Group | null = null;
let center: Circle | null = null;
let numbers: Group | null = null;

let rotateHours: Function | null = null;
let rotateMinutes: Function | null = null;
let rotateSeconds: Function | null = null;

const translateToCenter = makeCenter(two);


const clock = two.makeGroup();

hours = createHand(two, DEFAULT_SCALING_HOUR, DEFAULT_LINE_WIDTH_SCALING_HOUR);
minutes = createHand(two, DEFAULT_SCALING_MINUTE, DEFAULT_LINE_WIDTH_SCALING_MINUTE);
seconds = createHand(two, DEFAULT_SCALING_SECOND, DEFAULT_LINE_WIDTH_SCALING_SECONDS)
center = createCenter(two);
numbers = createNumbers(two);

clock.add(hours);
clock.add(minutes);
clock.add(seconds);
clock.add(center);
clock.add(numbers);

rotateHours = makeRotate(hours, getHoursPercent);
rotateMinutes = makeRotate(minutes, getMinutesPercent);
rotateSeconds = makeRotate(seconds, getSecondsPercent);

translateToCenter(clock);

two.update();

registerHandlers();

two
  .bind('resize', () => {
    translateToCenter(clock);
  })
  .bind('update', () => {
    if (!!hours) rotateHours();
    if (!!minutes) rotateMinutes();
    if (!!seconds) rotateSeconds();
  })
  .play();

function registerHandlers() {
  // two.renderer.domElement.style.cursor = 'pointer';
  if (!!center) {
    const centerGroup = center as Circle;
    (center._renderer as any).elem.addEventListener('mouseover', enterCenter);
    (center._renderer as any).elem.addEventListener('mouseout', exitCenter);
    (center._renderer as any).elem.addEventListener('click', clickCenter);
  }
}

function enterCenter() {
  two.renderer.domElement.style.cursor = 'pointer';
}

function exitCenter() {
  two.renderer.domElement.style.cursor = 'default';
}

function clickCenter() {
  console.log('center clicked');

  if (!!numbers) {
    const numbersGroup = numbers as Group;
    const isActive = DEFAULT_NUMBERS_FILL !== numbersGroup.fill;
    if (isActive) {
      numbers.stroke = DEFAULT_NUMBERS_STROKE;
      numbers.fill = DEFAULT_NUMBERS_FILL;
    } else {
      numbers.stroke = ACTIVE_NUMBERS_STROKE;
      numbers.fill = ACTIVE_NUMBERS_FILL;
    }
    two.update();
  }
}
