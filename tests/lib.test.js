import assert from 'assert';
import { cycleIndex, applyHairColor, assets } from '../public/lib.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`  ✓ ${name}`);
        passed++;
    } catch (e) {
        console.error(`  ✗ ${name}`);
        console.error(`    ${e.message}`);
        failed++;
    }
}

// cycleIndex
console.log('cycleIndex');
test('next increments', () => assert.equal(cycleIndex(0, 3, 'next'), 1));
test('next wraps at end', () => assert.equal(cycleIndex(2, 3, 'next'), 0));
test('prev decrements', () => assert.equal(cycleIndex(2, 3, 'prev'), 1));
test('prev wraps at zero', () => assert.equal(cycleIndex(0, 3, 'prev'), 2));
test('unknown direction is no-op', () => assert.equal(cycleIndex(1, 3, 'blah'), 1));

// applyHairColor
console.log('applyHairColor');
test('replaces hair color variable', () => {
    const svg = '<path fill="var(--hair-color)"/>';
    assert.equal(applyHairColor(svg, '#ff0000'), '<path fill="#ff0000"/>');
});
test('replaces multiple occurrences', () => {
    const svg = '<path fill="var(--hair-color)"/><path fill="var(--hair-color)"/>';
    assert.equal(applyHairColor(svg, '#ff0000'), '<path fill="#ff0000"/><path fill="#ff0000"/>');
});
test('no-op when variable absent', () => {
    const svg = '<path fill="red"/>';
    assert.equal(applyHairColor(svg, '#ff0000'), '<path fill="red"/>');
});

// assets
console.log('assets');
test('has base options', () => assert.ok(assets.base.length > 0));
test('has face options', () => assert.ok(assets.face.length > 0));
test('has hair options', () => assert.ok(assets.hair.length > 0));
test('has hair colors', () => assert.ok(assets.hairColors.length > 0));
test('has shirt options', () => assert.ok(assets.shirt.length > 0));
test('has pants options', () => assert.ok(assets.pants.length > 0));

// Summary
console.log('');
if (failed > 0) {
    console.error(`${failed} failed, ${passed} passed`);
    process.exit(1);
} else {
    console.log(`${passed} passed`);
}
