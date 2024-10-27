import React from 'react';
import Two from 'two.js';
import { TWO_PI } from 'two.js/src/utils/math';
import { createCenter, createHand, getHoursPercent, getMinutesPercent, getSecondsPercent, makeCenter, makeRotate } from './utils';
import { createNumbers } from './createNumbers.js';
import { DEFAULT_LINE_WIDTH_SCALING_HOUR, DEFAULT_LINE_WIDTH_SCALING_MINUTE, DEFAULT_LINE_WIDTH_SCALING_SECONDS, DEFAULT_SCALING_HOUR, DEFAULT_SCALING_MINUTE, DEFAULT_SCALING_SECOND, HOURS_PER_ROTATION, MINUTES_PER_ROTATION, SECONDS_PER_ROTATION } from './constants.js';

const elem = document.body;
const two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(elem);

let hours = null;
let minutes = null;
let seconds = null;
let center = null;
let numbers = null;

let rotateHours = null;
let rotateMinutes = null;
let rotateSeconds = null;

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

two
  .bind('resize', () => {
    translateToCenter(clock);
  })
  .bind('update', () => {
    if(!!hours) rotateHours();  
    if(!!minutes) rotateMinutes();  
    if(!!seconds) rotateSeconds();  
  })
  .play();

