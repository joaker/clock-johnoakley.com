import { TWO_PI } from "two.js/src/utils/math";

export const DEFAULT_SCALING = 2.8;

export const baseStyles = {
    // size: radius * 0.33,
    weight: 'bold',
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fill: 'white',
    opacity: 0.33
};

export const makeNumbers = (too, scaling = DEFAULT_SCALING, styles = null) => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / scaling;

    styles = styles || { ...baseStyles, size: radius * 0.25 };

    const numbers = too.makeGroup();

    for (let i = 0; i < 12; i++) {

        const x = radius * Math.sin(i / 12 * TWO_PI);
        const y = - radius * Math.cos(i / 12 * TWO_PI);
        const number = too.makeText(i === 0 ? 12 : i, x, y, styles);

        number.position.set(x, y);
        numbers.add(number);
    }

    return numbers;
}