
export const DEFAULT_SCALING = 4;
export const DEFAULT_CENTER_SCALING = 10;

export const makeSeconds = (too, scaling = DEFAULT_SCALING, centerScaling = DEFAULT_CENTER_SCALING) => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / scaling;

    const seconds = too.makeGroup();

    const bg = too.makeCircle(0,0, radius);
    bg.stroke = 'white';
    bg.fill = 'black';
    bg.linewidth = 20;

    seconds.add(bg);

    const hand = too.makeLine(0, 0, 0, - radius);
    hand.noFill();
    hand.stroke = 'white';
    hand.linewidth = 20;
    seconds.add(hand);


    const centerRadius = minDimension / centerScaling;

    const center = too.makeCircle(0, 0, centerRadius)
    center.noStroke();

    seconds.add(center);

    return seconds;
}

