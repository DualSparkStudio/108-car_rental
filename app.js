// Three.js Scene Setup
let scene, camera, renderer, currentCar, controls;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let isDragging = false;
let previousMouseX = 0, previousMouseY = 0;

// Car Database
const carDatabase = {
    sports: {
        name: 'Sports Coupe',
        price: 75000,
        rentPrice: 250,
        specs: {
            'Top Speed': '195 mph',
            'Acceleration': '0-60 in 3.2s',
            'Engine': '3.0L Twin-Turbo V6',
            'Horsepower': '450 hp',
            'Transmission': '8-Speed Automatic',
            'Drivetrain': 'AWD'
        },
        color: 0xe82127, // Red
        accentColor: 0xff4444,
        style: 'aggressive'
    },
    suv: {
        name: 'Luxury SUV',
        price: 95000,
        rentPrice: 320,
        specs: {
            'Top Speed': '155 mph',
            'Acceleration': '0-60 in 4.5s',
            'Engine': '4.0L V8 Biturbo',
            'Horsepower': '550 hp',
            'Transmission': '9-Speed Automatic',
            'Drivetrain': 'AWD'
        },
        color: 0x0a0a0a, // Matte Black
        accentColor: 0x444444,
        style: 'luxury'
    },
    sedan: {
        name: 'Executive Sedan',
        price: 65000,
        rentPrice: 200,
        specs: {
            'Top Speed': '175 mph',
            'Acceleration': '0-60 in 4.0s',
            'Engine': '3.5L V6 Hybrid',
            'Horsepower': '400 hp',
            'Transmission': '10-Speed Automatic',
            'Drivetrain': 'RWD'
        },
        color: 0x1e3a5f, // Deep Blue
        accentColor: 0x3498db,
        style: 'elegant'
    },
    electric: {
        name: 'Electric GT',
        price: 125000,
        rentPrice: 400,
        specs: {
            'Top Speed': '200 mph',
            'Acceleration': '0-60 in 2.1s',
            'Battery': '100 kWh',
            'Range': '396 miles',
            'Motors': 'Tri-Motor AWD',
            'Horsepower': '1020 hp'
        },
        color: 0xcccccc, // Silver/White
        accentColor: 0x00ff88, // Neon Green accents
        style: 'futuristic'
    }
};

let currentCarType = 'sports';

// Initialize Three.js
function init() {
    const canvas = document.getElementById('canvas3d');
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        45,
        canvas.parentElement.clientWidth / canvas.parentElement.clientHeight,
        0.1,
        1000
    );
    camera.position.set(8, 4, 12);
    camera.lookAt(0, 0, 0);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0x4488ff, 0.3);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);
    
    const rimLight = new THREE.DirectionalLight(0xff4444, 0.4);
    rimLight.position.set(0, 2, -10);
    scene.add(rimLight);
    
    // Spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 15, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.castShadow = true;
    scene.add(spotLight);
    
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
    scene.add(ground);
    
    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x1a1a1a);
    gridHelper.position.y = -0.99;
    scene.add(gridHelper);
    
    // Create initial car
    createCar(currentCarType);
    updateSpecs(currentCarType);
    
    // Event Listeners
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    
    window.addEventListener('resize', onWindowResize);
    
    // Car selection buttons
    document.querySelectorAll('.car-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.car-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const carType = this.dataset.car;
            switchCar(carType);
        });
    });
    
    // Animation loop
    animate();
}

