export const assets = {
    base: ['base_boy.svg', 'base_girl.svg'],
    face: ['face1.svg', 'face2.svg', 'face3.svg', 'face4.svg'],
    hair: ['hair1.svg', 'hair2.svg', 'hair3.svg', 'hair4.svg', 'hair5.svg', 'hair6.svg', 'hair7.svg'],
    hairColors: ['#5d4037', '#fbc02d', '#ef5350', '#8d6e63', '#ec407a', '#3e2723', '#000000', '#ffffff', '#9c27b0', '#00bcd4'],
    shirt: ['shirt1.svg', 'shirt2.svg', 'shirt3.svg'],
    pants: ['pants1.svg', 'pants2.svg', 'pants3.svg']
};

export function cycleIndex(current, length, direction) {
    if (direction === 'next') return (current + 1) % length;
    if (direction === 'prev') return (current - 1 + length) % length;
    return current;
}

export function applyHairColor(svgText, color) {
    return svgText.replace(/var\(--hair-color\)/g, color);
}
