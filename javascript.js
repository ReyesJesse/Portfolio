// Cache frequently used DOM elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navUl = document.querySelector('nav ul');
const descriptionPart2 = document.getElementById('description-part2');
const button = document.querySelector('.left-description button');
const contentContainer = document.getElementById('content-container');
const themeToggle = document.getElementById('theme-toggle');
const themeIconLight = document.getElementById('theme-icon-light');
const themeIconDark = document.getElementById('theme-icon-dark');

// Event listener for hamburger menu click
hamburgerMenu.addEventListener('click', function() {
    navUl.classList.toggle('open');
    hamburgerMenu.classList.toggle('open');
});

function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.onload = function() {
            // Once image is loaded, allow scroll
            contentContainer.style.overflowY = "scroll";
        };
        img.src = url;
    });
}
// Toggle description visibility
function toggleDescription() {
    if (descriptionPart2.style.display === 'none') {
        descriptionPart2.style.display = 'block';
        button.textContent = 'Read less';
        typeText(descriptionPart2.textContent, descriptionPart2);
    } else {
        descriptionPart2.style.display = 'none';
        button.textContent = 'Read more';
    }
}

// Function to simulate typing animation
function typeText(text, element) {
    element.textContent = ''; // Clear existing text

    var index = 0;
    var interval = setInterval(function() {
        element.textContent += text[index];
        index++;
        if (index >= text.length) {
            clearInterval(interval);
        }
    }, 50); // Adjust the interval to control typing speed
}

// Hide the address bar on page load and scroll
window.addEventListener("load", function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);
});

// JavaScript to hide scroll bar when scrolling down
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Downscroll
        contentContainer.style.overflowY = "hidden";
    } else {
        // Upscroll
        contentContainer.style.overflowY = "scroll";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);

// Function to check if the screen width is less than or equal to 768px
function checkScreenWidth() {
    if (window.matchMedia('(max-width: 768px)').matches) {
        // Apply styles for small screens
        document.body.classList.add('small-screen');
    } else {
        // Remove styles for small screens
        document.body.classList.remove('small-screen');
    }
}

// Initial check when the page loads
checkScreenWidth();

// Listen for resize events to dynamically adjust styles
window.addEventListener('resize', checkScreenWidth);

// Function to toggle theme
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    updateThemeIcons();
});

function updateThemeIcons() {
    if (document.body.classList.contains('dark-mode')) {
        themeIconLight.style.opacity = '1';
        themeIconLight.style.pointerEvents = 'auto';
        themeIconDark.style.opacity = '0';
        themeIconDark.style.pointerEvents = 'none';
    } else {
        themeIconLight.style.opacity = '0';
        themeIconLight.style.pointerEvents = 'none';
        themeIconDark.style.opacity = '1';
        themeIconDark.style.pointerEvents = 'auto';
    }
}

// Initialize the correct theme icon on page load
window.addEventListener('DOMContentLoaded', function() {
    updateThemeIcons();
});

// Preload images
const imageUrls = ['self-portrait.png', 'image2.jpg', 'image3.jpg'];
preloadImages(imageUrls);
// JavaScript to add class on scroll
window.addEventListener('scroll', function() {
    var projectsSection = document.querySelector('.projects-section');
    var sectionPosition = projectsSection.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.4;

    if (sectionPosition < screenPosition) {
        projectsSection.classList.add('show-underline');
    }
});

// document.addEventListener('DOMContentLoaded', function () {
//     // Get the projects link element
//     var projectsLink = document.querySelector('a[href="#jump-to-projects"]');
    
//     // Add a click event listener to the projects link
//     projectsLink.addEventListener('click', function (event) {
//         event.preventDefault(); // Prevent the default scroll behavior
//         var targetElement = document.querySelector('.projects-section'); // Get the target element by class name
//         targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     });

//     // Get the contact link element
//     var contactLink = document.querySelector('a[href="#contact"]');
    
//     // Add a click event listener to the contact link
//     contactLink.addEventListener('click', function (event) {
//         event.preventDefault(); // Prevent the default scroll behavior
//         var targetElement = document.querySelector('#contact'); // Get the target element by ID
//         targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     });

//     // Get the about link element
//     var aboutLink = document.querySelector('a[href="#about-me"]');
    
//     // Add a click event listener to the about link
//     aboutLink.addEventListener('click', function (event) {
//         event.preventDefault(); // Prevent the default scroll behavior
//         var targetElement = document.querySelector('#about-me'); // Get the target element by ID
//         targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     });
// });
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.page-transition-link');
    const overlay = document.querySelector('.page-transition-overlay');
    const overlay2nd = document.querySelector('.page-transition-overlay-2nd');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            // Show first overlay
            overlay.style.display = 'block';

            // Simulate delay for transition effect
            setTimeout(function() {
                // Show second overlay after delay
                overlay2nd.style.display = 'block';

                // Simulate delay for second overlay transition effect
                setTimeout(function() {
                    // Navigate to the link's href
                    window.location.href = link.getAttribute('href');
                }, 0); // Duration should match animation duration for second overlay
            }, 0); // Duration should match animation duration for first overlay
        });
    });

    // Listen for the end of the animation on the second overlay
    overlay2nd.addEventListener('animationend', function() {
        // Hide both overlays when animation ends
        overlay.style.display = 'none';
        overlay2nd.style.display = 'none';
    });
});

