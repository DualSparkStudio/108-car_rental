// Image-to-3D Enhancement Utilities
// Extracts colors and creates enhanced procedural models from car images

/**
 * Extract dominant colors from an image
 */
async function extractDominantColors(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Resize for faster processing
                const maxSize = 100;
                const ratio = Math.min(maxSize / img.width, maxSize / img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                
                // Color quantization - find most common colors
                const colorMap = {};
                const skipPixels = 4; // Sample every 4th pixel for speed
                
                for (let i = 0; i < pixels.length; i += skipPixels * 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const a = pixels[i + 3];
                    
                    // Skip transparent and very light/dark pixels
                    if (a < 128 || (r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) {
                        continue;
                    }
                    
                    // Bucket colors to reduce variation
                    const bucketSize = 30;
                    const rBucket = Math.floor(r / bucketSize) * bucketSize;
                    const gBucket = Math.floor(g / bucketSize) * bucketSize;
                    const bBucket = Math.floor(b / bucketSize) * bucketSize;
                    
                    const colorKey = `${rBucket},${gBucket},${bBucket}`;
                    colorMap[colorKey] = (colorMap[colorKey] || 0) + 1;
                }
                
                // Sort colors by frequency
                const sortedColors = Object.entries(colorMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([color]) => {
                        const [r, g, b] = color.split(',').map(Number);
                        return { r, g, b };
                    });
                
                // Identify primary (body), accent, and metallic colors
                const primary = sortedColors[0] || { r: 128, g: 128, b: 128 };
                const accent = sortedColors[1] || { r: 200, g: 200, b: 200 };
                
                // Calculate luminance to determine if it's a dark or light car
                const luminance = (0.299 * primary.r + 0.587 * primary.g + 0.114 * primary.b) / 255;
                const isDark = luminance < 0.5;
                
                resolve({
                    primary: `rgb(${primary.r}, ${primary.g}, ${primary.b})`,
                    primaryHex: rgbToHex(primary.r, primary.g, primary.b),
                    accent: `rgb(${accent.r}, ${accent.g}, ${accent.b})`,
                    accentHex: rgbToHex(accent.r, accent.g, accent.b),
                    isDark,
                    luminance,
                    allColors: sortedColors.map(c => `rgb(${c.r}, ${c.g}, ${c.b})`)
                });
            } catch (error) {
                console.error('Error extracting colors:', error);
                // Return default colors on error
                resolve({
                    primary: 'rgb(128, 128, 128)',
                    primaryHex: '#808080',
                    accent: 'rgb(200, 200, 200)',
                    accentHex: '#c8c8c8',
                    isDark: false,
                    luminance: 0.5,
                    allColors: []
                });
            }
        };
        
        img.onerror = () => {
            console.error('Failed to load image:', imageUrl);
            // Return default colors on error
            resolve({
                primary: 'rgb(128, 128, 128)',
                primaryHex: '#808080',
                accent: 'rgb(200, 200, 200)',
                accentHex: '#c8c8c8',
                isDark: false,
                luminance: 0.5,
                allColors: []
            });
        };
        
        img.src = imageUrl;
    });
}

/**
 * Convert RGB to Hex
 */
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

/**
 * Load texture from image URL with error handling
 */
function loadCarTexture(imageUrl) {
    return new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        
        loader.load(
            imageUrl,
            (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                resolve(texture);
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
                resolve(null); // Return null instead of rejecting
            }
        );
    });
}

/**
 * Analyze image dimensions to determine car proportions
 */
async function analyzeCarProportions(imageUrl) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            
            // Estimate car type based on aspect ratio
            // Sports cars tend to be wider/lower (higher ratio)
            // SUVs tend to be taller (lower ratio)
            let estimatedHeight = 1.4;
            let estimatedWidth = 1.8;
            
            if (aspectRatio > 2.5) {
                // Very wide - likely sports car
                estimatedHeight = 1.2;
                estimatedWidth = 2.0;
            } else if (aspectRatio < 1.5) {
                // More square - likely SUV
                estimatedHeight = 1.8;
                estimatedWidth = 1.9;
            }
            
            resolve({
                aspectRatio,
                estimatedHeight,
                estimatedWidth,
                isWide: aspectRatio > 2.2,
                isTall: aspectRatio < 1.8
            });
        };
        
        img.onerror = () => {
            // Return defaults on error
            resolve({
                aspectRatio: 2.0,
                estimatedHeight: 1.4,
                estimatedWidth: 1.8,
                isWide: false,
                isTall: false
            });
        };
        
        img.src = imageUrl;
    });
}

/**
 * Create enhanced car material with image-based properties
 */
function createEnhancedCarMaterial(colors, texture, category) {
    const baseColor = colors.primary;
    
    // Determine metalness and roughness based on color
    const metalness = colors.isDark ? 0.8 : 0.6;
    const roughness = colors.luminance > 0.7 ? 0.3 : 0.4;
    
    const material = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: metalness,
        roughness: roughness,
        envMapIntensity: 1.2
    });
    
    // Apply texture if available (as a subtle overlay)
    if (texture) {
        // Use texture as a map for more realism
        material.map = texture;
        material.needsUpdate = true;
    }
    
    return material;
}

/**
 * Main function to create enhanced car from image
 */
async function enhanceCarWithImage(carGroup, imageUrl, category) {
    try {
        // Extract colors and analyze proportions in parallel
        const [colors, proportions, texture] = await Promise.all([
            extractDominantColors(imageUrl),
            analyzeCarProportions(imageUrl),
            loadCarTexture(imageUrl)
        ]);
        
        return {
            colors,
            proportions,
            texture,
            material: createEnhancedCarMaterial(colors, texture, category)
        };
    } catch (error) {
        console.error('Error enhancing car with image:', error);
        return null;
    }
}

