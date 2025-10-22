// Three.js variables for detail view
let detailScene, detailCamera, detailRenderer, detailCurrentCar;
let detailIsDragging = false;
let detailPreviousMouseX = 0, detailPreviousMouseY = 0;
let detailTargetRotationX = 0, detailTargetRotationY = 0;
let detailAnimationId = null;

// Car visual configurations
const carVisualConfig = {
    sports: { 
        color: 0xe82127, 
        accentColor: 0xff4444, 
        style: 'aggressive',
        bodyHeight: 0.9,
        bodyLength: 4,
        hasSpoiler: true,
        hasStripes: true
    },
    suv: { 
        color: 0x0a0a0a, 
        accentColor: 0x444444, 
        style: 'luxury',
        bodyHeight: 1.6,
        bodyLength: 4.5,
        hasTrim: true
    },
    sedan: { 
        color: 0x1e3a5f, 
        accentColor: 0x3498db, 
        style: 'elegant',
        bodyHeight: 1.2,
        bodyLength: 4,
        hasSideAccent: true
    },
    electric: { 
        color: 0xcccccc, 
        accentColor: 0x00ff88, 
        style: 'futuristic',
        bodyHeight: 1.0,
        bodyLength: 4,
        hasUnderglow: true
    },
    luxury: { 
        color: 0x1a1a2e, 
        accentColor: 0xc7a26a, 
        style: 'premium',
        bodyHeight: 1.3,
        bodyLength: 4.8,
        hasChrome: true
    }
};

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

// Get all cars (default + custom from localStorage, excluding deleted defaults)
function getAllCars() {
    const customModels = JSON.parse(localStorage.getItem('customModels') || '[]');
    const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults') || '[]');
    const editedDefaults = JSON.parse(localStorage.getItem('editedDefaults') || '[]');
    
    // Filter out deleted defaults and replace with edited versions
    const activeDefaults = defaultCars
        .filter(model => !deletedDefaults.includes(model.id))
        .map(model => {
            const edited = editedDefaults.find(e => e.id === model.id);
            return edited || model;
        });
    
    return [...activeDefaults, ...customModels];
}

// Make allCars available globally
let allCars = getAllCars();

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    allCars = getAllCars(); // Refresh on load
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

