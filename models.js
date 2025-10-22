// Default Car Database with 12 models
const defaultCars = [
    {
        id: 1,
        name: 'Phantom RS',
        category: 'sports',
        price: 75000,
        rentPrice: 250,
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f71ed?w=800&q=80',
        specs: {
            topSpeed: '195 mph',
            acceleration: '0-60 in 3.2s',
            engine: '3.0L Twin-Turbo V6',
            horsepower: '450 hp',
            transmission: '8-Speed Automatic',
            drivetrain: 'AWD'
        },
        description: 'An aggressive sports coupe designed for track performance and daily driving.'
    },
    {
        id: 2,
        name: 'Navigator Pro',
        category: 'suv',
        price: 95000,
        rentPrice: 320,
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
        specs: {
            topSpeed: '155 mph',
            acceleration: '0-60 in 4.5s',
            engine: '4.0L V8 Biturbo',
            horsepower: '550 hp',
            transmission: '9-Speed Automatic',
            drivetrain: 'AWD'
        },
        description: 'Luxury SUV combining comfort, space, and power for the modern family.'
    },
    {
        id: 3,
        name: 'Prestige S',
        category: 'sedan',
        price: 65000,
        rentPrice: 200,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
        specs: {
            topSpeed: '175 mph',
            acceleration: '0-60 in 4.0s',
            engine: '3.5L V6 Hybrid',
            horsepower: '400 hp',
            transmission: '10-Speed Automatic',
            drivetrain: 'RWD'
        },
        description: 'Executive sedan perfect for business professionals seeking elegance.'
    },
    {
        id: 4,
        name: 'Volt GT',
        category: 'electric',
        price: 125000,
        rentPrice: 400,
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
        specs: {
            topSpeed: '200 mph',
            acceleration: '0-60 in 2.1s',
            battery: '100 kWh',
            range: '396 miles',
            motors: 'Tri-Motor AWD',
            horsepower: '1020 hp'
        },
        description: 'Cutting-edge electric supercar with unmatched performance and range.'
    },
    {
        id: 5,
        name: 'Velocity X',
        category: 'sports',
        price: 89000,
        rentPrice: 280,
        image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
        specs: {
            topSpeed: '205 mph',
            acceleration: '0-60 in 2.9s',
            engine: '4.0L V8 Twin-Turbo',
            horsepower: '520 hp',
            transmission: '7-Speed DCT',
            drivetrain: 'RWD'
        },
        description: 'Pure driving excitement with razor-sharp handling and explosive power.'
    },
    {
        id: 6,
        name: 'Summit Elite',
        category: 'suv',
        price: 110000,
        rentPrice: 350,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
        specs: {
            topSpeed: '165 mph',
            acceleration: '0-60 in 4.2s',
            engine: '3.0L Inline-6 Turbo',
            horsepower: '480 hp',
            transmission: '8-Speed Automatic',
            drivetrain: 'AWD'
        },
        description: 'Premium SUV with off-road capability and luxurious interior appointments.'
    },
    {
        id: 7,
        name: 'Royal Class L',
        category: 'luxury',
        price: 145000,
        rentPrice: 450,
        image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80',
        specs: {
            topSpeed: '155 mph',
            acceleration: '0-60 in 4.8s',
            engine: '6.0L V12',
            horsepower: '563 hp',
            transmission: '8-Speed Automatic',
            drivetrain: 'RWD'
        },
        description: 'The pinnacle of luxury with handcrafted details and supreme comfort.'
    },
    {
        id: 8,
        name: 'Thunder E',
        category: 'electric',
        price: 98000,
        rentPrice: 320,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
        specs: {
            topSpeed: '180 mph',
            acceleration: '0-60 in 3.5s',
            battery: '85 kWh',
            range: '340 miles',
            motors: 'Dual-Motor AWD',
            horsepower: '670 hp'
        },
        description: 'Electric performance sedan with instant torque and smart technology.'
    },
    {
        id: 9,
        name: 'Apex R',
        category: 'sports',
        price: 159000,
        rentPrice: 500,
        image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
        specs: {
            topSpeed: '220 mph',
            acceleration: '0-60 in 2.6s',
            engine: '5.2L V10',
            horsepower: '640 hp',
            transmission: '7-Speed DCT',
            drivetrain: 'AWD'
        },
        description: 'Track-focused hypercar delivering an adrenaline-pumping experience.'
    },
    {
        id: 10,
        name: 'Urban X',
        category: 'sedan',
        price: 58000,
        rentPrice: 180,
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
        specs: {
            topSpeed: '145 mph',
            acceleration: '0-60 in 5.8s',
            engine: '2.0L Turbo',
            horsepower: '250 hp',
            transmission: 'CVT',
            drivetrain: 'FWD'
        },
        description: 'Efficient city sedan with modern technology and fuel economy.'
    },
    {
        id: 11,
        name: 'Terra Max',
        category: 'suv',
        price: 78000,
        rentPrice: 260,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
        specs: {
            topSpeed: '130 mph',
            acceleration: '0-60 in 6.5s',
            engine: '3.6L V6',
            horsepower: '295 hp',
            transmission: '9-Speed Automatic',
            drivetrain: '4WD'
        },
        description: 'Rugged SUV built for adventure with impressive towing capacity.'
    },
    {
        id: 12,
        name: 'Sovereign',
        category: 'luxury',
        price: 185000,
        rentPrice: 550,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
        specs: {
            topSpeed: '150 mph',
            acceleration: '0-60 in 5.2s',
            engine: '4.4L V8 Twin-Turbo',
            horsepower: '523 hp',
            transmission: '8-Speed Automatic',
            drivetrain: 'AWD'
        },
        description: 'Ultimate luxury sedan with cutting-edge technology and refinement.'
    }
];

