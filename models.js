// Complete Car Database with 12 models
const allCars = [
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
            engine: '3.8L Twin-Turbo V6',
            horsepower: '650 hp',
            transmission: '7-Speed DCT',
            drivetrain: 'AWD'
        },
        description: 'Track-focused supercar with aerodynamic perfection and race technology.'
    },
    {
        id: 10,
        name: 'Dynasty XL',
        category: 'luxury',
        price: 175000,
        rentPrice: 550,
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80',
        specs: {
            topSpeed: '150 mph',
            acceleration: '0-60 in 5.2s',
            engine: '4.4L V8 Twin-Turbo',
            horsepower: '523 hp',
            transmission: '8-Speed Automatic',
            drivetrain: 'AWD'
        },
        description: 'Extended wheelbase luxury sedan with executive rear seating package.'
    },
    {
        id: 11,
        name: 'Horizon S',
        category: 'sedan',
        price: 58000,
        rentPrice: 180,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
        specs: {
            topSpeed: '145 mph',
            acceleration: '0-60 in 5.8s',
            engine: '2.0L Turbo I4',
            horsepower: '260 hp',
            transmission: '8-Speed Automatic',
            drivetrain: 'FWD'
        },
        description: 'Efficient and stylish sedan perfect for urban commuters.'
    },
    {
        id: 12,
        name: 'Explorer Max',
        category: 'suv',
        price: 78000,
        rentPrice: 260,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
        specs: {
            topSpeed: '130 mph',
            acceleration: '0-60 in 6.5s',
            engine: '2.3L Turbo I4',
            horsepower: '310 hp',
            transmission: '10-Speed Automatic',
            drivetrain: 'AWD'
        },
        description: 'Family-friendly SUV with three rows and advanced safety features.'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayCars(allCars);
    setupFilters();
});

// Display cars in grid
function displayCars(cars) {
    const grid = document.getElementById('modelsGrid');
    grid.innerHTML = '';
    
    cars.forEach(car => {
        const card = createCarCard(car);
        grid.appendChild(card);
    });
}

// Create individual car card
function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.setAttribute('data-category', car.category);
    
    card.innerHTML = `
        <div class="car-image" style="background-image: url('${car.image}')">
            <div class="car-badge">${car.category.toUpperCase()}</div>
        </div>
        <div class="car-info">
            <h3 class="car-name">${car.name}</h3>
            <p class="car-description">${car.description}</p>
            <div class="car-specs-preview">
                <div class="spec-item-small">
                    <span class="spec-icon">⚡</span>
                    <span>${car.specs.horsepower}</span>
                </div>
                <div class="spec-item-small">
                    <span class="spec-icon">🏁</span>
                    <span>${car.specs.acceleration}</span>
                </div>
                <div class="spec-item-small">
                    <span class="spec-icon">🔝</span>
                    <span>${car.specs.topSpeed}</span>
                </div>
            </div>
            <div class="car-pricing">
                <div class="price-item">
                    <span class="price-label">Buy</span>
                    <span class="price-value">$${car.price.toLocaleString()}</span>
                </div>
                <div class="price-item">
                    <span class="price-label">Rent</span>
                    <span class="price-value">$${car.rentPrice}/day</span>
                </div>
            </div>
            <div class="car-actions">
                <button class="detail-btn" onclick="showCarDetails(${car.id})">View Details</button>
                <button class="inquire-btn" onclick="inquireCar(${car.id})">Inquire</button>
            </div>
        </div>
    `;
    
    return card;
}

// Setup filter functionality
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterCars(filter);
        });
    });
}

// Filter cars by category
function filterCars(category) {
    const cards = document.querySelectorAll('.car-card');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            if (card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        }
    });
}

// Show car details in modal
function showCarDetails(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="modal-car-details">
            <div class="modal-car-image" style="background-image: url('${car.image}')"></div>
            <div class="modal-car-info">
                <div class="modal-badge">${car.category.toUpperCase()}</div>
                <h2>${car.name}</h2>
                <p class="modal-description">${car.description}</p>
                
                <div class="modal-pricing">
                    <div class="modal-price-item">
                        <h4>Purchase Price</h4>
                        <p class="modal-price">$${car.price.toLocaleString()}</p>
                    </div>
                    <div class="modal-price-item">
                        <h4>Rental Rate</h4>
                        <p class="modal-price">$${car.rentPrice}/day</p>
                    </div>
                </div>
                
                <div class="modal-specs">
                    <h3>Specifications</h3>
                    <div class="modal-specs-grid">
                        ${Object.entries(car.specs).map(([key, value]) => `
                            <div class="modal-spec-item">
                                <span class="modal-spec-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                                <span class="modal-spec-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="modal-buy-btn" onclick="buyNow(${car.id})">Buy Now</button>
                    <button class="modal-rent-btn" onclick="rentNow(${car.id})">Rent Now</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('carModal').style.display = 'block';
}

// Close modal
function closeCarModal() {
    document.getElementById('carModal').style.display = 'none';
}

// Inquire about car
function inquireCar(carId) {
    const car = allCars.find(c => c.id === carId);
    alert(`Thank you for your interest in the ${car.name}! Our team will contact you shortly.`);
}

// Buy now action
function buyNow(carId) {
    const car = allCars.find(c => c.id === carId);
    alert(`Proceeding to purchase ${car.name} for $${car.price.toLocaleString()}. Our sales team will contact you to complete the transaction.`);
    closeCarModal();
}

// Rent now action
function rentNow(carId) {
    const car = allCars.find(c => c.id === carId);
    alert(`Proceeding to rent ${car.name} for $${car.rentPrice}/day. Our rental team will contact you to arrange pickup.`);
    closeCarModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('carModal');
    if (event.target === modal) {
        closeCarModal();
    }
}