// Show car details with 3D viewer
function showCarDetails(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    
    // Hide models grid and show detail section
    document.querySelector('.models-section').style.display = 'none';
    document.querySelector('.filter-section').style.display = 'none';
    document.getElementById('carDetailSection').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update detail information
    document.getElementById('detailBadge').textContent = car.category.toUpperCase();
    document.getElementById('detailTitle').textContent = car.name;
    document.getElementById('detailDescription').textContent = car.description;
    document.getElementById('detailBuyPrice').textContent = `$${car.price.toLocaleString()}`;
    document.getElementById('detailRentPrice').textContent = `$${car.rentPrice}/day`;
    
    // Update specifications
    const specsGrid = document.getElementById('detailSpecsGrid');
    specsGrid.innerHTML = '';
    Object.entries(car.specs).forEach(([label, value]) => {
        const specItem = document.createElement('div');
        specItem.className = 'detail-spec-item';
        specItem.innerHTML = `
            <div class="detail-spec-label">${label.charAt(0).toUpperCase() + label.slice(1).replace(/([A-Z])/g, ' $1')}</div>
            <div class="detail-spec-value">${value}</div>
        `;
        specsGrid.appendChild(specItem);
    });
    
    // Setup buy/rent button handlers
    document.getElementById('detailBuyBtn').onclick = () => buyNow(car.id);
    document.getElementById('detailRentBtn').onclick = () => rentNow(car.id);
    
    // Initialize 3D viewer
    setTimeout(() => {
        init3DDetailViewer(car);
    }, 100);
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

// Close detail view and return to grid
function closeDetailView() {
    // Stop animation loop
    if (detailAnimationId) {
        cancelAnimationFrame(detailAnimationId);
        detailAnimationId = null;
    }
    
    // Clean up Three.js
    if (detailRenderer) {
        detailRenderer.dispose();
        detailRenderer = null;
    }
    if (detailScene) {
        detailScene = null;
    }
    
    // Reset rotation values
    detailTargetRotationX = 0;
    detailTargetRotationY = 0;
    
    // Show models grid and hide detail section
    document.getElementById('carDetailSection').style.display = 'none';
    document.querySelector('.filter-section').style.display = 'block';
    document.querySelector('.models-section').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize 3D Detail Viewer
function init3DDetailViewer(car) {
    const canvas = document.getElementById('detailCanvas3d');
    if (!canvas) return;
    
    // Clean up existing scene
    if (detailRenderer) {
        detailRenderer.dispose();
    }
    if (detailAnimationId) {
        cancelAnimationFrame(detailAnimationId);
    }
    
    // Scene
    detailScene = new THREE.Scene();
    detailScene.background = new THREE.Color(0x0a0a0a);
    detailScene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    
    // Camera
    detailCamera = new THREE.PerspectiveCamera(
        45,
        canvas.parentElement.clientWidth / canvas.parentElement.clientHeight,
        0.1,
        1000
    );
    detailCamera.position.set(8, 4, 12);
    detailCamera.lookAt(0, 0, 0);
    
    // Renderer
    detailRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    detailRenderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    detailRenderer.setPixelRatio(window.devicePixelRatio);
    detailRenderer.shadowMap.enabled = true;
    detailRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    detailScene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    detailScene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0x4488ff, 0.3);
    directionalLight2.position.set(-5, 5, -5);
    detailScene.add(directionalLight2);
    
    const rimLight = new THREE.DirectionalLight(0xff4444, 0.4);
    rimLight.position.set(0, 2, -10);
    detailScene.add(rimLight);
    
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 15, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.castShadow = true;
    detailScene.add(spotLight);
    
    // Ground
    const groundGeometry = new THREE.CircleGeometry(20, 64);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    detailScene.add(ground);
    
    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x1a1a1a);
    gridHelper.position.y = -0.99;
    detailScene.add(gridHelper);
    
    // Create car with image enhancement
    create3DCar(car);
    
    // Event Listeners
    canvas.addEventListener('mousedown', onDetailMouseDown);
    canvas.addEventListener('mousemove', onDetailMouseMove);
    canvas.addEventListener('mouseup', onDetailMouseUp);
    canvas.addEventListener('wheel', onDetailWheel);
    canvas.addEventListener('touchstart', onDetailTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onDetailTouchMove, { passive: false });
    canvas.addEventListener('touchend', onDetailTouchEnd);
    
    // Start animation
    animateDetail();
}

