// Admin credentials (in production, this should be server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Three.js variables for 3D viewer
let viewerScene, viewerCamera, viewerRenderer, viewerCurrentCar;
let viewerIsDragging = false;
let viewerPreviousMouseX = 0, viewerPreviousMouseY = 0;
let viewerTargetRotationX = 0, viewerTargetRotationY = 0;
let viewerAnimationId = null;

// Car visual configurations
const carVisualConfig = {
    sports: { 
        color: 0xe82127, 
        accentColor: 0xff4444, 
        bodyHeight: 0.7,
        bodyLength: 3.8,
        bodyWidth: 2.0
    },
    suv: { 
        color: 0x0a0a0a, 
        accentColor: 0x444444, 
        bodyHeight: 1.8,
        bodyLength: 5.0,
        bodyWidth: 2.0
    },
    sedan: { 
        color: 0x1e3a5f, 
        accentColor: 0x3498db, 
        bodyHeight: 1.2,
        bodyLength: 4.2,
        bodyWidth: 1.8
    },
    electric: { 
        color: 0xcccccc, 
        accentColor: 0x00ff88, 
        bodyHeight: 1.0,
        bodyLength: 4.3,
        bodyWidth: 1.9
    },
    luxury: { 
        color: 0x1a1a2e, 
        accentColor: 0xc7a26a, 
        bodyHeight: 1.3,
        bodyLength: 4.8,
        bodyWidth: 1.8
    }
};

// Default car models
const defaultModels = [
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
        description: 'An aggressive sports coupe designed for track performance and daily driving.',
        isDefault: true
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
        description: 'Luxury SUV combining comfort, space, and power for the modern family.',
        isDefault: true
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
        description: 'Executive sedan perfect for business professionals seeking elegance.',
        isDefault: true
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
        description: 'Cutting-edge electric supercar with unmatched performance and range.',
        isDefault: true
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
        description: 'Pure driving excitement with razor-sharp handling and explosive power.',
        isDefault: true
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
        description: 'Premium SUV with off-road capability and luxurious interior appointments.',
        isDefault: true
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
        description: 'The pinnacle of luxury with handcrafted details and supreme comfort.',
        isDefault: true
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
        description: 'Electric performance sedan with instant torque and smart technology.',
        isDefault: true
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
        description: 'Track-focused supercar with aerodynamic perfection and race technology.',
        isDefault: true
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
        description: 'Extended wheelbase luxury sedan with executive rear seating package.',
        isDefault: true
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
        description: 'Efficient and stylish sedan perfect for urban commuters.',
        isDefault: true
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
        description: 'Family-friendly SUV with three rows and advanced safety features.',
        isDefault: true
    }
];

let currentEditId = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setupEventListeners();
});

// Check authentication
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    if (isLoggedIn) {
        showAdminPanel();
    } else {
        showLoginSection();
    }
}

// Show/Hide sections
function showLoginSection() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block';
    loadModels();
    updateStatistics();
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Model form
    document.getElementById('modelForm').addEventListener('submit', handleModelSubmit);
    
    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', filterModels);
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        errorDiv.textContent = '';
    } else {
        errorDiv.textContent = 'Invalid username or password';
    }
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    sessionStorage.removeItem('adminLoggedIn');
    showLoginSection();
    document.getElementById('loginForm').reset();
}

// Get all models (default + custom, excluding deleted defaults)
function getAllModels() {
    const customModels = JSON.parse(localStorage.getItem('customModels') || '[]');
    const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults') || '[]');
    const editedDefaults = JSON.parse(localStorage.getItem('editedDefaults') || '[]');
    
    // Filter out deleted defaults and replace with edited versions
    const activeDefaults = defaultModels
        .filter(model => !deletedDefaults.includes(model.id))
        .map(model => {
            const edited = editedDefaults.find(e => e.id === model.id);
            return edited || model;
        });
    
    return [...activeDefaults, ...customModels];
}

// Get only custom models
function getCustomModels() {
    return JSON.parse(localStorage.getItem('customModels') || '[]');
}

