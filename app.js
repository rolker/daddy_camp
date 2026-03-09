const state = {
    base: 0,
    hair: 0,
    hairColor: 0,
    shirt: 0,
    pants: 0
};

const assets = {
    base: ['base_boy.svg', 'base_girl.svg'],
    hair: ['hair1.svg', 'hair2.svg', 'hair3.svg', 'hair4.svg', 'hair5.svg', 'hair6.svg'],
    hairColors: ['#5d4037', '#fbc02d', '#ef5350', '#8d6e63', '#ec407a', '#3e2723', '#000000', '#ffffff'],
    shirt: ['shirt1.svg', 'shirt2.svg', 'shirt3.svg'],
    pants: ['pants1.svg', 'pants2.svg', 'pants3.svg']
};

function updatePreview() {
    console.log('Updating preview with state:', state);
    
    // Set character part images
    document.getElementById('layer-base').style.backgroundImage = `url('assets/${assets.base[state.base]}')`;
    document.getElementById('layer-hair').style.backgroundImage = `url('assets/hair/${assets.hair[state.hair]}')`;
    document.getElementById('layer-shirt').style.backgroundImage = `url('assets/shirt/${assets.shirt[state.shirt]}')`;
    document.getElementById('layer-pants').style.backgroundImage = `url('assets/pants/${assets.pants[state.pants]}')`;

    // Apply hair color using CSS variable
    document.documentElement.style.setProperty('--hair-color', assets.hairColors[state.hairColor]);
}

function handleControlClick(event) {
    const group = event.target.closest('.control-group');
    if (!group) return;

    const category = group.dataset.category;
    const isNext = event.target.classList.contains('next');
    const isPrev = event.target.classList.contains('prev');

    // Handle index wrapping for different array names
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

    // Initial render
    updatePreview();
});
