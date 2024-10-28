import { TWO_PI } from "two.js/src/utils/math";

export const DEFAULT_SCALING = 2.8;
const haloColor = '#66b3ff';


export const baseStyles = {
    // size: radius * 0.33,
    weight: 'bold',
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    // fill: haloColor,
    opacity: 1,
    fill: 'white',
    stroke: 'black',
    // linewidth: 2,
    // opacity: 0.33
};

const numerals = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

export const createNumbers = (too, scaling = DEFAULT_SCALING, styles = null) => {
    const minDimension = Math.min(too.height, too.width);
    const radius = minDimension / scaling;

    styles = styles || { ...baseStyles, size: radius * 0.25 };

    const numbers = too.makeGroup();

    for (let i = 0; i < 12; i++) {

        const x = radius * Math.sin(i / 12 * TWO_PI);
        const y = - radius * Math.cos(i / 12 * TWO_PI);
        // const value = i === 0 ? 12 : i;
        const value = numerals[i];
        const number = too.makeText(value, x, y, styles);

        number.position.set(x, y);
        numbers.add(number);
    }

    return numbers;
}