import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config.js";
import { assets, cycleIndex, applyHairColor } from "./lib.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const state = {
    base: 0,
    face: 0,
    hair: 0,
    hairColor: 0,
    shirt: 0,
    pants: 0
};

const svgCache = {};

async function getSvg(url) {
    if (svgCache[url]) return svgCache[url];
    try {
        const response = await fetch(url + '?v=12');
        const text = await response.text();
        svgCache[url] = text;
        return text;
    } catch (e) {
        return "";
    }
}

async function updatePreview() {
    document.getElementById('layer-base').innerHTML = await getSvg(`assets/base/${assets.base[state.base]}`);
    document.getElementById('layer-face').innerHTML = await getSvg(`assets/face/${assets.face[state.face]}`);

    const hairSvg = await getSvg(`assets/hair/${assets.hair[state.hair]}`);
    document.getElementById('layer-hair').innerHTML = applyHairColor(hairSvg, assets.hairColors[state.hairColor]);

    document.getElementById('layer-shirt').innerHTML = await getSvg(`assets/shirt/${assets.shirt[state.shirt]}`);
    document.getElementById('layer-pants').innerHTML = await getSvg(`assets/pants/${assets.pants[state.pants]}`);
}

function handleControlClick(event) {
    const group = event.target.closest('.control-group');
    if (!group) return;

    const category = group.dataset.category;
    const isNext = event.target.classList.contains('next');
    const isPrev = event.target.classList.contains('prev');

    const length = category === 'hairColor' ? assets.hairColors.length : assets[category].length;

    if (isNext) state[category] = cycleIndex(state[category], length, 'next');
    else if (isPrev) state[category] = cycleIndex(state[category], length, 'prev');

    updatePreview();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('controls').addEventListener('click', handleControlClick);
    document.getElementById('save-btn').addEventListener('click', () => {
        alert('Character saved! Version: 12');
    });
    updatePreview();
});
