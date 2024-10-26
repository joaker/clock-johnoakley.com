import React from 'react';
import Two from 'two.js';
import { TWO_PI } from 'two.js/src/utils/math';
import { makeRotateSeconds, makeSeconds } from './makeSeconds';
import { makeCenter } from './utils';

const elem = document.body;
const two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(elem);


const center = makeCenter(two);

const clock = two.makeGroup();

const seconds = makeSeconds(two);
center(seconds);
const rotateSeconds = makeRotateSeconds(seconds);

clock.add(seconds);

two
  .bind('resize', () => {
    center(seconds);
  })
  .bind('update', () => {
    rotateSeconds()
  })
  .play();

