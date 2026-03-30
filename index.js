javascript
/* --- Page Navigation Logic --- */
function showPage(pageId) {
    // 1. Hide all pages by removing the 'active' class
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // 2. Show the target page by adding the 'active' class
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }

    // 3. Update the navigation links' active state
    // Remove 'active-tab' class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active-tab');
    });

    // Add 'active-tab' class to the link associated with the visible page
    const activeLink = document.getElementById('link-' + pageId);
    if (activeLink) {
        activeLink.classList.add('active-tab');
    }

    // 4. Smoothly scroll to the top of the new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* --- Navbar Scroll Effects --- */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    // Change navbar appearance after scrolling down 80 pixels
    if (window.scrollY > 80) {
        // Scrolled State: Add background color, blur, border, and reduce padding
        nav.classList.add('bg-[#000B3D]/90', 'backdrop-blur-3xl', 'border-white/5', 'py-5');
        // Transparent State: Remove the initial padding and transparent border
        nav.classList.remove('py-8', 'border-transparent');
    } else {
        // Transparent State: Restore initial padding and transparent border
        nav.classList.add('py-8', 'border-transparent');
        // Scrolled State: Remove background color, blur, and border
        nav.classList.remove('bg-[#000B3D]/90', 'backdrop-blur-3xl', 'border-white/5', 'py-5');
    }
});


/* --- Video Showcase Fade-in on Scroll --- */
// Intersection Observer Options
const observerOptions = {
    // The target element is considered "visible" when 20% of it is in the viewport
    threshold: 0.2
};

// Create the Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the video section has entered the viewport...
        if (entry.isIntersecting) {
            // ...add the 'visible' class to trigger the CSS transition
            entry.target.classList.add('visible');
            // Once the animation is triggered, we can stop observing this element
            // (Unless you want it to fade out and in again every time)
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Target all elements with the '.scroll-reveal' class
// In the CSS we made earlier, this is the class applied to the video container.
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});


/* --- Initialize Lucide Icons --- */
// This function replaces all placeholders (e.g., <i data-lucide="...">) 
// with the actual SVG icons. Must be called after the HTML structure is loaded.
lucide.createIcons();
