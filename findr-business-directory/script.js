// Sample business data
const businesses = [
    {
        name: "ISBK Security Solutions",
        category: "Security",
        address: "123 Main St, City, State",
        phone: "(011) 333-8654",
        description: "Provider of advanced security systems, including CCTV monitoring, armed response, and cybersecurity solutions.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Eziko",
        category: "Restaurant",
        address: "7314 Vilakazi St, Orlando West, Soweto",
        phone: "(011) 782-4590",
        description: "Authentic traditional South African cuisine in a vibrant setting. Specializing in umngqusho, amadumbe.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Funda Nathi",
        category: "Bookstore",
        address: "5627 Maseko Ave, Dube, Soweto",
        phone: "(011) 934-6721",
        description: "Community-focused used bookstore offering affordable literature, textbooks, and rare finds.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Bruce Ndlovu Web Dev",
        category: "Web Dev",
        address: "24 Acacia Ave, Aspen Hills, Johannesburg South",
        phone: "(011) 762-8843",
        description: "Full-stack web development services specializing in responsive design, e-commerce solutions, and custom applications.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center",
        hours: "Mon-Fri: 9:00 AM - 5:00 PM",
        website: "https://brucendlovu.dev"
    },
    {
        name: "Raaz Furniture",
        category: "Carpentry",
        address: "8914 Kumalo Rd, Meadowlands, Soweto",
        phone: "(011) 845-3096",
        description: "Custom handmade furniture using sustainable local woods. Specializing in dining sets.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Sample Business 1",
        category: "Cafe",
        address: "456 Oak St, Soweto",
        phone: "(011) 555-1234",
        description: "Cozy cafe offering artisanal coffee and pastries.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Sample Business 2",
        category: "Retail",
        address: "789 Pine Rd, Johannesburg",
        phone: "(011) 555-5678",
        description: "Trendy retail store with unique clothing and accessories.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Sample Business 3",
        category: "Gym",
        address: "101 Elm Ave, Soweto",
        phone: "(011) 555-9012",
        description: "Modern gym with state-of-the-art equipment and classes.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Sample Business 4",
        category: "Bakery",
        address: "202 Birch St, Johannesburg",
        phone: "(011) 555-3456",
        description: "Freshly baked goods with a focus on local flavors.",
        image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=200&fit=crop&crop=center"
    }
];

// Populate category filter dropdown
const categoryFilter = document.getElementById('categoryFilter');
const categories = [...new Set(businesses.map(b => b.category))];
categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
});

// Function to render business cards
function renderBusinessCards(containerId, businessesToShow) {
    const container = document.getElementById(containerId);
    if (!container) return; // Prevent errors if container is not found
    container.innerHTML = ''; // Clear existing content
    businessesToShow.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.style.setProperty('--bg-image', `url(${business.image})`);
        card.innerHTML = `
            <p class="category">${business.category}</p>
            <div class="business-card-content">
                <h3>${business.name}</h3>
                <p class="address">${business.address}</p>
                <p class="phone">${business.phone}</p>
                <p class="description">${business.description}</p>
                <button class="open-btn" onclick="openBusiness('${business.name}')">Open</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Function to show all businesses page
function showAllBusinesses() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('allBusinessesPage').classList.add('active');
    renderBusinessCards('allBusinessesGrid', businesses);
}

// Function to show main page
function showMainPage() {
    document.getElementById('allBusinessesPage').classList.remove('active');
    document.getElementById('mainPage').style.display = 'block';
    // Re-render main page sections to ensure freshness
    renderBusinessCards('featuredBusinessesGrid', businesses.slice(0, 3));
    renderBusinessCards('recentBusinessesGrid', businesses.slice(0, 5));
}

// Function to open business details in modal
function openBusiness(businessName) {
    const business = businesses.find(b => b.name === businessName);
    if (!business) return;

    // Populate modal with business details
    document.getElementById('modalBusinessName').textContent = business.name;
    document.getElementById('modalCategory').textContent = business.category;
    document.getElementById('modalDescription').textContent = business.description;
    document.getElementById('modalAddress').textContent = business.address;
    document.getElementById('modalPhone').textContent = business.phone;
    
    // Handle optional fields
    const hoursElement = document.getElementById('modalHours');
    if (business.hours) {
        hoursElement.textContent = business.hours;
        hoursElement.style.display = 'flex';
    } else {
        hoursElement.style.display = 'none';
    }
    
    const websiteElement = document.getElementById('modalWebsite');
    if (business.website) {
        websiteElement.innerHTML = `<a href="${business.website}" target="_blank">${business.website}</a>`;
        websiteElement.style.display = 'flex';
    } else {
        websiteElement.style.display = 'none';
    }

    // Show modal
    document.getElementById('businessModal').style.display = 'flex';
}

// Function to close modal
function closeModal() {
    document.getElementById('businessModal').style.display = 'none';
}

// Close modal when clicking outside content
document.addEventListener('click', (event) => {
    const modal = document.getElementById('businessModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal when clicking close button
document.querySelector('.close-btn').addEventListener('click', closeModal);

// Event listeners for search and filter
document.getElementById('searchInput').addEventListener('input', filterBusinesses);
document.getElementById('categoryFilter').addEventListener('change', filterBusinesses);
document.querySelector('.search-section button').addEventListener('click', filterBusinesses);

// Search and filter functionality
function filterBusinesses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;

    const filteredBusinesses = businesses.filter(business => {
        const matchesSearch = business.name.toLowerCase().includes(searchTerm) ||
                             business.description.toLowerCase().includes(searchTerm) ||
                             business.address.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Update the "All Businesses" page if active
    if (document.getElementById('allBusinessesPage').classList.contains('active')) {
        renderBusinessCards('allBusinessesGrid', filteredBusinesses);
    }

    // Update Featured and Recent Businesses sections on main page
    renderBusinessCards('featuredBusinessesGrid', filteredBusinesses.slice(0, 3));
    renderBusinessCards('recentBusinessesGrid', filteredBusinesses.slice(0, 5));
}

// Initial render of business cards
renderBusinessCards('featuredBusinessesGrid', businesses.slice(0, 3));
renderBusinessCards('recentBusinessesGrid', businesses.slice(0, 5));

// Esc key listener
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
});