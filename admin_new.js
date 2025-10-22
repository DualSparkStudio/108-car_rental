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
            engine: '5.2L V10',
            horsepower: '640 hp',
            transmission: '7-Speed DCT',
            drivetrain: 'AWD'
        },
        description: 'Track-focused hypercar delivering an adrenaline-pumping experience.',
        isDefault: true
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
        description: 'Efficient city sedan with modern technology and fuel economy.',
        isDefault: true
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
        description: 'Rugged SUV built for adventure with impressive towing capacity.',
        isDefault: true
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
        description: 'Ultimate luxury sedan with cutting-edge technology and refinement.',
        isDefault: true
    }
];

// Get all models (default + custom)
function getAllModels() {
    const customModels = JSON.parse(localStorage.getItem('customModels')) || [];
    const editedDefaults = JSON.parse(localStorage.getItem('editedDefaults')) || {};
    const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults')) || [];
    
    // Merge default models with edited versions
    const mergedDefaults = defaultModels
        .filter(model => !deletedDefaults.includes(model.id))
        .map(model => {
            if (editedDefaults[model.id]) {
                return { ...model, ...editedDefaults[model.id], isDefault: true };
            }
            return model;
        });
    
    return [...mergedDefaults, ...customModels];
}

// Login handling
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        displayModels();
        updateStats();
    } else {
        errorDiv.textContent = 'Invalid credentials. Please try again.';
        errorDiv.style.display = 'block';
    }
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('adminLoggedIn');
    location.reload();
});

// Check if already logged in
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block';
    displayModels();
    updateStats();
}