// Create 3D Car Model (now async to support image enhancement)
async function create3DCar(car) {
    if (detailCurrentCar) {
        detailScene.remove(detailCurrentCar);
    }
    
    detailCurrentCar = new THREE.Group();
    const category = car.category;
    const config = carVisualConfig[category];
    
    // Try to enhance with image
    let enhancedData = null;
    if (car.image && typeof enhanceCarWithImage === 'function') {
        enhancedData = await enhanceCarWithImage(detailCurrentCar, car.image, category);
    }
    
    // Materials with image enhancement
    let bodyMaterial;
    if (enhancedData && enhancedData.colors) {
        bodyMaterial = new THREE.MeshStandardMaterial({
            color: enhancedData.colors.primary,
            metalness: category === 'suv' ? 0.3 : (enhancedData.colors.isDark ? 0.9 : 0.7),
            roughness: category === 'suv' ? 0.8 : (enhancedData.colors.luminance > 0.7 ? 0.2 : 0.1),
            envMapIntensity: 1.2
        });
        
        if (enhancedData.texture) {
            bodyMaterial.map = enhancedData.texture;
            bodyMaterial.needsUpdate = true;
        }
    } else {
        bodyMaterial = new THREE.MeshStandardMaterial({
            color: config.color,
            metalness: category === 'suv' ? 0.3 : 0.9,
            roughness: category === 'suv' ? 0.8 : 0.1,
            envMapIntensity: 1
        });
    }
    
    const accentColor = (enhancedData && enhancedData.colors) ? enhancedData.colors.accent : config.accentColor;
    const accentMaterial = new THREE.MeshStandardMaterial({
        color: accentColor,
        metalness: 0.9,
        roughness: 0.1,
        emissive: category === 'electric' ? accentColor : 0x000000,
        emissiveIntensity: category === 'electric' ? 0.3 : 0
    });
    
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: category === 'electric' ? 0x88ffcc : 0x88ccff,
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        transparent: true,
        opacity: 0.5
    });
    
    const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2
    });
    
    const rimColor = category === 'electric' ? accentColor : (category === 'sports' ? (enhancedData && enhancedData.colors ? enhancedData.colors.primary : 0xff0000) : 0xcccccc);
    const rimMaterial = new THREE.MeshStandardMaterial({
        color: rimColor,
        metalness: 1,
        roughness: 0.1,
        emissive: category === 'electric' ? accentColor : 0x000000,
        emissiveIntensity: category === 'electric' ? 0.2 : 0
    });
    
    // Car body dimensions - Use config values
    const bodyWidth = category === 'sports' ? 2.0 : (category === 'suv' ? 2.0 : (category === 'electric' ? 1.9 : 1.8));
    const bodyHeight = config.bodyHeight;
    const bodyLength = config.bodyLength;
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    detailCurrentCar.add(body);
    
    // Cabin/Roof - Very distinctive per type
    let cabinWidth, cabinHeight, cabinLength, cabinZOffset;
    
    if (category === 'sports') {
        cabinWidth = bodyWidth - 0.4;
        cabinHeight = 0.5;
        cabinLength = bodyLength * 0.5;
        cabinZOffset = -0.5;
    } else if (category === 'suv') {
        cabinWidth = bodyWidth - 0.2;
        cabinHeight = 1.3;
        cabinLength = bodyLength * 0.65;
        cabinZOffset = 0.2;
    } else if (category === 'sedan') {
        cabinWidth = bodyWidth - 0.3;
        cabinHeight = 0.9;
        cabinLength = bodyLength * 0.58;
        cabinZOffset = -0.1;
    } else if (category === 'electric') {
        cabinWidth = bodyWidth - 0.25;
        cabinHeight = 0.7;
        cabinLength = bodyLength * 0.62;
        cabinZOffset = 0;
    } else {
        cabinWidth = bodyWidth - 0.2;
        cabinHeight = 0.9;
        cabinLength = bodyLength * 0.6;
        cabinZOffset = 0;
    }
    
    const cabinGeometry = new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength);
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial);
    cabin.position.y = bodyHeight / 2 + cabinHeight / 2 + 0.5;
    cabin.position.z = cabinZOffset;
    cabin.castShadow = true;
    detailCurrentCar.add(cabin);
    
    // Windows
    const windowGeometry = new THREE.BoxGeometry(cabinWidth - 0.1, cabinHeight - 0.2, cabinLength - 0.2);
    const windows = new THREE.Mesh(windowGeometry, glassMaterial);
    windows.position.copy(cabin.position);
    detailCurrentCar.add(windows);
    
    // Hood
    const hoodGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight * 0.7, bodyLength * 0.35);
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.position.y = 0.5;
    hood.position.z = bodyLength * 0.425;
    hood.castShadow = true;
    detailCurrentCar.add(hood);
    
    // Trunk
    const trunkGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight * 0.6, bodyLength * 0.25);
    const trunk = new THREE.Mesh(trunkGeometry, bodyMaterial);
    trunk.position.y = 0.5;
    trunk.position.z = -bodyLength * 0.45;
    trunk.castShadow = true;
    detailCurrentCar.add(trunk);
    
    // Wheels - Different sizes per type
    let wheelRadius, wheelWidth;
    
    if (category === 'sports') {
        wheelRadius = 0.42;
        wheelWidth = 0.35;
    } else if (category === 'suv') {
        wheelRadius = 0.5;
        wheelWidth = 0.35;
    } else if (category === 'sedan') {
        wheelRadius = 0.38;
        wheelWidth = 0.28;
    } else if (category === 'electric') {
        wheelRadius = 0.4;
        wheelWidth = 0.25;
    } else {
        wheelRadius = 0.4;
        wheelWidth = 0.3;
    }
    const wheelGeometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 32);
    const rimGeometry = new THREE.CylinderGeometry(wheelRadius * 0.6, wheelRadius * 0.6, wheelWidth + 0.05, 6);
    
    const wheelPositions = [
        { x: bodyWidth / 2 + 0.15, z: bodyLength * 0.35 },
        { x: -bodyWidth / 2 - 0.15, z: bodyLength * 0.35 },
        { x: bodyWidth / 2 + 0.15, z: -bodyLength * 0.3 },
        { x: -bodyWidth / 2 - 0.15, z: -bodyLength * 0.3 }
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos.x, 0, pos.z);
        wheel.castShadow = true;
        detailCurrentCar.add(wheel);
        
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(pos.x, 0, pos.z);
        detailCurrentCar.add(rim);
    });
    
    // Headlights
    const headlightGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const headlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffcc,
        emissive: 0xffffaa,
        emissiveIntensity: 0.5
    });
    
    const headlightLeft = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightLeft.position.set(-bodyWidth / 2 + 0.2, 0.6, bodyLength / 2 + 0.1);
    detailCurrentCar.add(headlightLeft);
    
    const headlightRight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightRight.position.set(bodyWidth / 2 - 0.2, 0.6, bodyLength / 2 + 0.1);
    detailCurrentCar.add(headlightRight);
    
    // Taillights
    const taillightMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.3
    });
    
    const taillightLeft = new THREE.Mesh(headlightGeometry, taillightMaterial);
    taillightLeft.position.set(-bodyWidth / 2 + 0.2, 0.6, -bodyLength / 2 - 0.1);
    detailCurrentCar.add(taillightLeft);
    
    const taillightRight = new THREE.Mesh(headlightGeometry, taillightMaterial);
    taillightRight.position.set(bodyWidth / 2 - 0.2, 0.6, -bodyLength / 2 - 0.1);
    detailCurrentCar.add(taillightRight);
    
    // Sports Car Features - AGGRESSIVE
    if (category === 'sports') {
        // Large rear spoiler
        const spoilerGeometry = new THREE.BoxGeometry(bodyWidth - 0.2, 0.15, 0.8);
        const spoiler = new THREE.Mesh(spoilerGeometry, accentMaterial);
        spoiler.position.set(0, 1.0, -bodyLength / 2 + 0.4);
        detailCurrentCar.add(spoiler);
        
        const spoilerSupport1 = new THREE.BoxGeometry(0.12, 0.4, 0.12);
        const support1 = new THREE.Mesh(spoilerSupport1, bodyMaterial);
        support1.position.set(-0.7, 0.8, -bodyLength / 2 + 0.4);
        detailCurrentCar.add(support1);
        
        const support2 = new THREE.Mesh(spoilerSupport1, bodyMaterial);
        support2.position.set(0.7, 0.8, -bodyLength / 2 + 0.4);
        detailCurrentCar.add(support2);
        
        // Racing stripes
        const stripeGeometry = new THREE.BoxGeometry(0.4, 0.02, bodyLength * 0.9);
        const stripe = new THREE.Mesh(stripeGeometry, accentMaterial);
        stripe.position.set(0, bodyHeight + 0.51, 0);
        detailCurrentCar.add(stripe);
        
        // Front air intakes
        const intakeGeometry = new THREE.BoxGeometry(0.6, 0.25, 0.1);
        const intakeLeft = new THREE.Mesh(intakeGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
        intakeLeft.position.set(-0.5, 0.4, bodyLength / 2 + 0.05);
        detailCurrentCar.add(intakeLeft);
        
        const intakeRight = new THREE.Mesh(intakeGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
        intakeRight.position.set(0.5, 0.4, bodyLength / 2 + 0.05);
        detailCurrentCar.add(intakeRight);
    }
    
    // SUV Features - RUGGED
    if (category === 'suv') {
        // Chrome trim
        const trimGeometry = new THREE.BoxGeometry(bodyWidth + 0.08, 0.12, bodyLength);
        const trim = new THREE.Mesh(trimGeometry, rimMaterial);
        trim.position.set(0, 0.25, 0);
        detailCurrentCar.add(trim);
        
        // Roof rack
        const rackGeometry = new THREE.BoxGeometry(bodyWidth - 0.4, 0.08, bodyLength * 0.6);
        const rack = new THREE.Mesh(rackGeometry, new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.3
        }));
        rack.position.set(0, bodyHeight / 2 + cabinHeight + 0.54, 0);
        detailCurrentCar.add(rack);
        
        // Side steps
        const stepGeometry = new THREE.BoxGeometry(0.15, 0.05, bodyLength * 0.7);
        const stepLeft = new THREE.Mesh(stepGeometry, rimMaterial);
        stepLeft.position.set(bodyWidth / 2 + 0.1, -0.15, 0);
        detailCurrentCar.add(stepLeft);
        
        const stepRight = new THREE.Mesh(stepGeometry, rimMaterial);
        stepRight.position.set(-bodyWidth / 2 - 0.1, -0.15, 0);
        detailCurrentCar.add(stepRight);
    }
    
    // Sedan Features - ELEGANT
    if (category === 'sedan') {
        // Chrome side accent lines
        const sideAccentGeometry = new THREE.BoxGeometry(0.06, 0.15, bodyLength * 0.75);
        const sideAccent1 = new THREE.Mesh(sideAccentGeometry, accentMaterial);
        sideAccent1.position.set(bodyWidth / 2 + 0.05, 0.65, 0);
        detailCurrentCar.add(sideAccent1);
        
        const sideAccent2 = new THREE.Mesh(sideAccentGeometry, accentMaterial);
        sideAccent2.position.set(-bodyWidth / 2 - 0.05, 0.65, 0);
        detailCurrentCar.add(sideAccent2);
        
        // Chrome grille
        const grilleGeometry = new THREE.BoxGeometry(bodyWidth * 0.7, 0.3, 0.08);
        const grille = new THREE.Mesh(grilleGeometry, accentMaterial);
        grille.position.set(0, 0.5, bodyLength / 2 + 0.04);
        detailCurrentCar.add(grille);
    }
    
    // Electric Car Features - FUTURISTIC
    if (category === 'electric') {
        // Bright underglow
        const underglowGeometry = new THREE.BoxGeometry(bodyWidth - 0.15, 0.08, bodyLength - 0.4);
        const underglowMaterial = new THREE.MeshStandardMaterial({
            color: accentColor,
            emissive: accentColor,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.9
        });
        const underglow = new THREE.Mesh(underglowGeometry, underglowMaterial);
        underglow.position.set(0, -0.25, 0);
        detailCurrentCar.add(underglow);
        
        // Futuristic front diffuser
        const diffuserGeometry = new THREE.BoxGeometry(bodyWidth * 0.8, 0.15, 0.25);
        const diffuser = new THREE.Mesh(diffuserGeometry, accentMaterial);
        diffuser.position.set(0, 0.2, bodyLength / 2 + 0.1);
        detailCurrentCar.add(diffuser);
        
        // Aerodynamic side blades
        const bladeGeometry = new THREE.BoxGeometry(0.08, 0.3, 1.0);
        const bladeLeft = new THREE.Mesh(bladeGeometry, accentMaterial);
        bladeLeft.position.set(bodyWidth / 2 + 0.04, 0.5, bodyLength * 0.15);
        detailCurrentCar.add(bladeLeft);
        
        const bladeRight = new THREE.Mesh(bladeGeometry, accentMaterial);
        bladeRight.position.set(-bodyWidth / 2 - 0.04, 0.5, bodyLength * 0.15);
        detailCurrentCar.add(bladeRight);
    }
    
    // Luxury Car Features - PREMIUM
    if (category === 'luxury') {
        // Chrome grille
        const grilleGeometry = new THREE.BoxGeometry(bodyWidth * 0.8, 0.4, 0.1);
        const grilleMaterial = new THREE.MeshStandardMaterial({
            color: accentColor,
            metalness: 1,
            roughness: 0.1
        });
        const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
        grille.position.set(0, 0.6, bodyLength / 2 + 0.05);
        detailCurrentCar.add(grille);
        
        // Side chrome trim
        const trimGeometry = new THREE.BoxGeometry(0.08, 0.15, bodyLength * 0.8);
        const trimLeft = new THREE.Mesh(trimGeometry, grilleMaterial);
        trimLeft.position.set(bodyWidth / 2 + 0.04, 0.7, 0);
        detailCurrentCar.add(trimLeft);
        
        const trimRight = new THREE.Mesh(trimGeometry, grilleMaterial);
        trimRight.position.set(-bodyWidth / 2 - 0.04, 0.7, 0);
        detailCurrentCar.add(trimRight);
    }
    
    detailCurrentCar.position.y = 0;
    detailScene.add(detailCurrentCar);
}

