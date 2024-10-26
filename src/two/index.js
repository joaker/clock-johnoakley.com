import React from 'react';
import Two from 'two.js';
import { TWO_PI } from 'two.js/src/utils/math';
import { makeRotateSeconds, makeSeconds } from './makeSeconds';
import { makeCenter } from './utils';
import { makeMinutes, makeRotateMinutes } from './makeMinutes';

const elem = document.body;
const two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(elem);

let hours = null;
let minutes = null;
let seconds = null;

let rotateHours = null;
let rotateMinutes = null;
let rotateSeconds = null;

const center = makeCenter(two);

const clock = two.makeGroup();

minutes = makeMinutes(two);
center(minutes);  
rotateMinutes = makeRotateMinutes(minutes);

seconds = makeSeconds(two);
center(seconds);  
rotateSeconds = makeRotateSeconds(seconds);

clock.add(minutes);
clock.add(seconds);

two
  .bind('resize', () => {
    if(!!hours) center(hours);
    if(!!minutes) center(minutes);
    if(!!seconds) center(seconds);
  })
  .bind('update', () => {
    if(!!seconds) rotateSeconds();  
    if(!!minutes) rotateMinutes();  
  })
  .play();