// Function to open a new window when a link is clicked
function openNewWindow(event) {
    event.preventDefault(); // Prevent the default link behavior (opening in the same window)
    const url = event.currentTarget.href; // Get the link URL
    window.open(url, '_blank'); // Open the link URL in a new window/tab
}
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.projects-section-container > div');

    // Function to create IntersectionObserver with a given threshold
    const createObserver = (threshold) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Stop observing once the animation has triggered
                }
            });
        }, { threshold });

        items.forEach(item => {
            observer.observe(item);
        });
    };

    // Check the screen width to determine the appropriate threshold
    const mediaQuery = window.matchMedia('(max-width: 1200px)');

    // Set the initial observer based on the current screen width
    createObserver(mediaQuery.matches ? 0 : 0.2);

    // Add a listener to handle changes in screen width
    mediaQuery.addListener((e) => {
        // Remove existing observers
        items.forEach(item => {
            item.classList.remove('in-view'); // Reset the in-view class
        });

        // Create a new observer with the updated threshold
        createObserver(e.matches ? 0 : 0.2);
    });
});
// Select the target section
const aboutSection = document.querySelector('#about-me');

// Create an Intersection Observer instance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the section is intersecting, shuffle and show the skill cards
      shuffleSkillCards();
      // Stop observing once the section is shown
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1}); // Adjust the threshold as needed

// Observe the target section
observer.observe(aboutSection);

// Function to shuffle the skill cards and add the 'show' class after a delay
function shuffleSkillCards() {
  const skillCards = Array.from(document.querySelectorAll('.skill-card'));

  // Shuffle the array of skill cards
  skillCards.sort(() => Math.random() - 0.5);

  skillCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('show');
    }, index * 500); // Adjust the delay (200ms in this example)
  });
}

document.addEventListener("DOMContentLoaded", function() {
    const target = document.querySelector("#about-me h1");
    const lines = document.querySelectorAll("#about-me .line");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                target.classList.add("animate");
                lines.forEach(line => line.classList.add("animate"));
                observer.unobserve(target); // Stop observing after the animation is triggered
            }
        });
    });

    observer.observe(target);
});
// JavaScript to handle click on images and show modal
document.addEventListener("DOMContentLoaded", function() {
    const galleryImages = document.querySelectorAll(".gallery img");
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");

    galleryImages.forEach(function(img) {
        img.addEventListener("click", function() {
            const modalContent = document.createElement("div");
            modalContent.setAttribute("id", "modal-content");
            const largerImg = new Image();
            largerImg.src = img.src.replace("/thumbnails/", "/large/"); // Replace this with the path to your larger images
            largerImg.alt = img.alt;
            modalContent.appendChild(largerImg);

            modal.innerHTML = ""; // Clear previous content
            modal.appendChild(modalContent);
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Prevent scrolling on background
        });
    });

    // Close the modal when the close button is clicked
    modal.addEventListener("click", function(e) {
        if (e.target === modal || e.target.id === "modal-close") {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Restore scrolling on background
        }
    });

    // Add the close button to the modal
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("id", "modal-close");
    modal.appendChild(closeButton);

    document.body.appendChild(modal);
});
document.addEventListener("DOMContentLoaded", function() {
    const imageContainers = document.querySelectorAll(".image-container");

    // Function to close descriptions
    function closeDescriptions() {
        imageContainers.forEach(function(container) {
            container.classList.remove("active");
            const description = container.querySelector(".image-description");
            if (description) {
                description.style.opacity = "0";
            }
        });
    }

    imageContainers.forEach(function(container) {
        container.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent document click listener from triggering
            // Toggle active class on the clicked image container
            container.classList.toggle("active");

            // Toggle display of image description
            const description = container.querySelector(".image-description");
            if (description) {
                description.style.opacity = description.style.opacity === "1" ? "0" : "1";
            }

            // Close other open descriptions
            imageContainers.forEach(function(otherContainer) {
                if (otherContainer !== container) {
                    otherContainer.classList.remove("active");
                    const otherDescription = otherContainer.querySelector(".image-description");
                    if (otherDescription) {
                        otherDescription.style.opacity = "0";
                    }
                }
            });
        });
    });

    // Close descriptions when clicking outside of image containers
    document.addEventListener("click", function(event) {
        const isClickInsideImageContainer = Array.from(imageContainers).some(function(container) {
            return container.contains(event.target);
        });
        if (!isClickInsideImageContainer) {
            closeDescriptions();
        }
    });

    // Close descriptions on ESC key press
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeDescriptions();
        }
    });
});
