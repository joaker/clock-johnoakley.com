export const makeCenter = (too) => (thing) => {
    thing.translation.x = too.width / 2;
    thing.translation.y = too.height / 2;
}