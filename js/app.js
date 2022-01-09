/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */
const sections    = document.querySelectorAll('section');

/**
 * Start Helper Functions
 */

/**
 * Start Main Functions
 */

/* this function will add navigation bar dynamically at top of the html page, it reads
*  the items from the html tags "section"
* *  */
function addElement () {
    const fragment    = document.createDocumentFragment();
    const element     = document.getElementById('navbar__list');

    for (const section of sections) {
        const newlistItem  = document.createElement('li');
        const newtag       = document.createElement('a');
        newlistItem.classList.add("navbar__menu","menu__link",section.id);
        newtag.setAttribute('href',"#"+section.id);
        newtag.innerText=section.getAttribute("data-nav");
        newtag.addEventListener("click", function(evt) {
            scrolling(evt, section.id);
        });
        newlistItem.appendChild(newtag);
        fragment.appendChild(newlistItem);
    }
    // add the newly created element and its content into the DOM
    // reflow and repaint here -- once!
    element.appendChild(fragment);
}

// Add class 'active-viewport-class' to section when it is near top of viewport
// also add class 'active' to its associated nav bar item
function makeActive() {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        let links = document.getElementById("navbar__list").querySelector('.'+section.id);
        if (box.top <= 150 && box.bottom >= 150) {
            // 1. Add "active-viewport-class" to the current section
            // 2. Add "active" class to the Nav link which have a class same as id of the current section
            section.classList.add("active-viewport-class");
            links.classList.add("active");
        } else {
            // 1. Remove "active-viewport-class" from the current section.
            // 2. Remove "active" class from the Nav link which have a class same as id of current section
            section.classList.remove("active-viewport-class")
            links.classList.remove("active");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrolling (evt, sectionID) {
    evt.preventDefault();
    const section = document.getElementById(sectionID);
    const pos = section.offsetTop;
    window.scrollTo({
        left: 0,
        top: pos,
        behavior: 'smooth'
    });
    //console.log("hello");
}

/**
 * End Main Functions
 * Begin Events
 *
 */
// Build menu
document.addEventListener('DOMContentLoaded', addElement);

// Scroll to section on link click
// Set sections as active
document.addEventListener("scroll", makeActive);

