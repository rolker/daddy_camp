const state = {
    base: 0,
    hair: 0,
    shirt: 0,
    pants: 0
};

const assets = {
    base: ['base_boy.svg', 'base_girl.svg'],
    hair: ['hair1.svg', 'hair2.svg', 'hair3.svg'],
    shirt: ['shirt1.svg', 'shirt2.svg', 'shirt3.svg'],
    pants: ['pants1.svg', 'pants2.svg', 'pants3.svg']
};

function updatePreview() {
    document.getElementById('layer-base').style.backgroundImage = `url('assets/${assets.base[state.base]}')`;
    document.getElementById('layer-hair').style.backgroundImage = `url('assets/hair/${assets.hair[state.hair]}')`;
    document.getElementById('layer-shirt').style.backgroundImage = `url('assets/shirt/${assets.shirt[state.shirt]}')`;
    document.getElementById('layer-pants').style.backgroundImage = `url('assets/pants/${assets.pants[state.pants]}')`;
}

function handleControlClick(event) {
    const group = event.target.closest('.control-group');
    if (!group) return;

    const category = group.dataset.category;
    const isNext = event.target.classList.contains('next');
    const isPrev = event.target.classList.contains('prev');

    if (isNext) {
        state[category] = (state[category] + 1) % assets[category].length;
    } else if (isPrev) {
        state[category] = (state[category] - 1 + assets[category].length) % assets[category].length;
    }

    updatePreview();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('controls').addEventListener('click', handleControlClick);
    
    document.getElementById('save-btn').addEventListener('click', () => {
        alert('Character saved! (State: ' + JSON.stringify(state) + ')');
    });

    // Initial render
    updatePreview();
});
