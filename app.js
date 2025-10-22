// Car Database
const carDatabase = {
    sports: {
        name: 'Sports Coupe',
        price: 75000,
        rentPrice: 250,
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f71ed?w=1200&q=80',
        specs: {
            'Top Speed': '195 mph',
            'Acceleration': '0-60 in 3.2s',
            'Engine': '3.0L Twin-Turbo V6',
            'Horsepower': '450 hp',
            'Transmission': '8-Speed Automatic',
            'Drivetrain': 'AWD'
        }
    },
    suv: {
        name: 'Luxury SUV',
        price: 95000,
        rentPrice: 320,
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',
        specs: {
            'Top Speed': '155 mph',
            'Acceleration': '0-60 in 4.5s',
            'Engine': '4.0L V8 Biturbo',
            'Horsepower': '550 hp',
            'Transmission': '9-Speed Automatic',
            'Drivetrain': 'AWD'
        }
    },
    sedan: {
        name: 'Executive Sedan',
        price: 65000,
        rentPrice: 200,
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80',
        specs: {
            'Top Speed': '175 mph',
            'Acceleration': '0-60 in 4.0s',
            'Engine': '3.5L V6 Hybrid',
            'Horsepower': '400 hp',
            'Transmission': '10-Speed Automatic',
            'Drivetrain': 'RWD'
        }
    },
    electric: {
        name: 'Electric GT',
        price: 125000,
        rentPrice: 400,
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80',
        specs: {
            'Top Speed': '200 mph',
            'Acceleration': '0-60 in 2.1s',
            'Battery': '100 kWh',
            'Range': '396 miles',
            'Motors': 'Tri-Motor AWD',
            'Horsepower': '1020 hp'
        }
    }
};

let currentCarType = 'sports';

// Initialize
function init() {
    // Display initial car
    displayCar(currentCarType);
    updateSpecs(currentCarType);
    
    // Car selection buttons
    document.querySelectorAll('.car-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.car-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const carType = this.dataset.car;
            switchCar(carType);
        });
    });
}

// Display car image
function displayCar(type) {
    const carData = carDatabase[type];
    const carImage = document.getElementById('carImage');
    
    if (carImage && carData) {
        carImage.src = carData.image;
        carImage.alt = carData.name;
    }
}

// Switch to different car
function switchCar(type) {
    currentCarType = type;
    displayCar(type);
    updateSpecs(type);
}

// Update specifications display
function updateSpecs(type) {
    const carData = carDatabase[type];
    const specsGrid = document.getElementById('specs-grid');
    const buyPrice = document.getElementById('buy-price');
    const rentPrice = document.getElementById('rent-price');
    
    // Update specs
    if (specsGrid) {
        specsGrid.innerHTML = '';
        Object.entries(carData.specs).forEach(([key, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <div class="spec-label">${key}</div>
                <div class="spec-value">${value}</div>
            `;
            specsGrid.appendChild(specItem);
        });
    }
    
    // Update prices
    if (buyPrice) {
        buyPrice.textContent = `$${carData.price.toLocaleString()}`;
    }
    if (rentPrice) {
        rentPrice.textContent = `$${carData.rentPrice}/day`;
    }
}

// Modal functions
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    
    if (type === 'buy') {
        modalTitle.textContent = `Purchase ${carDatabase[currentCarType].name}`;
    } else {
        modalTitle.textContent = `Rent ${carDatabase[currentCarType].name}`;
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    const form = document.getElementById('inquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your inquiry! We will contact you shortly.');
            closeModal();
            form.reset();
        });
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    };
});
