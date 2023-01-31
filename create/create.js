import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const selectEl = document.getElementById('family-id');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();

    // get the name and family id from the form
    const formData = new FormData(form);
    // use createBunny to create a bunny with this name and family id
    const name = formData.get('bunny-name');
    const familyId = formData.get('family-id');
    const bunny = { name: name, family_id: familyId };
    await createBunny(bunny);

    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    families.forEach((family) => {
        // create an option tag
        const option = document.createElement('option');
        // set the option's value and text content
        option.textContent = family.name;
        option.value = family.id;
        // and append the option to the select
        selectEl.append(option);
        return option;
    });
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
