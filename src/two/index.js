import React from 'react';
import Two from 'two.js';
import { TWO_PI } from 'two.js/src/utils/math';
import { makeSeconds, makeRotateSeconds } from './makeSeconds';
import { makeCenter } from './utils';
import { makeMinutes, makeRotateMinutes } from './makeMinutes';
import { makeHours, makeRotateHours } from './makeHours.js';
import { makeNumbers } from './makeNumbers.js';

const elem = document.body;
const two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(elem);

let hours = null;
let minutes = null;
let seconds = null;
let numbers = null;

let rotateHours = null;
let rotateMinutes = null;
let rotateSeconds = null;

const center = makeCenter(two);

const clock = two.makeGroup();

hours = makeHours(two);
center(hours);
rotateHours = makeRotateHours(hours);

minutes = makeMinutes(two);
center(minutes);  
rotateMinutes = makeRotateMinutes(minutes);

seconds = makeSeconds(two);
center(seconds);  
rotateSeconds = makeRotateSeconds(seconds);

numbers = makeNumbers(two);
center(numbers);

clock.add(hours);
clock.add(minutes);
clock.add(seconds);

two
  .bind('resize', () => {
    if(!!hours) center(hours);
    if(!!minutes) center(minutes);
    if(!!seconds) center(seconds);
  })
  .bind('update', () => {
    if(!!hours) rotateHours();  
    if(!!minutes) rotateMinutes();  
    if(!!seconds) rotateSeconds();  
  })
  .play();

