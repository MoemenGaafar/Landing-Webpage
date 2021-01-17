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
 *
*/
const allSections = document.querySelectorAll('section');

/**
 * End Global Variables

 * Start Helper Functions
 *
*/

function setupNavigationBar(){
  const docFragment = document.createDocumentFragment();
  for (section of allSections){
    let listElement = document.createElement('li');
    listElement.classList.add('menu__link');
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', 'google.com');
    linkElement.textContent = section.getAttribute('data-nav');
    docFragment.appendChild(listElement);
    listElement.appendChild(linkElement);
  }
  const navElement = document.querySelector('ul');
  navElement.appendChild(docFragment);
}



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
setupNavigationBar();

// Add class 'active' to section when near top of viewport
const scrollFunc = function setActiveSection(){
    let currMinSection = allSections[0];
    let minOffset = Math.abs(allSections[0].getBoundingClientRect().top);

    for (section of allSections){
      if (Math.abs(section.getBoundingClientRect().top) < minOffset){
        currMinSection = section;
        minOffset = Math.abs(section.getBoundingClientRect().top);
      }
    }

    for (section of allSections){
      if (section === currMinSection){
        currMinSection.classList.add('your-active-class');
      }
      else{
        section.classList.remove('your-active-class');
      }
    }

      const navElement = document.querySelector('nav');
      const listElements = navElement.querySelectorAll('li');

     for (listElement of listElements){
        if (currMinSection.getAttribute('data-nav') === listElement.textContent){
          listElement.classList.add('active__section');
        }
        else{
         listElement.classList.remove('active__section');
        }
    }
  }


/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section on link click
 document.querySelector('nav').addEventListener('click', function(event){
   event.preventDefault();
   for (section of allSections){
     if (section.getAttribute('data-nav') === event.target.textContent){
       section.scrollIntoView({behavior: 'smooth'});
     }
   }
})


// Set sections as active
document.addEventListener('scroll', scrollFunc);
