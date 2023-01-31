import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

let lovingFamilies = [];

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    const families = await getFamilies();
    lovingFamilies = families;
    await displayFamilies(lovingFamilies);
});

async function displayFamilies() {
    familiesEl.textContent = '';

    lovingFamilies.forEach((family) => {
        const familyEl = document.createElement('div');
        const h3 = document.createElement('h3');
        const bunniesEl = document.createElement('div');
        const bunnyEl = document.createElement('div');

        familyEl.classList.add('family');
        bunniesEl.classList.add('bunnies');
        bunnyEl.classList.add('bunny');

        h3.textContent = family.name;

        const fuzzyBunnies = family.fuzzy_bunnies;
        console.log(fuzzyBunnies);
        if (fuzzyBunnies.length === 0) {
            bunnyEl.classList.add('hide');
        }

        fuzzyBunnies.forEach((bunny) => {
            bunnyEl.textContent = bunny.name;

            bunnyEl.addEventListener('click', () => {
                deleteBunny(bunny.id);
                bunnyEl.classList.add('hide');
            });
        });

        bunniesEl.append(bunnyEl);
        familyEl.append(h3, bunniesEl);

        familiesEl.append(familyEl);
    });
}
