const state = {
    base: 0,
    face: 0,
    hair: 0,
    hairColor: 0,
    shirt: 0,
    pants: 0
};

const assets = {
    base: ['base_boy.svg', 'base_girl.svg'],
    face: ['face1.svg', 'face2.svg', 'face3.svg', 'face4.svg'],
    hair: ['hair1.svg', 'hair2.svg', 'hair3.svg', 'hair4.svg', 'hair5.svg', 'hair6.svg', 'hair7.svg'],
    hairColors: ['#5d4037', '#fbc02d', '#ef5350', '#8d6e63', '#ec407a', '#3e2723', '#000000', '#ffffff', '#9c27b0', '#00bcd4'],
    shirt: ['shirt1.svg', 'shirt2.svg', 'shirt3.svg'],
    pants: ['pants1.svg', 'pants2.svg', 'pants3.svg']
};

const svgCache = {};

async function getSvg(url) {
    if (svgCache[url]) return svgCache[url];
    try {
        const response = await fetch(url + '?v=11'); // Prevent cache
        const text = await response.text();
        svgCache[url] = text;
        return text;
    } catch (e) {
        return "";
    }
}

async function updatePreview() {
    // 1. Update Base
    document.getElementById('layer-base').innerHTML = await getSvg(`assets/${assets.base[state.base]}`);

    // 2. Update Face
    document.getElementById('layer-face').innerHTML = await getSvg(`assets/face/${assets.face[state.face]}`);

    // 3. Update Hair (with color)
    let hairSvg = await getSvg(`assets/hair/${assets.hair[state.hair]}`);
    const coloredHairSvg = hairSvg.replace(/var\(--hair-color\)/g, assets.hairColors[state.hairColor]);
    document.getElementById('layer-hair').innerHTML = coloredHairSvg;

    // 4. Update Shirt & Pants
    document.getElementById('layer-shirt').innerHTML = await getSvg(`assets/shirt/${assets.shirt[state.shirt]}`);
    document.getElementById('layer-pants').innerHTML = await getSvg(`assets/pants/${assets.pants[state.pants]}`);
}

function handleControlClick(event) {
    const group = event.target.closest('.control-group');
    if (!group) return;

    const category = group.dataset.category;
    const isNext = event.target.classList.contains('next');
    const isPrev = event.target.classList.contains('prev');

    let arrayLength;
    if (category === 'hairColor') {
        arrayLength = assets.hairColors.length;
    } else {
        arrayLength = assets[category].length;
    }

    if (isNext) {
        state[category] = (state[category] + 1) % arrayLength;
    } else if (isPrev) {
        state[category] = (state[category] - 1 + arrayLength) % arrayLength;
    }

    updatePreview();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('controls').addEventListener('click', handleControlClick);
    document.getElementById('save-btn').addEventListener('click', () => {
        alert('Character saved! Version: 11');
    });
    updatePreview();
});
