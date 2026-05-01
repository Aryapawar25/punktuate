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


/* --- Dynamic Influencer Loading --- */
async function loadInfluencers() {
    const grid = document.getElementById('influencer-grid');
    if (!grid) return;

    try {
        // Step 1: Fetch influencers.json
        const response = await fetch('influencers.json');
        if (!response.ok) throw new Error('Could not fetch influencers.json');
        
        const influencers = await response.json();
        
        if (!influencers || influencers.length === 0) {
            console.warn('No influencer data found in influencers.json');
            return;
        }

        renderInfluencers(influencers);

    } catch (error) {
        console.error('Influencer loading error:', error);
    }
}

/**
 * Renders influencer cards to the grid.
 */
function renderInfluencers(influencers) {
    const grid = document.getElementById('influencer-grid');
    if (!grid) return;

    // Apply responsive grid layout
    if (influencers.length === 1) {
        // Centered layout for a single influencer
        grid.className = 'grid grid-cols-1 max-w-[350px] md:max-w-[400px] mx-auto transition-all duration-700';
    } else {
        // Grid layout for multiple influencers
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-700';
    }

    grid.innerHTML = influencers.map(inf => `
        <div class="influencer-card glass rounded-[40px] p-8 border border-white/5 flex flex-col group scroll-reveal">
            <div class="influencer-image-wrapper mb-8 shadow-2xl overflow-hidden relative">
                <img src="${inf.image || 'placeholder.jpg'}" alt="${inf.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-[#000B3D]/60 via-transparent to-transparent opacity-60"></div>
            </div>
            
            <div class="flex-grow text-center">
                <h3 class="text-3xl font-bold mb-2 tracking-tight uppercase">${inf.name}</h3>
                <p class="text-[#D4AF37] luxury-caption text-[11px] font-bold mb-2 tracking-[0.2em]">${inf.platform}</p>
                <p class="text-[#D4AF37] font-bold text-lg mb-4">${inf.followers} <span class="text-white/40 luxury-caption text-[10px] tracking-widest ml-1">Followers</span></p>
                <p class="text-white/40 text-sm leading-relaxed mb-8 font-medium line-clamp-2 overflow-hidden text-ellipsis">${inf.bio}</p>
            </div>

            <div class="mt-auto flex justify-center">
                ${inf.link ? `
                    <a href="${inf.link}" target="_blank" class="btn-hover bg-[#D4AF37] text-[#000B3D] px-8 py-3 rounded-full luxury-caption text-[10px] font-extrabold flex items-center gap-2 group/btn shadow-lg">
                        <i class="bx bxl-instagram text-lg"></i>
                        View Profile
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');

    // Re-initialize scroll reveal for new elements
    const newElements = grid.querySelectorAll('.scroll-reveal');
    newElements.forEach(el => observer.observe(el));
    
    // Refresh icons
    if (window.lucide) {
        lucide.createIcons();
    }
}


// Initial load
document.addEventListener('DOMContentLoaded', loadInfluencers);
// Also call immediately if script is deferred/async
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadInfluencers();
}

