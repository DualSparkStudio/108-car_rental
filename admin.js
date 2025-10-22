// Admin credentials (in production, this should be server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
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
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editModel(model.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteModel(model.id);
        
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

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modelFormModal');
    if (event.target === modal) {
        closeModelForm();
    }
}