// Display models in table
function displayModels(filter = 'all') {
    const allModels = getAllModels();
    const filteredModels = filter === 'all' ? allModels : allModels.filter(m => m.category === filter);
    
    const tbody = document.getElementById('modelsTableBody');
    tbody.innerHTML = '';
    
    filteredModels.forEach(model => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${model.id}</td>
            <td>${model.name}</td>
            <td><span class="category-badge category-${model.category}">${model.category}</span></td>
            <td>$${model.price.toLocaleString()}</td>
            <td>$${model.rentPrice}</td>
            <td>${model.isDefault ? 'Default' : 'Custom'}</td>
            <td class="action-buttons"></td>
        `;
        
        // Create action buttons
        const actionCell = row.querySelector('.action-buttons');
        
        // View button
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn-view';
        viewBtn.textContent = 'View';
        viewBtn.onclick = () => viewModel(model.id);
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editModel(model.id);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteModel(model.id);
        
        actionCell.appendChild(viewBtn);
        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
        
        tbody.appendChild(row);
    });
}

// View model in image viewer
function viewModel(id) {
    const allModels = getAllModels();
    const model = allModels.find(m => m.id === id);
    
    if (!model) return;
    
    // Show viewer section
    document.getElementById('viewerSection').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    
    // Populate viewer with model details
    document.getElementById('viewerBadge').textContent = model.category.toUpperCase();
    document.getElementById('viewerTitle').textContent = model.name;
    document.getElementById('viewerDescription').textContent = model.description;
    document.getElementById('viewerCarImage').src = model.image;
    document.getElementById('viewerCarImage').alt = model.name;
    
    // Populate specs
    const specsGrid = document.getElementById('viewerSpecsGrid');
    specsGrid.innerHTML = '';
    Object.entries(model.specs).forEach(([key, value]) => {
        const specItem = document.createElement('div');
        specItem.className = 'viewer-spec-item';
        specItem.innerHTML = `
            <div class="viewer-spec-label">${key}</div>
            <div class="viewer-spec-value">${value}</div>
        `;
        specsGrid.appendChild(specItem);
    });
}

// Close viewer
function closeViewer() {
    document.getElementById('viewerSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
}

// Open add model form
function openAddModelForm() {
    document.getElementById('modalTitle').textContent = 'Add New Model';
    document.getElementById('modelForm').reset();
    document.getElementById('modelId').value = '';
    document.getElementById('modelFormModal').style.display = 'flex';
}

// Close model form
function closeModelForm() {
    document.getElementById('modelFormModal').style.display = 'none';
}

// Edit model
function editModel(id) {
    const allModels = getAllModels();
    const model = allModels.find(m => m.id === id);
    
    if (!model) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Model';
    document.getElementById('modelId').value = model.id;
    document.getElementById('modelName').value = model.name;
    document.getElementById('modelCategory').value = model.category;
    document.getElementById('modelPrice').value = model.price;
    document.getElementById('modelRentPrice').value = model.rentPrice;
    document.getElementById('modelImage').value = model.image;
    document.getElementById('modelDescription').value = model.description;
    
    // Populate specs
    document.getElementById('specTopSpeed').value = model.specs.topSpeed || model.specs['Top Speed'] || '';
    document.getElementById('specAcceleration').value = model.specs.acceleration || model.specs['Acceleration'] || '';
    document.getElementById('specEngine').value = model.specs.engine || model.specs['Engine'] || model.specs.battery || model.specs['Battery'] || '';
    document.getElementById('specHorsepower').value = model.specs.horsepower || model.specs['Horsepower'] || '';
    document.getElementById('specTransmission').value = model.specs.transmission || model.specs['Transmission'] || model.specs.motors || model.specs['Motors'] || '';
    document.getElementById('specDrivetrain').value = model.specs.drivetrain || model.specs['Drivetrain'] || model.specs.range || model.specs['Range'] || '';
    
    document.getElementById('modelFormModal').style.display = 'flex';
}

// Delete model
function deleteModel(id) {
    if (!confirm('Are you sure you want to delete this model?')) return;
    
    const allModels = getAllModels();
    const model = allModels.find(m => m.id === id);
    
    if (!model) return;
    
    if (model.isDefault) {
        // For default models, add to deleted list
        const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults')) || [];
        if (!deletedDefaults.includes(id)) {
            deletedDefaults.push(id);
            localStorage.setItem('deletedDefaults', JSON.stringify(deletedDefaults));
        }
        
        // Remove from edited defaults if present
        const editedDefaults = JSON.parse(localStorage.getItem('editedDefaults')) || {};
        if (editedDefaults[id]) {
            delete editedDefaults[id];
            localStorage.setItem('editedDefaults', JSON.stringify(editedDefaults));
        }
    } else {
        // For custom models, remove from custom models list
        let customModels = JSON.parse(localStorage.getItem('customModels')) || [];
        customModels = customModels.filter(m => m.id !== id);
        localStorage.setItem('customModels', JSON.stringify(customModels));
    }
    
    displayModels();
    updateStats();
}

// Handle model form submission
document.getElementById('modelForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const modelId = document.getElementById('modelId').value;
    const isEditing = Boolean(modelId);
    
    const modelData = {
        id: isEditing ? parseInt(modelId) : Date.now(),
        name: document.getElementById('modelName').value,
        category: document.getElementById('modelCategory').value,
        price: parseInt(document.getElementById('modelPrice').value),
        rentPrice: parseInt(document.getElementById('modelRentPrice').value),
        image: document.getElementById('modelImage').value,
        description: document.getElementById('modelDescription').value,
        specs: {
            topSpeed: document.getElementById('specTopSpeed').value || 'N/A',
            acceleration: document.getElementById('specAcceleration').value || 'N/A',
            engine: document.getElementById('specEngine').value || 'N/A',
            horsepower: document.getElementById('specHorsepower').value || 'N/A',
            transmission: document.getElementById('specTransmission').value || 'N/A',
            drivetrain: document.getElementById('specDrivetrain').value || 'N/A'
        }
    };
    
    if (isEditing) {
        // Check if it's a default model
        const isDefaultModel = defaultModels.some(m => m.id === modelData.id);
        
        if (isDefaultModel) {
            // Save edited default to localStorage
            const editedDefaults = JSON.parse(localStorage.getItem('editedDefaults')) || {};
            editedDefaults[modelData.id] = modelData;
            localStorage.setItem('editedDefaults', JSON.stringify(editedDefaults));
        } else {
            // Update custom model
            let customModels = JSON.parse(localStorage.getItem('customModels')) || [];
            const index = customModels.findIndex(m => m.id === modelData.id);
            if (index !== -1) {
                customModels[index] = modelData;
                localStorage.setItem('customModels', JSON.stringify(customModels));
            }
        }
    } else {
        // Add new custom model
        const customModels = JSON.parse(localStorage.getItem('customModels')) || [];
        customModels.push(modelData);
        localStorage.setItem('customModels', JSON.stringify(customModels));
    }
    
    closeModelForm();
    displayModels();
    updateStats();
});

// Update statistics
function updateStats() {
    const allModels = getAllModels();
    const customModels = JSON.parse(localStorage.getItem('customModels')) || [];
    
    document.getElementById('totalModels').textContent = allModels.length;
    document.getElementById('customModels').textContent = customModels.length;
}

// Category filter
document.getElementById('categoryFilter')?.addEventListener('change', function(e) {
    displayModels(e.target.value);
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modelFormModal');
    if (event.target === modal) {
        closeModelForm();
    }
};