// Create 3D Car Model
function createCar(type) {
    // Remove existing car
    if (currentCar) {
        scene.remove(currentCar);
    }
    
    currentCar = new THREE.Group();
    const carData = carDatabase[type];
    const carColor = carData.color;
    
    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: carColor,
        metalness: type === 'suv' ? 0.3 : 0.9, // Matte finish for SUV
        roughness: type === 'suv' ? 0.8 : 0.1,
        envMapIntensity: 1
    });
    
    const accentMaterial = new THREE.MeshStandardMaterial({
        color: carData.accentColor,
        metalness: 0.9,
        roughness: 0.1,
        emissive: type === 'electric' ? carData.accentColor : 0x000000,
        emissiveIntensity: type === 'electric' ? 0.3 : 0
    });
    
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: type === 'electric' ? 0x88ffcc : 0x88ccff,
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
    
    const rimMaterial = new THREE.MeshStandardMaterial({
        color: type === 'electric' ? carData.accentColor : (type === 'sports' ? 0xff0000 : 0xcccccc),
        metalness: 1,
        roughness: 0.1,
        emissive: type === 'electric' ? carData.accentColor : 0x000000,
        emissiveIntensity: type === 'electric' ? 0.2 : 0
    });
    
    // Car body dimensions based on type
    let bodyWidth = 1.8;
    let bodyHeight = type === 'suv' ? 1.6 : (type === 'sports' ? 0.9 : 1.2);
    let bodyLength = type === 'suv' ? 4.5 : 4;
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    currentCar.add(body);
    
    // Cabin/Roof
    const cabinWidth = bodyWidth - 0.2;
    const cabinHeight = type === 'sports' ? 0.6 : (type === 'suv' ? 1.2 : 0.9);
    const cabinLength = bodyLength * 0.6;
    const cabinGeometry = new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength);
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial);
    cabin.position.y = bodyHeight / 2 + cabinHeight / 2 + 0.5;
    cabin.position.z = type === 'sports' ? -0.3 : 0;
    cabin.castShadow = true;
    currentCar.add(cabin);
    
    // Windows
    const windowGeometry = new THREE.BoxGeometry(cabinWidth - 0.1, cabinHeight - 0.2, cabinLength - 0.2);
    const windows = new THREE.Mesh(windowGeometry, glassMaterial);
    windows.position.copy(cabin.position);
    currentCar.add(windows);
    
    // Hood (front)
    const hoodGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight * 0.7, bodyLength * 0.35);
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.position.y = 0.5;
    hood.position.z = bodyLength * 0.425;
    hood.castShadow = true;
    currentCar.add(hood);
    
    // Trunk (rear)
    const trunkGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight * 0.6, bodyLength * 0.25);
    const trunk = new THREE.Mesh(trunkGeometry, bodyMaterial);
    trunk.position.y = 0.5;
    trunk.position.z = -bodyLength * 0.45;
    trunk.castShadow = true;
    currentCar.add(trunk);
    
    // Wheels
    const wheelRadius = type === 'suv' ? 0.45 : 0.4;
    const wheelWidth = 0.3;
    const wheelGeometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 32);
    const rimGeometry = new THREE.CylinderGeometry(wheelRadius * 0.6, wheelRadius * 0.6, wheelWidth + 0.05, 6);
    
    const wheelPositions = [
        { x: bodyWidth / 2 + 0.15, z: bodyLength * 0.35 },   // Front right
        { x: -bodyWidth / 2 - 0.15, z: bodyLength * 0.35 },  // Front left
        { x: bodyWidth / 2 + 0.15, z: -bodyLength * 0.3 },   // Rear right
        { x: -bodyWidth / 2 - 0.15, z: -bodyLength * 0.3 }   // Rear left
    ];
    
    wheelPositions.forEach(pos => {
        // Tire
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos.x, 0, pos.z);
        wheel.castShadow = true;
        currentCar.add(wheel);
        
        // Rim
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(pos.x, 0, pos.z);
        currentCar.add(rim);
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
    currentCar.add(headlightLeft);
    
    const headlightRight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightRight.position.set(bodyWidth / 2 - 0.2, 0.6, bodyLength / 2 + 0.1);
    currentCar.add(headlightRight);
    
    // Taillights
    const taillightMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.3
    });
    
    const taillightLeft = new THREE.Mesh(headlightGeometry, taillightMaterial);
    taillightLeft.position.set(-bodyWidth / 2 + 0.2, 0.6, -bodyLength / 2 - 0.1);
    currentCar.add(taillightLeft);
    
    const taillightRight = new THREE.Mesh(headlightGeometry, taillightMaterial);
    taillightRight.position.set(bodyWidth / 2 - 0.2, 0.6, -bodyLength / 2 - 0.1);
    currentCar.add(taillightRight);
    
    // Spoiler for sports car
    if (type === 'sports') {
        const spoilerGeometry = new THREE.BoxGeometry(bodyWidth - 0.4, 0.1, 0.6);
        const spoiler = new THREE.Mesh(spoilerGeometry, accentMaterial);
        spoiler.position.set(0, 1.2, -bodyLength / 2 + 0.3);
        currentCar.add(spoiler);
        
        const spoilerSupport1 = new THREE.BoxGeometry(0.1, 0.3, 0.1);
        const support1 = new THREE.Mesh(spoilerSupport1, bodyMaterial);
        support1.position.set(-0.6, 1.05, -bodyLength / 2 + 0.3);
        currentCar.add(support1);
        
        const support2 = new THREE.Mesh(spoilerSupport1, bodyMaterial);
        support2.position.set(0.6, 1.05, -bodyLength / 2 + 0.3);
        currentCar.add(support2);
        
        // Racing stripes
        const stripeGeometry = new THREE.BoxGeometry(0.3, 0.01, bodyLength * 0.9);
        const stripe = new THREE.Mesh(stripeGeometry, accentMaterial);
        stripe.position.set(0, bodyHeight + 0.51, 0);
        currentCar.add(stripe);
    }
    
    // Chrome trim for SUV
    if (type === 'suv') {
        const trimGeometry = new THREE.BoxGeometry(bodyWidth + 0.05, 0.1, bodyLength);
        const trim = new THREE.Mesh(trimGeometry, rimMaterial);
        trim.position.set(0, 0.2, 0);
        currentCar.add(trim);
    }
    
    // Side accent for sedan
    if (type === 'sedan') {
        const sideAccentGeometry = new THREE.BoxGeometry(0.05, 0.2, bodyLength * 0.7);
        const sideAccent1 = new THREE.Mesh(sideAccentGeometry, accentMaterial);
        sideAccent1.position.set(bodyWidth / 2 + 0.05, 0.6, 0);
        currentCar.add(sideAccent1);
        
        const sideAccent2 = new THREE.Mesh(sideAccentGeometry, accentMaterial);
        sideAccent2.position.set(-bodyWidth / 2 - 0.05, 0.6, 0);
        currentCar.add(sideAccent2);
    }
    
    // Underglow for electric car
    if (type === 'electric') {
        const underglowGeometry = new THREE.BoxGeometry(bodyWidth - 0.2, 0.05, bodyLength - 0.5);
        const underglowMaterial = new THREE.MeshStandardMaterial({
            color: carData.accentColor,
            emissive: carData.accentColor,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.8
        });
        const underglow = new THREE.Mesh(underglowGeometry, underglowMaterial);
        underglow.position.set(0, -0.3, 0);
        currentCar.add(underglow);
    }
    
    currentCar.position.y = 0;
    scene.add(currentCar);
}