// Save custom models
function saveCustomModels(models) {
    localStorage.setItem('customModels', JSON.stringify(models));
}

// Load and display models
function loadModels(filter = 'all') {
    const models = getAllModels();
    const filteredModels = filter === 'all' ? models : models.filter(m => m.category === filter);
    const tbody = document.getElementById('modelsTableBody');
    
    tbody.innerHTML = '';
    
    filteredModels.forEach(model => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${model.id}</td>
            <td>${model.name}</td>
            <td><span class="category-badge ${model.category}">${model.category.toUpperCase()}</span></td>
            <td>$${model.price.toLocaleString()}</td>
            <td>$${model.rentPrice}/day</td>
            <td><span class="type-badge ${model.isDefault ? 'default' : 'custom'}">${model.isDefault ? 'Default' : 'Custom'}</span></td>
            <td class="action-buttons"></td>
        `;
        
        // Add action buttons for all models
        const actionsCell = row.querySelector('.action-buttons');
        
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn-view';
        viewBtn.textContent = 'View';
        viewBtn.onclick = () => viewModel(model.id);
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editModel(model.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteModel(model.id);
        
        actionsCell.appendChild(viewBtn);
        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
        
        tbody.appendChild(row);
    });
}

// Filter models
function filterModels() {
    const filter = document.getElementById('categoryFilter').value;
    loadModels(filter);
}

// Update statistics
function updateStatistics() {
    const allModels = getAllModels();
    const customModels = getCustomModels();
    
    document.getElementById('totalModels').textContent = allModels.length;
    document.getElementById('customModels').textContent = customModels.length;
}

// Open add model form
function openAddModelForm() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add New Model';
    document.getElementById('modelForm').reset();
    document.getElementById('modelId').value = '';
    document.getElementById('modelFormModal').style.display = 'block';
}

// Close model form
function closeModelForm() {
    document.getElementById('modelFormModal').style.display = 'none';
    document.getElementById('modelForm').reset();
    currentEditId = null;
}

// Edit model
function editModel(id) {
    const allModels = getAllModels();
    const model = allModels.find(m => m.id === id);
    
    if (!model) {
        alert('Model not found');
        return;
    }
    
    currentEditId = id;
    document.getElementById('modalTitle').textContent = 'Edit Model';
    document.getElementById('modelId').value = id;
    document.getElementById('modelName').value = model.name;
    document.getElementById('modelCategory').value = model.category;
    document.getElementById('modelPrice').value = model.price;
    document.getElementById('modelRentPrice').value = model.rentPrice;
    document.getElementById('modelImage').value = model.image;
    document.getElementById('modelDescription').value = model.description;
    
    // Fill specs
    document.getElementById('specTopSpeed').value = model.specs.topSpeed || '';
    document.getElementById('specAcceleration').value = model.specs.acceleration || '';
    document.getElementById('specEngine').value = model.specs.engine || model.specs.battery || '';
    document.getElementById('specHorsepower').value = model.specs.horsepower || '';
    document.getElementById('specTransmission').value = model.specs.transmission || model.specs.motors || '';
    document.getElementById('specDrivetrain').value = model.specs.drivetrain || model.specs.range || '';
    
    document.getElementById('modelFormModal').style.display = 'block';
}

// Delete model
function deleteModel(id) {
    if (!confirm('Are you sure you want to delete this model?')) {
        return;
    }
    
    const allModels = getAllModels();
    const model = allModels.find(m => m.id === id);
    
    if (!model) {
        alert('Model not found');
        return;
    }
    
    // Store deleted default models IDs
    let deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults') || '[]');
    
    if (model.isDefault) {
        // Mark default model as deleted
        deletedDefaults.push(id);
        localStorage.setItem('deletedDefaults', JSON.stringify(deletedDefaults));
    } else {
        // Remove from custom models
        let customModels = getCustomModels();
        customModels = customModels.filter(m => m.id !== id);
        saveCustomModels(customModels);
    }
    
    loadModels();
    updateStatistics();
    
    alert('Model deleted successfully!');
}

// Handle model form submit
function handleModelSubmit(e) {
    e.preventDefault();
    
    const allModels = getAllModels();
    
    // Get form values
    const modelData = {
        id: currentEditId || (allModels.length > 0 ? Math.max(...allModels.map(m => m.id)) + 1 : 1),
        name: document.getElementById('modelName').value,
        category: document.getElementById('modelCategory').value,
        price: parseInt(document.getElementById('modelPrice').value),
        rentPrice: parseInt(document.getElementById('modelRentPrice').value),
        image: document.getElementById('modelImage').value,
        description: document.getElementById('modelDescription').value,
        specs: {
            topSpeed: document.getElementById('specTopSpeed').value,
            acceleration: document.getElementById('specAcceleration').value,
            engine: document.getElementById('specEngine').value,
            horsepower: document.getElementById('specHorsepower').value,
            transmission: document.getElementById('specTransmission').value,
            drivetrain: document.getElementById('specDrivetrain').value
        },
        isDefault: false
    };
    
    if (currentEditId) {
        // Check if editing a default model
        const originalModel = defaultModels.find(m => m.id === currentEditId);
        
        if (originalModel) {
            // Editing a default model - store in editedDefaults
            modelData.isDefault = true; // Keep the flag
            let editedDefaults = JSON.parse(localStorage.getItem('editedDefaults') || '[]');
            const editIndex = editedDefaults.findIndex(m => m.id === currentEditId);
            
            if (editIndex >= 0) {
                editedDefaults[editIndex] = modelData;
            } else {
                editedDefaults.push(modelData);
            }
            
            localStorage.setItem('editedDefaults', JSON.stringify(editedDefaults));
        } else {
            // Editing a custom model
            let customModels = getCustomModels();
            const customIndex = customModels.findIndex(m => m.id === currentEditId);
            customModels[customIndex] = modelData;
            saveCustomModels(customModels);
        }
    } else {
        // Add new custom model
        let customModels = getCustomModels();
        customModels.push(modelData);
        saveCustomModels(customModels);
    }
    
    closeModelForm();
    loadModels();
    updateStatistics();
    
    alert(currentEditId ? 'Model updated successfully!' : 'Model added successfully!');
}

// View model in 3D
function viewModel(id) {
    const allModels = getAllModels();
    const model = allModels.find(m => m.id === id);
    
    if (!model) {
        alert('Model not found');
        return;
    }
    
    // Update viewer information
    document.getElementById('viewerBadge').textContent = model.category.toUpperCase();
    document.getElementById('viewerTitle').textContent = model.name;
    document.getElementById('viewerDescription').textContent = model.description;
    
    // Update specifications
    const specsGrid = document.getElementById('viewerSpecsGrid');
    specsGrid.innerHTML = '';
    Object.entries(model.specs).forEach(([label, value]) => {
        if (value) {
            const specItem = document.createElement('div');
            specItem.className = 'viewer-spec-item';
            specItem.innerHTML = `
                <div class="viewer-spec-label">${label.charAt(0).toUpperCase() + label.slice(1).replace(/([A-Z])/g, ' $1')}</div>
                <div class="viewer-spec-value">${value}</div>
            `;
            specsGrid.appendChild(specItem);
        }
    });
    
    // Show viewer section
    document.getElementById('viewerSection').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize 3D viewer
    setTimeout(() => {
        init3DViewer(model);
    }, 100);
}

// Close viewer
function closeViewer() {
    // Stop animation loop
    if (viewerAnimationId) {
        cancelAnimationFrame(viewerAnimationId);
        viewerAnimationId = null;
    }
    
    // Clean up Three.js
    if (viewerRenderer) {
        viewerRenderer.dispose();
        viewerRenderer = null;
    }
    if (viewerScene) {
        viewerScene = null;
    }
    
    // Reset rotation values
    viewerTargetRotationX = 0;
    viewerTargetRotationY = 0;
    
    // Hide viewer section
    document.getElementById('viewerSection').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize 3D Viewer
function init3DViewer(model) {
    const canvas = document.getElementById('viewerCanvas3d');
    if (!canvas) return;
    
    // Clean up existing scene
    if (viewerRenderer) {
        viewerRenderer.dispose();
    }
    if (viewerAnimationId) {
        cancelAnimationFrame(viewerAnimationId);
    }
    
    // Scene
    viewerScene = new THREE.Scene();
    viewerScene.background = new THREE.Color(0x0a0a0a);
    viewerScene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    
    // Camera
    viewerCamera = new THREE.PerspectiveCamera(
        45,
        canvas.parentElement.clientWidth / canvas.parentElement.clientHeight,
        0.1,
        1000
    );
    viewerCamera.position.set(8, 4, 12);
    viewerCamera.lookAt(0, 0, 0);
    
    // Renderer
    viewerRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    viewerRenderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
    viewerRenderer.setPixelRatio(window.devicePixelRatio);
    viewerRenderer.shadowMap.enabled = true;
    viewerRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    viewerScene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 5);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 2048;
    directionalLight1.shadow.mapSize.height = 2048;
    viewerScene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0x4488ff, 0.3);
    directionalLight2.position.set(-5, 5, -5);
    viewerScene.add(directionalLight2);
    
    const rimLight = new THREE.DirectionalLight(0xff4444, 0.4);
    rimLight.position.set(0, 2, -10);
    viewerScene.add(rimLight);
    
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 15, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.castShadow = true;
    viewerScene.add(spotLight);
    
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
    viewerScene.add(ground);
    
    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x1a1a1a);
    gridHelper.position.y = -0.99;
    viewerScene.add(gridHelper);
    
    // Create car
    create3DViewerCar(model.category);
    
    // Event Listeners
    canvas.addEventListener('mousedown', onViewerMouseDown);
    canvas.addEventListener('mousemove', onViewerMouseMove);
    canvas.addEventListener('mouseup', onViewerMouseUp);
    canvas.addEventListener('wheel', onViewerWheel);
    canvas.addEventListener('touchstart', onViewerTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onViewerTouchMove, { passive: false });
    canvas.addEventListener('touchend', onViewerTouchEnd);
    
    // Start animation
    animateViewer();
}

// Create 3D Car Model for Viewer
function create3DViewerCar(category) {
    if (viewerCurrentCar) {
        viewerScene.remove(viewerCurrentCar);
    }
    
    viewerCurrentCar = new THREE.Group();
    const config = carVisualConfig[category] || carVisualConfig.sedan;
    const carColor = config.color;
    
    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: carColor,
        metalness: category === 'suv' ? 0.3 : 0.9,
        roughness: category === 'suv' ? 0.8 : 0.1,
        envMapIntensity: 1
    });
    
    const accentMaterial = new THREE.MeshStandardMaterial({
        color: config.accentColor,
        metalness: 0.9,
        roughness: 0.1,
        emissive: category === 'electric' ? config.accentColor : 0x000000,
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
    
    const rimMaterial = new THREE.MeshStandardMaterial({
        color: category === 'electric' ? config.accentColor : (category === 'sports' ? 0xff0000 : 0xcccccc),
        metalness: 1,
        roughness: 0.1,
        emissive: category === 'electric' ? config.accentColor : 0x000000,
        emissiveIntensity: category === 'electric' ? 0.2 : 0
    });
    
    // Car body dimensions
    const bodyWidth = config.bodyWidth;
    const bodyHeight = config.bodyHeight;
    const bodyLength = config.bodyLength;
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    viewerCurrentCar.add(body);
    
    // Cabin/Roof
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
    viewerCurrentCar.add(cabin);
    
    // Windows
    const windowGeometry = new THREE.BoxGeometry(cabinWidth - 0.1, cabinHeight - 0.2, cabinLength - 0.2);
    const windows = new THREE.Mesh(windowGeometry, glassMaterial);
    windows.position.copy(cabin.position);
    viewerCurrentCar.add(windows);
    
    // Hood
    const hoodGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight * 0.7, bodyLength * 0.35);
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.position.y = 0.5;
    hood.position.z = bodyLength * 0.425;
    hood.castShadow = true;
    viewerCurrentCar.add(hood);
    
    // Trunk
    const trunkGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight * 0.6, bodyLength * 0.25);
    const trunk = new THREE.Mesh(trunkGeometry, bodyMaterial);
    trunk.position.y = 0.5;
    trunk.position.z = -bodyLength * 0.45;
    trunk.castShadow = true;
    viewerCurrentCar.add(trunk);
    
    // Wheels
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
        viewerCurrentCar.add(wheel);
        
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(pos.x, 0, pos.z);
        viewerCurrentCar.add(rim);
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
    viewerCurrentCar.add(headlightLeft);
    
    const headlightRight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightRight.position.set(bodyWidth / 2 - 0.2, 0.6, bodyLength / 2 + 0.1);
    viewerCurrentCar.add(headlightRight);
    
    // Taillights
    const taillightMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.3
    });
    
    const taillightLeft = new THREE.Mesh(headlightGeometry, taillightMaterial);
    taillightLeft.position.set(-bodyWidth / 2 + 0.2, 0.6, -bodyLength / 2 - 0.1);
    viewerCurrentCar.add(taillightLeft);
    
    const taillightRight = new THREE.Mesh(headlightGeometry, taillightMaterial);
    taillightRight.position.set(bodyWidth / 2 - 0.2, 0.6, -bodyLength / 2 - 0.1);
    viewerCurrentCar.add(taillightRight);
    
    // Category-specific features
    if (category === 'sports') {
        // Large rear spoiler
        const spoilerGeometry = new THREE.BoxGeometry(bodyWidth - 0.2, 0.15, 0.8);
        const spoiler = new THREE.Mesh(spoilerGeometry, accentMaterial);
        spoiler.position.set(0, 1.0, -bodyLength / 2 + 0.4);
        viewerCurrentCar.add(spoiler);
        
        const spoilerSupport1 = new THREE.BoxGeometry(0.12, 0.4, 0.12);
        const support1 = new THREE.Mesh(spoilerSupport1, bodyMaterial);
        support1.position.set(-0.7, 0.8, -bodyLength / 2 + 0.4);
        viewerCurrentCar.add(support1);
        
        const support2 = new THREE.Mesh(spoilerSupport1, bodyMaterial);
        support2.position.set(0.7, 0.8, -bodyLength / 2 + 0.4);
        viewerCurrentCar.add(support2);
        
        // Racing stripes
        const stripeGeometry = new THREE.BoxGeometry(0.4, 0.02, bodyLength * 0.9);
        const stripe = new THREE.Mesh(stripeGeometry, accentMaterial);
        stripe.position.set(0, bodyHeight + 0.51, 0);
        viewerCurrentCar.add(stripe);
        
        // Front air intakes
        const intakeGeometry = new THREE.BoxGeometry(0.6, 0.25, 0.1);
        const intakeLeft = new THREE.Mesh(intakeGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
        intakeLeft.position.set(-0.5, 0.4, bodyLength / 2 + 0.05);
        viewerCurrentCar.add(intakeLeft);
        
        const intakeRight = new THREE.Mesh(intakeGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
        intakeRight.position.set(0.5, 0.4, bodyLength / 2 + 0.05);
        viewerCurrentCar.add(intakeRight);
    }
    
    if (category === 'suv') {
        // Chrome trim
        const trimGeometry = new THREE.BoxGeometry(bodyWidth + 0.08, 0.12, bodyLength);
        const trim = new THREE.Mesh(trimGeometry, rimMaterial);
        trim.position.set(0, 0.25, 0);
        viewerCurrentCar.add(trim);
        
        // Roof rack
        const rackGeometry = new THREE.BoxGeometry(bodyWidth - 0.4, 0.08, bodyLength * 0.6);
        const rack = new THREE.Mesh(rackGeometry, new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.3
        }));
        rack.position.set(0, bodyHeight / 2 + cabinHeight + 0.54, 0);
        viewerCurrentCar.add(rack);
        
        // Side steps
        const stepGeometry = new THREE.BoxGeometry(0.15, 0.05, bodyLength * 0.7);
        const stepLeft = new THREE.Mesh(stepGeometry, rimMaterial);
        stepLeft.position.set(bodyWidth / 2 + 0.1, -0.15, 0);
        viewerCurrentCar.add(stepLeft);
        
        const stepRight = new THREE.Mesh(stepGeometry, rimMaterial);
        stepRight.position.set(-bodyWidth / 2 - 0.1, -0.15, 0);
        viewerCurrentCar.add(stepRight);
    }
    
    if (category === 'sedan') {
        // Chrome side accent lines
        const sideAccentGeometry = new THREE.BoxGeometry(0.06, 0.15, bodyLength * 0.75);
        const sideAccent1 = new THREE.Mesh(sideAccentGeometry, accentMaterial);
        sideAccent1.position.set(bodyWidth / 2 + 0.05, 0.65, 0);
        viewerCurrentCar.add(sideAccent1);
        
        const sideAccent2 = new THREE.Mesh(sideAccentGeometry, accentMaterial);
        sideAccent2.position.set(-bodyWidth / 2 - 0.05, 0.65, 0);
        viewerCurrentCar.add(sideAccent2);
        
        // Chrome grille
        const grilleGeometry = new THREE.BoxGeometry(bodyWidth * 0.7, 0.3, 0.08);
        const grille = new THREE.Mesh(grilleGeometry, accentMaterial);
        grille.position.set(0, 0.5, bodyLength / 2 + 0.04);
        viewerCurrentCar.add(grille);
    }
    
    if (category === 'electric') {
        // Bright underglow
        const underglowGeometry = new THREE.BoxGeometry(bodyWidth - 0.15, 0.08, bodyLength - 0.4);
        const underglowMaterial = new THREE.MeshStandardMaterial({
            color: config.accentColor,
            emissive: config.accentColor,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.9
        });
        const underglow = new THREE.Mesh(underglowGeometry, underglowMaterial);
        underglow.position.set(0, -0.25, 0);
        viewerCurrentCar.add(underglow);
        
        // Futuristic front diffuser
        const diffuserGeometry = new THREE.BoxGeometry(bodyWidth * 0.8, 0.15, 0.25);
        const diffuser = new THREE.Mesh(diffuserGeometry, accentMaterial);
        diffuser.position.set(0, 0.2, bodyLength / 2 + 0.1);
        viewerCurrentCar.add(diffuser);
        
        // Aerodynamic side blades
        const bladeGeometry = new THREE.BoxGeometry(0.08, 0.3, 1.0);
        const bladeLeft = new THREE.Mesh(bladeGeometry, accentMaterial);
        bladeLeft.position.set(bodyWidth / 2 + 0.04, 0.5, bodyLength * 0.15);
        viewerCurrentCar.add(bladeLeft);
        
        const bladeRight = new THREE.Mesh(bladeGeometry, accentMaterial);
        bladeRight.position.set(-bodyWidth / 2 - 0.04, 0.5, bodyLength * 0.15);
        viewerCurrentCar.add(bladeRight);
    }
    
    if (category === 'luxury') {
        // Chrome grille
        const grilleGeometry = new THREE.BoxGeometry(bodyWidth * 0.8, 0.4, 0.1);
        const grilleMaterial = new THREE.MeshStandardMaterial({
            color: config.accentColor,
            metalness: 1,
            roughness: 0.1
        });
        const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
        grille.position.set(0, 0.6, bodyLength / 2 + 0.05);
        viewerCurrentCar.add(grille);
        
        // Side chrome trim
        const trimGeometry = new THREE.BoxGeometry(0.08, 0.15, bodyLength * 0.8);
        const trimLeft = new THREE.Mesh(trimGeometry, grilleMaterial);
        trimLeft.position.set(bodyWidth / 2 + 0.04, 0.7, 0);
        viewerCurrentCar.add(trimLeft);
        
        const trimRight = new THREE.Mesh(trimGeometry, grilleMaterial);
        trimRight.position.set(-bodyWidth / 2 - 0.04, 0.7, 0);
        viewerCurrentCar.add(trimRight);
    }
    
    viewerCurrentCar.position.y = 0;
    viewerScene.add(viewerCurrentCar);
}

// Animation loop
function animateViewer() {
    viewerAnimationId = requestAnimationFrame(animateViewer);
    
    if (viewerCurrentCar) {
        viewerCurrentCar.rotation.y += (viewerTargetRotationY - viewerCurrentCar.rotation.y) * 0.1;
        viewerCurrentCar.rotation.x += (viewerTargetRotationX - viewerCurrentCar.rotation.x) * 0.1;
        
        if (!viewerIsDragging) {
            viewerCurrentCar.rotation.y += 0.002;
            viewerCurrentCar.position.y = Math.sin(Date.now() * 0.001) * 0.05;
        }
    }
    
    viewerRenderer.render(viewerScene, viewerCamera);
}

// Mouse Controls
function onViewerMouseDown(event) {
    viewerIsDragging = true;
    viewerPreviousMouseX = event.clientX;
    viewerPreviousMouseY = event.clientY;
}

function onViewerMouseMove(event) {
    if (viewerIsDragging && viewerCurrentCar) {
        const deltaX = event.clientX - viewerPreviousMouseX;
        const deltaY = event.clientY - viewerPreviousMouseY;
        
        viewerTargetRotationY += deltaX * 0.01;
        viewerTargetRotationX += deltaY * 0.01;
        viewerTargetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, viewerTargetRotationX));
        
        viewerPreviousMouseX = event.clientX;
        viewerPreviousMouseY = event.clientY;
    }
}

function onViewerMouseUp() {
    viewerIsDragging = false;
}

// Touch Controls
function onViewerTouchStart(event) {
    event.preventDefault();
    if (event.touches.length === 1) {
        viewerPreviousMouseX = event.touches[0].clientX;
        viewerPreviousMouseY = event.touches[0].clientY;
        viewerIsDragging = true;
    }
}

function onViewerTouchMove(event) {
    event.preventDefault();
    if (viewerIsDragging && event.touches.length === 1 && viewerCurrentCar) {
        const deltaX = event.touches[0].clientX - viewerPreviousMouseX;
        const deltaY = event.touches[0].clientY - viewerPreviousMouseY;
        
        viewerTargetRotationY += deltaX * 0.01;
        viewerTargetRotationX += deltaY * 0.01;
        viewerTargetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, viewerTargetRotationX));
        
        viewerPreviousMouseX = event.touches[0].clientX;
        viewerPreviousMouseY = event.touches[0].clientY;
    }
}

function onViewerTouchEnd() {
    viewerIsDragging = false;
}

// Zoom Control
function onViewerWheel(event) {
    event.preventDefault();
    const delta = event.deltaY * 0.01;
    viewerCamera.position.z += delta;
    viewerCamera.position.z = Math.max(8, Math.min(20, viewerCamera.position.z));
}

// Set Camera View
function setViewerView(view) {
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
    
    animateViewerCamera(newPosition);
}

function animateViewerCamera(targetPosition) {
    const startPosition = {
        x: viewerCamera.position.x,
        y: viewerCamera.position.y,
        z: viewerCamera.position.z
    };
    
    let progress = 0;
    const duration = 1000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        const eased = 1 - Math.pow(1 - progress, 3);
        
        viewerCamera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * eased;
        viewerCamera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * eased;
        viewerCamera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * eased;
        viewerCamera.lookAt(0, 0, 0);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modelFormModal');
    if (event.target === modal) {
        closeModelForm();
    }
}

