# 🚗 Luxe Motors - Premium Car Showroom

A stunning, fully interactive car showroom website inspired by Tesla's modern design aesthetic. Browse premium vehicles with beautiful images and detailed specifications.

![Luxe Motors](https://img.shields.io/badge/Status-Live-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-orange)

## ✨ Features

### 🎨 Tesla-Inspired Design
- **Dark, Minimalist Theme** - Sleek black/white/gray color scheme
- **Modern Typography** - Clean Inter font family
- **Smooth Animations** - Fluid transitions throughout
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### 🖼️ Beautiful Vehicle Display
- **High-Quality Images** - Crisp, professional vehicle photography
- **Interactive Gallery** - Browse and filter by category
- **Detailed Views** - Full-screen image viewer for each vehicle
- **Fast Loading** - Optimized images for quick performance
- **Responsive Design** - Perfect on all devices
- **Smooth Transitions** - Professional animations and effects

### 🏎️ Vehicle Collection
- **Sports Coupe** - High-performance sports car
- **Luxury SUV** - Premium family vehicle
- **Executive Sedan** - Sophisticated business car
- **Electric GT** - Cutting-edge electric supercar

### 📊 Detailed Specifications
Each vehicle includes complete specs:
- Top Speed & Acceleration
- Engine/Motor Details
- Horsepower & Performance
- Transmission & Drivetrain
- Range (for electric vehicles)

### 💼 Buy & Rent Options
- **Purchase** - Full ownership with financing options
- **Rental** - Flexible daily/monthly rates
- **Contact Forms** - Easy inquiry submission
- **Transparent Pricing** - Clear pricing for all vehicles

## 🚀 Quick Start

### View Live Demo
Simply open `index.html` in a modern web browser!

### Deploy to GitHub Pages

1. **Create a new repository** on GitHub

2. **Clone this project** to your local machine:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Under "Source", select `main` branch
   - Click "Save"
   - Your site will be live at: `https://<username>.github.io/<repo-name>/`

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Three.js** - 3D graphics library

### Browser Support
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

### Performance
- Optimized 3D rendering
- Lazy loading of assets
- Minimal dependencies
- Fast load times

## 📁 Project Structure

```
luxe-motors/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js              # 3D engine & interactions
└── README.md           # Documentation
```

## 🎮 Controls

### Mouse Controls
- **Drag** - Rotate the car 360°
- **Scroll** - Zoom in/out
- **Click View Buttons** - Jump to specific angles

### Touch Controls (Mobile)
- **Swipe** - Rotate the vehicle
- **Pinch** - Zoom in/out

## 🎯 Key Features Explained

### 3D Car Models
Each car is procedurally generated using Three.js geometry:
- Custom body, cabin, and wheel components
- Realistic materials (metallic paint, glass, chrome)
- Dynamic shadows and reflections
- Optimized for performance

### Smooth Animations
- Car entry/exit animations
- Camera transitions between views
- Idle floating animation
- Smooth rotation interpolation

### Responsive Design
- Adapts to all screen sizes
- Mobile-friendly navigation
- Touch-optimized controls
- Flexible grid layouts

## 🎨 Customization

### Change Car Colors
In `app.js`, modify the `carDatabase` object:
```javascript
color: 0xe82127  // Hex color code
```

### Adjust Camera Position
In `app.js`, modify the camera initialization:
```javascript
camera.position.set(8, 4, 12);
```

### Update Pricing
Edit the `carDatabase` in `app.js`:
```javascript
price: 75000,
rentPrice: 250,
```

## 📱 Mobile Optimization

The website is fully responsive with:
- Collapsible navigation
- Touch-friendly controls
- Optimized 3D performance
- Readable text on small screens

## 🌟 Future Enhancements

Potential features for future versions:
- [ ] Multiple images per car (gallery slider)
- [ ] Interior views
- [ ] 360° photo views
- [ ] Comparison tool
- [ ] Save favorites
- [ ] Virtual showroom tour
- [ ] Color configurator
- [ ] Advanced filtering options

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 💡 Credits

- **Inter Font** - Google Fonts
- **Unsplash** - Vehicle photography
- **Design Inspiration** - Tesla.com

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using modern web technologies**

🌐 **Ready for GitHub Pages deployment!**