// Switch between cars with animation
function switchCar(type) {
    currentCarType = type;
    
    // Animate out
    const outAnimation = setInterval(() => {
        if (currentCar) {
            currentCar.position.y -= 0.2;
            currentCar.rotation.y += 0.1;
            if (currentCar.position.y < -5) {
                clearInterval(outAnimation);
                createCar(type);
                updateSpecs(type);
                
                // Animate in
                currentCar.position.y = -5;
                const inAnimation = setInterval(() => {
                    currentCar.position.y += 0.2;
                    if (currentCar.position.y >= 0) {
                        currentCar.position.y = 0;
                        clearInterval(inAnimation);
                    }
                }, 16);
            }
        }
    }, 16);
}

// Update specifications
function updateSpecs(type) {
    const carData = carDatabase[type];
    const specsGrid = document.getElementById('specs-grid');
    specsGrid.innerHTML = '';
    
    Object.entries(carData.specs).forEach(([label, value]) => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <div class="spec-label">${label}</div>
            <div class="spec-value">${value}</div>
        `;
        specsGrid.appendChild(specItem);
    });
    
    // Update prices
    document.getElementById('buy-price').textContent = `$${carData.price.toLocaleString()}`;
    document.getElementById('rent-price').textContent = `$${carData.rentPrice}/day`;
}

// Mouse Controls
function onMouseDown(event) {
    isDragging = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
}

function onMouseMove(event) {
    if (isDragging && currentCar) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;
        
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        targetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, targetRotationX));
        
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
}

function onMouseUp() {
    isDragging = false;
}

// Touch Controls
function onTouchStart(event) {
    event.preventDefault();
    if (event.touches.length === 1) {
        previousMouseX = event.touches[0].clientX;
        previousMouseY = event.touches[0].clientY;
        isDragging = true;
    }
}

function onTouchMove(event) {
    event.preventDefault();
    if (isDragging && event.touches.length === 1 && currentCar) {
        const deltaX = event.touches[0].clientX - previousMouseX;
        const deltaY = event.touches[0].clientY - previousMouseY;
        
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        targetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, targetRotationX));
        
        previousMouseX = event.touches[0].clientX;
        previousMouseY = event.touches[0].clientY;
    }
}

function onTouchEnd() {
    isDragging = false;
}

// Zoom Control
function onWheel(event) {
    event.preventDefault();
    const delta = event.deltaY * 0.01;
    camera.position.z += delta;
    camera.position.z = Math.max(8, Math.min(20, camera.position.z));
}

// Set Camera View
function setView(view) {
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
    
    // Smooth camera transition
    animateCamera(newPosition);
}

function animateCamera(targetPosition) {
    const startPosition = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };
    
    let progress = 0;
    const duration = 1000; // ms
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        
        camera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * eased;
        camera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * eased;
        camera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * eased;
        camera.lookAt(0, 0, 0);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Window Resize
function onWindowResize() {
    const canvas = document.getElementById('canvas3d');
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    if (currentCar) {
        // Smooth rotation
        currentCar.rotation.y += (targetRotationY - currentCar.rotation.y) * 0.1;
        currentCar.rotation.x += (targetRotationX - currentCar.rotation.x) * 0.1;
        
        // Idle animation
        if (!isDragging) {
            currentCar.rotation.y += 0.002;
            currentCar.position.y = Math.sin(Date.now() * 0.001) * 0.05;
        }
    }
    
    renderer.render(scene, camera);
}

// Modal Functions
function openModal(type) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const carData = carDatabase[currentCarType];
    
    if (type === 'buy') {
        title.textContent = `Buy ${carData.name} - $${carData.price.toLocaleString()}`;
    } else {
        title.textContent = `Rent ${carData.name} - $${carData.rentPrice}/day`;
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Form Submission
document.getElementById('inquiry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! Our team will contact you shortly.');
    closeModal();
    this.reset();
});

// Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);

