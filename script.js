// Property Data
const properties = [
    {
        id: 1,
        title: "Modern Downtown Loft",
        location: "Downtown, New York",
        price: "$850,000",
        beds: 2,
        baths: 2,
        sqft: "1,200",
        type: "apartment",
        year: 2019,
        image: "http://static.photos/indoor/640x360/101",
        description: "Stunning modern loft in the heart of downtown featuring floor-to-ceiling windows, hardwood floors, and a gourmet kitchen with stainless steel appliances. Open concept living space perfect for entertaining.",
        images: [
            "http://static.photos/indoor/640x360/101",
            "http://static.photos/indoor/640x360/102",
            "http://static.photos/indoor/640x360/103",
            "http://static.photos/indoor/640x360/104"
        ]
    },
    {
        id: 2,
        title: "Luxury Beachfront Villa",
        location: "Miami Beach, Florida",
        price: "$2,500,000",
        beds: 5,
        baths: 4,
        sqft: "4,500",
        type: "villa",
        year: 2020,
        image: "http://static.photos/estate/640x360/55",
        description: "Exceptional beachfront property with panoramic ocean views. Features include a private pool, outdoor kitchen, master suite with balcony, and direct beach access. Smart home technology throughout.",
        images: [
            "http://static.photos/estate/640x360/55",
            "http://static.photos/indoor/640x360/201",
            "http://static.photos/outdoor/640x360/301",
            "http://static.photos/indoor/640x360/202"
        ]
    },
    {
        id: 3,
        title: "Historic Brownstone",
        location: "Brooklyn, New York",
        price: "$1,200,000",
        beds: 3,
        baths: 2,
        sqft: "2,100",
        type: "house",
        year: 1890,
        image: "http://static.photos/estate/640x360/77",
        description: "Beautifully restored historic brownstone retaining original architectural details including crown moldings, fireplace, and hardwood floors. Modern updates include central air and renovated kitchen.",
        images: [
            "http://static.photos/estate/640x360/77",
            "http://static.photos/indoor/640x360/301",
            "http://static.photos/indoor/640x360/302",
            "http://static.photos/outdoor/640x360/401"
        ]
    },
    {
        id: 4,
        title: "Penthouse Suite",
        location: "Los Angeles, California",
        price: "$3,200,000",
        beds: 4,
        baths: 3,
        sqft: "3,800",
        type: "condo",
        year: 2021,
        image: "http://static.photos/workspace/640x360/22",
        description: "Ultra-luxury penthouse with 360-degree city views. Private elevator access, rooftop terrace, wine cellar, and concierge service. Designer finishes and imported materials throughout.",
        images: [
            "http://static.photos/workspace/640x360/22",
            "http://static.photos/indoor/640x360/401",
            "http://static.photos/indoor/640x360/402",
            "http://static.photos/outdoor/640x360/501"
        ]
    },
    {
        id: 5,
        title: "Suburban Family Home",
        location: "Austin, Texas",
        price: "$650,000",
        beds: 4,
        baths: 3,
        sqft: "2,800",
        type: "house",
        year: 2015,
        image: "http://static.photos/estate/640x360/33",
        description: "Perfect family home in top-rated school district. Open floor plan, granite countertops, large backyard with deck. Two-car garage and finished basement. Close to parks and shopping.",
        images: [
            "http://static.photos/estate/640x360/33",
            "http://static.photos/indoor/640x360/501",
            "http://static.photos/outdoor/640x360/601",
            "http://static.photos/indoor/640x360/502"
        ]
    },
    {
        id: 6,
        title: "Mountain Retreat",
        location: "Aspen, Colorado",
        price: "$4,500,000",
        beds: 6,
        baths: 5,
        sqft: "5,200",
        type: "house",
        year: 2018,
        image: "http://static.photos/nature/640x360/88",
        description: "Spectacular mountain home with ski-in/ski-out access. Stone fireplace, gourmet kitchen, home theater, and heated floors. Wraparound deck with hot tub overlooking the mountains.",
        images: [
            "http://static.photos/nature/640x360/88",
            "http://static.photos/indoor/640x360/601",
            "http://static.photos/outdoor/640x360/701",
            "http://static.photos/indoor/640x360/602"
        ]
    }
];

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderProperties('all');
    setupEventListeners();
    setupNavbarScroll();
});

