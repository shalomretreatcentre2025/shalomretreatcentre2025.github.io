// ===== SHARED RETREATS DATA =====
// Edit this ONE array to update both the Retreats page and the homepage highlights.
const retreatsData = [
    {
        id: "patrickday",
        name: "Saint Patrick: A Mini-Retreat",
        tag: "Day Retreat",
        date: "Sat. 14th March 10:45am\u20132:30pm",
        image: "https://i.postimg.cc/Vvt3rKDG/st-patrick-retreat.jpg?w=800&q=80",
        description: "A Mini-Retreat in honour of St. Patrick, with a talk by Sr. Bernadette Maria on Sr. Agnes McSweeney - The author of hail glorious St. Patrick",
        sheetName: "Patrick Day"
    },
    {
        id: "patrickmorn",
        name: "Saint Patrick\u2019s Day Dawn Event",
        tag: "Dawn Event",
        date: "Tues. 17th March 5:45am",
        image: "https://i.postimg.cc/TPT7rmyb/D658157C-52FB-4743-A9CB-766375A1D69C.png?w=800&q=80",
        description: "A call to all Christians to rise to the challenge of Saint Patrick. Morning includes Eucharistic Adoration.",
        sheetName: "Patrick Morn"
    },
    {
        id: "josephtalk",
        name: "Imitating the Virtues of Saint Joseph - Young Men's Talk",
        tag: "Evening Talk",
        date: "Thurs 19th March 6:00pm",
        image: "https://i.postimg.cc/zGytp5pb/st-joseph-retreat.jpg?w=800&q=80",
        description: "A talk by Fr. David Barrins O.P. on imitating the virtues of St. Joseph for young men aged 18-40.",
        sheetName: "St Joseph Evening"
    },
    {
        id: "youngmen",
        name: "Young Men\u2019s Retreat",
        tag: "Day Retreat",
        date: "Sun 22nd March 12:30pm",
        image: "https://i.postimg.cc/7Y6mYDF5/Young-mens-retreat.jpg?w=800&q=80",
        description: "A day for young men to pray, learn, and build fraternity. Ages 18\u201340.",
        sheetName: "Young Men's Retreat"
    }
    // To add a retreat: add a comma after the last entry and paste a new block here.
];

// ===== RETREAT INFO MAP (for retreat-signup.html) =====
// Auto-generated from retreatsData so you never need to maintain two lists.
const retreatInfo = retreatsData.reduce((map, r) => {
    map[r.id] = { name: r.name, sheetName: r.sheetName };
    return map;
}, {});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== GOOGLE SHEETS INTEGRATION =====
const scriptURL = 'https://script.google.com/macros/s/AKfycbz3bWasgGFisq-HXqzneAX9Et6m7rHTARl3SNBAXFLDCyZHYdt98_6RG_jbxx0YCQjzaQ/exec';

function handleFormSubmit(formId, successId, errorId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);
    const errorMessage = document.getElementById(errorId);
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';

        fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
            .then(() => {
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    setTimeout(() => { successMessage.style.display = 'none'; }, 5000);
                }
                form.reset();
            })
            .catch(() => {
                if (errorMessage) {
                    errorMessage.style.display = 'flex';
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// ===== RETREAT CARD RENDERER (shared by bookings.html and index.html) =====
function renderRetreatCards(retreats, containerId, limit) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';
    const items = limit ? retreats.slice(0, limit) : retreats;
    let delay = 1;
    items.forEach(retreat => {
        const card = document.createElement('div');
        card.className = 'retreat-card fade-in-delay-' + delay;
        card.innerHTML =
            '<div class="retreat-image">' +
                '<div class="retreat-tag">' + retreat.tag + '</div>' +
                '<img src="' + retreat.image + '" alt="' + retreat.name + '" loading="lazy">' +
            '</div>' +
            '<div class="retreat-content">' +
                '<h3>' + retreat.name + '</h3>' +
                '<div class="retreat-date">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">' +
                        '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>' +
                        '<line x1="16" y1="2" x2="16" y2="6"></line>' +
                        '<line x1="8" y1="2" x2="8" y2="6"></line>' +
                        '<line x1="3" y1="10" x2="21" y2="10"></line>' +
                    '</svg>' +
                    retreat.date +
                '</div>' +
                '<p>' + retreat.description + '</p>' +
                '<a href="retreat-signup.html?retreat=' + retreat.id + '" class="btn-secondary">Learn More &amp; Register</a>' +
            '</div>';
        grid.appendChild(card);
        delay = (delay % 4) + 1;
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== INITIALISE =====
document.addEventListener('DOMContentLoaded', () => {
    // Forms
    handleFormSubmit('stayUpdatedForm',  'stayUpdatedSuccess',  'stayUpdatedError');
    handleFormSubmit('facilityForm',     'facilitySuccess',     'facilityError');
    handleFormSubmit('contactPageForm',  'successMessage',      'errorMessage');
    handleFormSubmit('registrationForm', 'successMessage',      'errorMessage');

    // Homepage retreat highlights (first 3)
    renderRetreatCards(retreatsData, 'highlightsGrid', 3);

    // Bookings page (all retreats)
    renderRetreatCards(retreatsData, 'retreatsGrid');

    // Retreat signup page — populate hero + hidden fields from URL param
    const urlParams = new URLSearchParams(window.location.search);
    const retreatId  = urlParams.get('retreat');
    const titleEl    = document.getElementById('retreatTitle');
    const nameInput  = document.getElementById('retreatName');
    const sheetInput = document.getElementById('sheetName');

    if (retreatId && retreatInfo[retreatId]) {
        const info = retreatInfo[retreatId];
        // Hidden form fields
        if (nameInput)  nameInput.value  = info.name;
        if (sheetInput) sheetInput.value = info.sheetName;

        // Form title (inside the form section)
        if (titleEl) titleEl.textContent = info.name;

        // Populate hero
        const retreat = retreatsData.find(r => r.id === retreatId);
        const hero    = document.getElementById('retreatHero');
        if (hero && retreat) {
            document.getElementById('retreatHeroImg').src         = retreat.image;
            document.getElementById('retreatHeroImg').alt         = retreat.name;
            document.getElementById('retreatHeroTag').textContent = retreat.tag;
            document.getElementById('retreatHeroTitle').textContent       = retreat.name;
            document.getElementById('retreatHeroDate').textContent        = retreat.date;
            document.getElementById('retreatHeroDescription').textContent = retreat.description;
            hero.style.display = '';
        }
    } else if (titleEl) {
        titleEl.textContent = 'Retreat Registration';
    }
});