// Animation loop
function animateDetail() {
    detailAnimationId = requestAnimationFrame(animateDetail);
    
    if (detailCurrentCar) {
        detailCurrentCar.rotation.y += (detailTargetRotationY - detailCurrentCar.rotation.y) * 0.1;
        detailCurrentCar.rotation.x += (detailTargetRotationX - detailCurrentCar.rotation.x) * 0.1;
        
        if (!detailIsDragging) {
            detailCurrentCar.rotation.y += 0.002;
            detailCurrentCar.position.y = Math.sin(Date.now() * 0.001) * 0.05;
        }
    }
    
    detailRenderer.render(detailScene, detailCamera);
}

// Mouse Controls
function onDetailMouseDown(event) {
    detailIsDragging = true;
    detailPreviousMouseX = event.clientX;
    detailPreviousMouseY = event.clientY;
}

function onDetailMouseMove(event) {
    if (detailIsDragging && detailCurrentCar) {
        const deltaX = event.clientX - detailPreviousMouseX;
        const deltaY = event.clientY - detailPreviousMouseY;
        
        detailTargetRotationY += deltaX * 0.01;
        detailTargetRotationX += deltaY * 0.01;
        detailTargetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, detailTargetRotationX));
        
        detailPreviousMouseX = event.clientX;
        detailPreviousMouseY = event.clientY;
    }
}