// Render Properties
function renderProperties(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('propertiesGrid');
    grid.innerHTML = '';

    let filteredProperties = properties;

    // Filter by type
    if (filter !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.type === filter);
    }

    // Filter by search term
    if (searchTerm) {
        filteredProperties = filteredProperties.filter(p => 
            p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Render cards
    filteredProperties.forEach((property, index) => {
        const card = createPropertyCard(property, index);
        grid.appendChild(card);
    });

    // Re-initialize icons for new elements
    lucide.createIcons();
}

// Create Property Card
function createPropertyCard(property, index) {
    const card = document.createElement('div');
    card.className = 'property-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100';
    card.style.animation = `fade-in-up 0.5s ease-out forwards ${index * 0.1}s`;
    card.style.opacity = '0';

    card.innerHTML = `
        <div class="relative h-64 overflow-hidden group">
            <img src="${property.image}" alt="${property.title}" class="w-full h-full object-cover transition duration-500 group-hover:scale-110">
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 capitalize">
                ${property.type}
            </div>
            <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                ${property.price}
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1">${property.title}</h3>
            <div class="flex items-center text-gray-500 mb-4 text-sm">
                <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                ${property.location}
            </div>
            <div class="flex items-center justify-between py-4 border-t border-b border-gray-100 mb-4">
                <div class="flex items-center gap-1 text-gray-600 text-sm">
                    <i data-lucide="bed" class="w-4 h-4"></i>
                    <span>${property.beds} Beds</span>
                </div>
                <div class="flex items-center gap-1 text-gray-600 text-sm">
                    <i data-lucide="bath" class="w-4 h-4"></i>
                    <span>${property.baths} Baths</span>
                </div>
                <div class="flex items-center gap-1 text-gray-600 text-sm">
                    <i data-lucide="maximize" class="w-4 h-4"></i>
                    <span>${property.sqft} sqft</span>
                </div>
            </div>
            <button onclick="openModal(${property.id})" class="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2 group">
                View Details
                <i data-lucide="arrow-right" class="w-4 h-4 transition group-hover:translate-x-1"></i>
            </button>
        </div>
    `;

    return card;
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            // Render properties
            renderProperties(btn.dataset.filter);
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Handle Search
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    const propertyType = document.getElementById('propertyType').value;
    
    // Scroll to properties
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
    
    // Update filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === propertyType) {
            btn.classList.add('active');
        }
    });
    
    // Render with filters
    renderProperties(propertyType, searchTerm);
}

// Open Modal
function openModal(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    // Populate modal data
    document.getElementById('modalMainImage').src = property.image;
    document.getElementById('modalPrice').textContent = property.price;
    document.getElementById('modalType').textContent = property.type;
    document.getElementById('modalId').textContent = `ID: ${String(property.id).padStart(4, '0')}`;
    document.getElementById('modalTitle').textContent = property.title;
    document.getElementById('modalLocation').textContent = property.location;
    document.getElementById('modalBeds').textContent = property.beds;
    document.getElementById('modalBaths').textContent = property.baths;
    document.getElementById('modalSqft').textContent = property.sqft;
    document.getElementById('modalDescription').textContent = property.description;
    document.getElementById('modalDetailType').textContent = property.type.charAt(0).toUpperCase() + property.type.slice(1);
    document.getElementById('modalYear').textContent = property.year;

    // Populate thumbnails
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    thumbnailsContainer.innerHTML = '';
    property.images.forEach((img, idx) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.className = `thumbnail w-20 h-20 object-cover rounded-lg flex-shrink-0 ${idx === 0 ? 'active' : ''}`;
        thumb.onclick = () => {
            document.getElementById('modalMainImage').src = img;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        };
        thumbnailsContainer.appendChild(thumb);
    });

    // Show modal
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Re-initialize icons
    lucide.createIcons();
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('propertyModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Allow search on enter key
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});