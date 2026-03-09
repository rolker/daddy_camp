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

// Cache for SVG text to avoid repeated network requests
const svgCache = {};

async function getSvg(url) {
    if (svgCache[url]) return svgCache[url];
    const response = await fetch(url);
    const text = await response.text();
    svgCache[url] = text;
    return text;
}

async function updatePreview() {
    console.log('Updating preview with state:', state);
    
    // 1. Update Base
    const baseUrl = `assets/${assets.base[state.base]}`;
    document.getElementById('layer-base').style.backgroundImage = `url('${baseUrl}')`;

    // 2. Update Face
    const faceUrl = `assets/face/${assets.face[state.face]}`;
    document.getElementById('layer-face').style.backgroundImage = `url('${faceUrl}')`;

    // 3. Update Hair (with color injection)
    const hairUrl = `assets/hair/${assets.hair[state.hair]}`;
    let hairSvg = await getSvg(hairUrl);
    
    // Replace the color variable in the SVG string
    const coloredHairSvg = hairSvg.replace(/var\(--hair-color\)/g, assets.hairColors[state.hairColor]);
    
    // Convert to Data URI so it works as a background image
    const encodedHair = btoa(coloredHairSvg);
    document.getElementById('layer-hair').style.backgroundImage = `url('data:image/svg+xml;base64,${encodedHair}')`;

    // 4. Update Shirt & Pants
    document.getElementById('layer-shirt').style.backgroundImage = `url('assets/shirt/${assets.shirt[state.shirt]}')`;
    document.getElementById('layer-pants').style.backgroundImage = `url('assets/pants/${assets.pants[state.pants]}')`;
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
        alert('Character saved! (State: ' + JSON.stringify(state) + ')');
    });

    updatePreview();
});
