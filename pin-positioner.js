// Enhanced Pin Positioner Tool
// This script helps you position pins accurately on your map

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Pin Positioner loaded!');
        
        const mapContainer = document.querySelector('.map-container');
        const pins = document.querySelectorAll('.pin');
        
        if (!mapContainer) {
            console.error('Map container not found!');
            return;
        }
        
        if (pins.length === 0) {
            console.error('No pins found!');
            return;
        }
        
        console.log(`Found ${pins.length} pins`);
        
        // Add CSS for active pin and position display
        const style = document.createElement('style');
        style.textContent = `
            .pin.active {
                border: 3px solid #ff0000 !important;
                z-index: 1000 !important;
                box-shadow: 0 0 10px rgba(255, 0, 0, 0.8) !important;
            }
            .position-display {
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                max-width: 300px;
            }
            .instructions {
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0, 64, 128, 0.9);
                color: white;
                padding: 15px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 10000;
                max-width: 250px;
            }
        `;
        document.head.appendChild(style);
        
        // Create position display
        const positionDisplay = document.createElement('div');
        positionDisplay.className = 'position-display';
        positionDisplay.innerHTML = 'No pin selected';
        document.body.appendChild(positionDisplay);
        
        // Create instructions
        const instructions = document.createElement('div');
        instructions.className = 'instructions';
        instructions.innerHTML = `
            <strong>Pin Positioner Instructions:</strong><br>
            1. Click on a pin to select it (red border)<br>
            2. Use arrow keys to move selected pin<br>
            3. Hold Shift for fine adjustments<br>
            4. Click on map to see coordinates<br>
            5. Press 'C' to copy CSS to clipboard
        `;
        document.body.appendChild(instructions);
        
        let selectedPin = null;
        
        // Function to update position display
        function updatePositionDisplay() {
            if (selectedPin) {
                const left = selectedPin.style.left || '0%';
                const top = selectedPin.style.top || '0%';
                const className = selectedPin.className.replace('pin ', '').replace(' active', '');
                positionDisplay.innerHTML = `
                    <strong>Selected: ${className}</strong><br>
                    Left: ${left}<br>
                    Top: ${top}
                `;
            } else {
                positionDisplay.innerHTML = 'No pin selected';
            }
        }
        
        // Make pins clickable to select
        pins.forEach((pin, index) => {
            pin.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Remove active class from all pins
                pins.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked pin
                this.classList.add('active');
                selectedPin = this;
                
                console.log(`Selected pin: ${this.className}`);
                updatePositionDisplay();
            });
        });
        
        // Add click handler to map for coordinate display
        mapContainer.addEventListener('click', function(e) {
            const rect = mapContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            console.log(`Map click: left: ${xPercent.toFixed(1)}%, top: ${yPercent.toFixed(1)}%`);
            
            // If a pin is selected, move it to clicked position
            if (selectedPin) {
                // Ensure pin stays within bounds
                const clampedX = Math.max(0, Math.min(100, xPercent));
                const clampedY = Math.max(0, Math.min(100, yPercent));
                
                selectedPin.style.left = clampedX.toFixed(1) + '%';
                selectedPin.style.top = clampedY.toFixed(1) + '%';
                updatePositionDisplay();
            }
        });
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (!selectedPin) return;
            
            // Get current position
            const currentLeft = parseFloat(selectedPin.style.left) || 0;
            const currentTop = parseFloat(selectedPin.style.top) || 0;
            const step = e.shiftKey ? 0.1 : 1; // Fine adjustment with Shift
            
            let newLeft = currentLeft;
            let newTop = currentTop;
            
            switch(e.key) {
                case 'ArrowLeft':
                    newLeft = Math.max(0, currentLeft - step);
                    break;
                case 'ArrowRight':
                    newLeft = Math.min(100, currentLeft + step);
                    break;
                case 'ArrowUp':
                    newTop = Math.max(0, currentTop - step);
                    break;
                case 'ArrowDown':
                    newTop = Math.min(100, currentTop + step);
                    break;
                case 'c':
                case 'C':
                    // Copy CSS to clipboard
                    const className = selectedPin.className.replace('pin ', '').replace(' active', '');
                    const css = `.${className} { top: ${newTop.toFixed(1)}%; left: ${newLeft.toFixed(1)}%; }`;
                    navigator.clipboard.writeText(css).then(() => {
                        console.log('CSS copied to clipboard:', css);
                        alert('CSS copied to clipboard!');
                    });
                    return;
            }
            
            // Update position
            selectedPin.style.left = newLeft.toFixed(1) + '%';
            selectedPin.style.top = newTop.toFixed(1) + '%';
            
            console.log(`${selectedPin.className}: left: ${selectedPin.style.left}, top: ${selectedPin.style.top}`);
            updatePositionDisplay();
        });
        
        // Initialize position display
        updatePositionDisplay();
        
        console.log('Pin positioner ready! Click on pins to select them, then use arrow keys to move.');
    });
})();
