import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

let lovingFamilies = [];

logoutButton.addEventListener('click', () => {
    logout();
});

function displayFamilies(lovingFamilies) {
    // fetch families from supabase
    console.log(lovingFamilies);
    // clear out the familiesEl
    familiesEl.textContent = '';
    // loop through each family and for each family:
    lovingFamilies.forEach((family) => {
        // create three elements: an outer container then two children:
        const div1 = document.createElement('div');
        const h3 = document.createElement('h3');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        // one to hold the name and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        // add the bunnies css class to the bunnies el, and family css class to the family el
        div1.classList.add('family');
        div2.classList.add('bunnies');
        div3.classList.add('bunny');

        h3.textContent = family.name;
        // put the family name in the name element
        // for each of this family's bunnies
        const fuzzyBunnies = family.fuzzy_bunnies;
        fuzzyBunnies.forEach((bunny) => {
            //    make an element with the css class 'bunny',
            // and put the bunny's name in the text content
            div3.textContent = bunny.name;

            div3.addEventListener('click', (async) => {
                //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
                deleteBunny(bunny.id);
            });
            return div3;
        });
        // append this div1 to the bunniesEl
        // append the bunniesEl and nameEl to the familyEl
        // append the familyEl to the familiesEl
        div2.append(div3);
        div1.append(div2, h3);
        familiesEl.append(div1);
        return familiesEl;
    });
}

window.addEventListener('load', async () => {
    const families = await getFamilies();
    lovingFamilies = families;
    displayFamilies(families);
});