function onDetailMouseUp() {
    detailIsDragging = false;
}

// Touch Controls
function onDetailTouchStart(event) {
    event.preventDefault();
    if (event.touches.length === 1) {
        detailPreviousMouseX = event.touches[0].clientX;
        detailPreviousMouseY = event.touches[0].clientY;
        detailIsDragging = true;
    }
}

function onDetailTouchMove(event) {
    event.preventDefault();
    if (detailIsDragging && event.touches.length === 1 && detailCurrentCar) {
        const deltaX = event.touches[0].clientX - detailPreviousMouseX;
        const deltaY = event.touches[0].clientY - detailPreviousMouseY;
        
        detailTargetRotationY += deltaX * 0.01;
        detailTargetRotationX += deltaY * 0.01;
        detailTargetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, detailTargetRotationX));
        
        detailPreviousMouseX = event.touches[0].clientX;
        detailPreviousMouseY = event.touches[0].clientY;
    }
}

function onDetailTouchEnd() {
    detailIsDragging = false;
}

// Zoom Control
function onDetailWheel(event) {
    event.preventDefault();
    const delta = event.deltaY * 0.01;
    detailCamera.position.z += delta;
    detailCamera.position.z = Math.max(8, Math.min(20, detailCamera.position.z));
}

// Set Camera View
function setDetailView(view) {
    const distance = 12;
    const height = 4;
    
    let newPosition;
    switch(view) {
        case 'front':
            newPosition = { x: 0, y: height, z: distance };
            break;
        case 'side':
            newPosition = { x: distance, y: height, z: 0 };
            break;
        case 'rear':
            newPosition = { x: 0, y: height, z: -distance };
            break;
        case 'top':
            newPosition = { x: 0, y: distance + 5, z: 5 };
            break;
        default:
            newPosition = { x: 8, y: height, z: 12 };
    }
    
    animateDetailCamera(newPosition);
}

function animateDetailCamera(targetPosition) {
    const startPosition = {
        x: detailCamera.position.x,
        y: detailCamera.position.y,
        z: detailCamera.position.z
    };
    
    let progress = 0;
    const duration = 1000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        const eased = 1 - Math.pow(1 - progress, 3);
        
        detailCamera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * eased;
        detailCamera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * eased;
        detailCamera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * eased;
        detailCamera.lookAt(0, 0, 0);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('carModal');
    if (event.target === modal) {
        closeCarModal();
    }
}

