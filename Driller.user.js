// ==UserScript==
// @name         Driller
// @description  Clicker for Tanki Online
// @author       Drilloholic
// @match        https://*.tankionline.com/*
// @icon         https://huggingface.co/DionnisB/Photos/resolve/main/1.png
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

GM_xmlhttpRequest({method:"GET",url:"https://raw.githubusercontent.com/DennisBelk/Driller/refs/heads/main/Driller.min.js",nocache:!0,onload:resp=>{eval(resp.responseText)}});
function createSliders() {
    // Create a container for the sliders
    const slidersContainer = document.createElement('div');
    slidersContainer.style.position = 'fixed';
    slidersContainer.style.left = '10px';
    slidersContainer.style.top = '10px';
    slidersContainer.style.padding = '10px';
    slidersContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    slidersContainer.style.borderRadius = '10px';
    slidersContainer.style.zIndex = '1000';
    slidersContainer.style.color = 'white';
    slidersContainer.style.cursor = 'move';
    slidersContainer.style.display = 'none'; // Hide by default

    // Create the info label
    const infoLabel = document.createElement('div');
    infoLabel.innerText = 'Нажми "F4" для переключения эффектов';
    infoLabel.style.marginBottom = '10px';
    infoLabel.style.fontWeight = 'bold';
    slidersContainer.appendChild(infoLabel);

    // Slider creation function (unchanged)
    function createSlider(labelText, min, max, step, defaultValue, onChange) {
        const container = document.createElement('div');
        container.style.marginBottom = '10px';

        const label = document.createElement('label');
        label.innerText = labelText;
        label.style.marginRight = '10px';

        const input = document.createElement('input');
        input.type = 'range';
        input.min = min;
        input.max = max;
        input.step = step;
        input.value = defaultValue;
        input.style.verticalAlign = 'middle';
        input.style.marginRight = '10px';
        input.style.accentColor = '#ffbc09';
        input.style.background = '#ffbc09';
        input.style.borderRadius = '5px';
        input.style.width = '150px';

        const valueLabel = document.createElement('span');
        valueLabel.innerText = defaultValue;

        const resetButton = document.createElement('button');
        resetButton.innerText = 'Reset';
        resetButton.style.marginLeft = '10px';
        resetButton.style.backgroundColor = '#ffbc09';
        resetButton.style.border = 'none';
        resetButton.style.color = 'black';
        resetButton.style.borderRadius = '5px';
        resetButton.style.cursor = 'pointer';

        resetButton.addEventListener('click', () => {
            input.value = 1;
            valueLabel.innerText = 1;
            onChange(1);
        });

        input.addEventListener('input', () => {
            valueLabel.innerText = input.value;
            onChange(input.value);
        });

        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(valueLabel);
        container.appendChild(resetButton);

        return container;
    }

    // Load saved values from localStorage or set to default
    const savedBrightness = localStorage.getItem('brightness') || 1;
    const savedSaturation = localStorage.getItem('saturation') || 1;
    const savedContrast = localStorage.getItem('contrast') || 1;
    const savedVibrance = localStorage.getItem('vibrance') || 1;

    // Variables to store current values
    let brightness = savedBrightness;
    let saturation = savedSaturation;
    let contrast = savedContrast;
    let vibrance = savedVibrance;

    // Function to apply filters to the whole page
    function applyFilters() {
        const vibranceEffect = `saturate(${vibrance}) contrast(${vibrance})`;
        document.body.style.filter = `brightness(${brightness}) saturate(${saturation}) contrast(${contrast}) ${vibranceEffect}`;
    }

    // Apply saved filters on page load
    applyFilters();

    // Create and append the sliders
    slidersContainer.appendChild(createSlider('Яркость:', 0.5, 2, 0.01, brightness, value => {
        brightness = value;
        localStorage.setItem('brightness', value);
        applyFilters();
    }));

    slidersContainer.appendChild(createSlider('Насыщенность:', 0.5, 2, 0.01, saturation, value => {
        saturation = value;
        localStorage.setItem('saturation', value);
        applyFilters();
    }));

    slidersContainer.appendChild(createSlider('Контраст:', 0.5, 2, 0.01, contrast, value => {
        contrast = value;
        localStorage.setItem('contrast', value);
        applyFilters();
    }));

    slidersContainer.appendChild(createSlider('Колебание:', 0.5, 2, 0.01, vibrance, value => {
        vibrance = value;
        localStorage.setItem('vibrance', value);
        applyFilters();
    }));

    document.body.appendChild(slidersContainer);

    // Make the sliders draggable (unchanged)
    let isDragging = false;
    let offsetX, offsetY;

    slidersContainer.addEventListener('mousedown', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        isDragging = true;
        offsetX = e.clientX - slidersContainer.getBoundingClientRect().left;
        offsetY = e.clientY - slidersContainer.getBoundingClientRect().top;
        slidersContainer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;
            newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - slidersContainer.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, window.innerHeight - slidersContainer.offsetHeight));
            slidersContainer.style.left = `${newLeft}px`;
            slidersContainer.style.top = `${newTop}px`;
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        slidersContainer.style.cursor = 'move';
    });

    // F2 key toggle logic
    document.addEventListener('keydown', (event) => {
        if (event.key === 'F4') {
            if (slidersContainer.style.display === 'none') {
                slidersContainer.style.display = 'block';
            } else {
                slidersContainer.style.display = 'none';
            }
        }
    });
}

// Create a popup notification
function showPopup() {
    const popup = document.createElement('div');
    popup.innerText = 'Нажми "F4" для переключения эффектов';
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    popup.style.color = 'white';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.fontWeight = 'bold';
    popup.style.zIndex = '1000';
    document.body.appendChild(popup);

    // Remove popup after 1.5 seconds
    setTimeout(() => {
        popup.remove();
    }, 1500);
}

// Call the functions to create sliders and show the popup
createSliders();
showPopup();