// Get all cars (including custom ones from localStorage)
function getAllCars() {
    const customModels = JSON.parse(localStorage.getItem('customModels')) || [];
    const editedDefaults = JSON.parse(localStorage.getItem('editedDefaults')) || {};
    const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults')) || [];
    
    // Merge default cars with edited versions
    const mergedDefaults = defaultCars
        .filter(car => !deletedDefaults.includes(car.id))
        .map(car => {
            if (editedDefaults[car.id]) {
                return { ...car, ...editedDefaults[car.id], isDefault: true };
            }
            return { ...car, isDefault: true };
        });
    
    return [...mergedDefaults, ...customModels];
}

// Display all models
function displayModels(filter = 'all') {
    const allCars = getAllCars();
    const filteredCars = filter === 'all' ? allCars : allCars.filter(car => car.category === filter);
    
    const modelsGrid = document.getElementById('modelsGrid');
    modelsGrid.innerHTML = '';
    
    filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'model-card';
        card.innerHTML = `
            <div class="model-image-container">
                <img src="${car.image}" alt="${car.name}" class="model-image">
                <div class="model-badge">${car.category.toUpperCase()}</div>
            </div>
            <div class="model-info">
                <h3 class="model-name">${car.name}</h3>
                <p class="model-price">From $${car.price.toLocaleString()}</p>
                <p class="model-rent">Rent: $${car.rentPrice}/day</p>
                <button class="view-details-btn" onclick="showCarDetails(${car.id})">
                    View Details
                </button>
            </div>
        `;
        modelsGrid.appendChild(card);
    });
}

// Show car details
function showCarDetails(carId) {
    const allCars = getAllCars();
    const car = allCars.find(c => c.id === carId);
    
    if (!car) return;
    
    // Hide models grid
    document.querySelector('.models-section').style.display = 'none';
    document.querySelector('.filter-section').style.display = 'none';
    
    // Show detail section
    const detailSection = document.getElementById('carDetailSection');
    detailSection.style.display = 'block';
    
    // Populate details
    document.getElementById('detailBadge').textContent = car.category.toUpperCase();
    document.getElementById('detailTitle').textContent = car.name;
    document.getElementById('detailDescription').textContent = car.description;
    document.getElementById('detailCarImage').src = car.image;
    document.getElementById('detailCarImage').alt = car.name;
    document.getElementById('detailBuyPrice').textContent = `$${car.price.toLocaleString()}`;
    document.getElementById('detailRentPrice').textContent = `$${car.rentPrice}/day`;
    
    // Populate specs
    const specsGrid = document.getElementById('detailSpecsGrid');
    specsGrid.innerHTML = '';
    Object.entries(car.specs).forEach(([key, value]) => {
        const specItem = document.createElement('div');
        specItem.className = 'detail-spec-item';
        specItem.innerHTML = `
            <div class="detail-spec-label">${key}</div>
            <div class="detail-spec-value">${value}</div>
        `;
        specsGrid.appendChild(specItem);
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close detail view
function closeDetailView() {
    document.getElementById('carDetailSection').style.display = 'none';
    document.querySelector('.models-section').style.display = 'block';
    document.querySelector('.filter-section').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close modal
function closeCarModal() {
    document.getElementById('carModal').style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayModels('all');
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            displayModels(filter);
        });
    });
});
