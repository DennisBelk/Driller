const standartConfig = {
    supplies: {
        delay: 50,
        multiply: 1,
        repair: !1,
        shield: !1,
        damage: !1,
        speed: !1,
        mine: !1
    },
    menu: {
        posY: "1rem",
        posX: "1rem"
    },
    binds: {
        menu: "F1",
        mines: "Backquote",
        supplies: "F2"
    }
};

let config = JSON.parse(localStorage.getItem("RendaConfig")) || standartConfig;

const saveConfig = () => {localStorage.setItem("RendaConfig", JSON.stringify(config))};
saveConfig();


unsafeWindow.rendaSettings = {
    changeBind: {
        menu: (key) => {
            config.binds.menu = key;
            saveConfig();
        },
        mines: (key) => {
            config.binds.mines = key;
            saveConfig();
        },
        supplies: (key) => {
            config.binds.supplies = key;
            saveConfig();
        }
    },
    resetConfig: () => {
        config = standartConfig;
        saveConfig();
    }
}


const styleElement = document.createElement("style");
document.head.appendChild(styleElement);
styleElement.textContent = `
@keyframes animIn {
    from {
        opacity: 0;
        transform: translateY(5rem) scale(0.9);
        filter: blur(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

@keyframes animOut {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
    to {
        opacity: 0;
        transform: translateY(-5rem) scale(0.9);
        filter: blur(20px);
    }
}
.animIn {
    animation: animIn 0.3s forwards;
}
.animOut {
    animation: animOut 0.3s forwards;
}
.renda_window{
    opacity: 0;
    display: none;
    position: fixed;
    width: 17rem;
    top:${config.menu.posY};
    left:${config.menu.posX};
    padding: 1rem;
    background: rgba(0,0,0,.5);
    backdrop-filter: blur(3px);
    border-radius: 1.5rem;
    z-index: 9998;
    font-size: 1.5rem;
    color: white;
    transition: opacity 0.5s, transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    user-select: none;
    text-align: center;
}
.switch_container{
    display: flex;
    justify-content: space-between;
}
.switch:hover{
    transform: scale(1.05);
}
.switch{
    margin: .2rem;
    width: 2.7rem;
    height: 2.7rem;
    border: .15rem solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
}
.switch img{
    width: 2rem;
    height: 2rem;
    transition: filter 0.3s ease-in-out;
}
.switch_off{
    filter: contrast(0%);
}
.switch_on{
    filter: contrast(100%);
}
.renda_slider{
    -webkit-appearance: none;
    appearance: none;
    background: rgb(200, 200, 200);
    margin: .5rem;
    width: 7rem;
    border-radius: .5rem;
    height: .7rem;
}
.renda_slider::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: rgb(50, 50, 50);
    cursor: pointer;
    border-radius: 50%;
}
`;

const floatingWindow = document.createElement("div");
floatingWindow.classList.add("renda_window");

const title = document.createElement("div");
title.classList.add("Driller_title");
title.textContent = "Driller";
floatingWindow.appendChild(title);

const switchContainer = document.createElement("div");
switchContainer.classList.add("switch_container");
floatingWindow.appendChild(switchContainer);

const repairSwitch = document.createElement("div");
repairSwitch.classList.add("switch");
const repairImg = document.createElement("img");
repairImg.classList.toggle("switch_on", config.supplies.repair);
repairImg.classList.toggle("switch_off", !config.supplies.repair);
repairImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNS40OTk1IDEuNUwyMC45OTk1IDZWOEwyNC45OTk1IDEySDI2Ljk5OTVMMzEuNDk5NSA3LjVIMzIuOTk5NVYxMEMzMi45OTk1IDE1LjUyMjggMjguNTIyNCAyMCAyMi45OTk1IDIwQzIxLjUzMjIgMjAgMjAuMTM4NiAxOS42ODQgMTguODgzMyAxOS4xMTYyTDYuOTk5OTMgMzAuOTk5OUM1LjYxOTIyIDMyLjM4MDcgMy4zODA2MSAzMi4zODA3IDEuOTk5ODkgMzFDMC42MTkxOSAyOS42MTkzIDAuNjE5MTc3IDI3LjM4MDcgMS45OTk4NSAyNkwxMy44ODMzIDE0LjExNjJDMTMuMzE1NiAxMi44NjA5IDEyLjk5OTUgMTEuNDY3MyAxMi45OTk1IDEwQzEyLjk5OTUgNC40NzcxNSAxNy40NzY3IDAgMjIuOTk5NSAwSDI1LjQ5OTVWMS41WiIgZmlsbD0iI0JGRTUwMCIvPgo8L3N2Zz4K";
repairSwitch.appendChild(repairImg);
repairSwitch.addEventListener("click", () => {
    config.supplies.repair = !config.supplies.repair;
    repairImg.classList.toggle("switch_on", config.supplies.repair);
    repairImg.classList.toggle("switch_off", !config.supplies.repair);
    saveConfig();
});
switchContainer.appendChild(repairSwitch);

const shieldSwitch = document.createElement("div");
shieldSwitch.classList.add("switch");
const shieldImg = document.createElement("img");
shieldImg.classList.toggle("switch_on", config.supplies.shield);
shieldImg.classList.toggle("switch_off", !config.supplies.shield);
shieldImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOS4zNTg1IDIwLjI2MTdDMjYuNjE0MSAyOC45Njc0IDE2IDMyIDE2IDMyQzE2IDMyIDIgMjggMiAxNlY1LjUwODZDMiA0LjYxNTY0IDIuNTkxOTUgMy44MzA4NyAzLjQ1MDU2IDMuNTg1NTVMMTYgMEwyOC41NDk0IDMuNTg1NTVDMjkuNDA4IDMuODMwODcgMzAgNC42MTU2NCAzMCA1LjUwODZWMTJWMTZDMzAgMTYgMzAgMTYgMzAgMTZDMzAgMTcuNTUxNCAyOS43NjYgMTguOTY5MSAyOS4zNTg1IDIwLjI2MTdaTTI2IDEwLjg1NzFWNy4wMTcyMUwxNiA0LjE2MDA2TDYgNy4wMTcyMVYxNkM2IDIwLjIwOTEgOC4zOTA3NCAyMy4xNDkyIDExLjMyNSAyNS4yNDUxQzEyLjc3OTMgMjYuMjgzOSAxNC4yNTk1IDI3LjAyNzIgMTUuMzg4MiAyNy41MTA5QzE1LjYwOSAyNy42MDU1IDE1LjgxNCAyNy42ODkyIDE2IDI3Ljc2MjRMMTYgOEwyNiAxMC44NTcxWiIgZmlsbD0iI0VBREM5OSIvPgo8L3N2Zz4K";
shieldSwitch.appendChild(shieldImg);
shieldSwitch.addEventListener("click", () => {
    config.supplies.shield = !config.supplies.shield;
    shieldImg.classList.toggle("switch_on", config.supplies.shield);
    shieldImg.classList.toggle("switch_off", !config.supplies.shield);
    saveConfig();
});
switchContainer.appendChild(shieldSwitch);

const damageSwitch = document.createElement("div");
damageSwitch.classList.add("switch");
const damageImg = document.createElement("img");
damageImg.classList.toggle("switch_on", config.supplies.damage);
damageImg.classList.toggle("switch_off", !config.supplies.damage);
damageImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDEuMzMzMzNMMCAyNkwyMCAxMkw2IDMyTDMwLjY2NjcgMjhMMjAgMjRMMzIgMEw4IDEyTDQgMS4zMzMzM1oiIGZpbGw9IiNGRjMzMzMiLz4KPC9zdmc+Cg==";
damageSwitch.appendChild(damageImg);
damageSwitch.addEventListener("click", () => {
    config.supplies.damage = !config.supplies.damage;
    damageImg.classList.toggle("switch_on", config.supplies.damage);
    damageImg.classList.toggle("switch_off", !config.supplies.damage);
    saveConfig();
});
switchContainer.appendChild(damageSwitch);

const speedSwitch = document.createElement("div");
speedSwitch.classList.add("switch");
const speedImg = document.createElement("img");
speedImg.classList.toggle("switch_on", config.supplies.speed);
speedImg.classList.toggle("switch_off", !config.supplies.speed);
speedImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuODM5N0MyIDEyLjY3MiAyLjUxMDI1IDExLjU2MjYgMy4zOTY4MyAxMC44MDI3TDE2IDBMMjguNjAzMiAxMC44MDI3QzI5LjQ4OTcgMTEuNTYyNiAzMCAxMi42NzIgMzAgMTMuODM5N1YyMEwxNiA4TDIgMjBWMTMuODM5N1oiIGZpbGw9IiNGRkZGMDAiLz4KPHBhdGggZD0iTTIgMjUuODM5N0MyIDI0LjY3MiAyLjUxMDI1IDIzLjU2MjYgMy4zOTY4MyAyMi44MDI3TDE2IDEyTDI4LjYwMzIgMjIuODAyN0MyOS40ODk3IDIzLjU2MjYgMzAgMjQuNjcyIDMwIDI1LjgzOTdWMzJMMTYgMjBMMiAzMlYyNS44Mzk3WiIgZmlsbD0iI0ZGRkYwMCIvPgo8L3N2Zz4K";
speedSwitch.appendChild(speedImg);
speedSwitch.addEventListener("click", () => {
    config.supplies.speed = !config.supplies.speed;
    speedImg.classList.toggle("switch_on", config.supplies.speed);
    speedImg.classList.toggle("switch_off", !config.supplies.speed);
    saveConfig();
});
switchContainer.appendChild(speedSwitch);

const mineSwitch = document.createElement("div");
mineSwitch.classList.add("switch");
const mineImg = document.createElement("img");
mineImg.classList.toggle("switch_on", config.supplies.mine);
mineImg.classList.toggle("switch_off", !config.supplies.mine);
mineImg.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00IDIxLjAwOThWMTAuOTkwMkwxMC45OTAyIDRIMjEuMDA5OEwyOCAxMC45OTAyVjIxLjAwOThMMjEuMDA5OCAyOEgxMC45OTAyTDQgMjEuMDA5OFpNOC43NDc1NSAwLjU4NTc4NkM5LjEyMjYyIDAuMjEwNzEzIDkuNjMxMzMgMCAxMC4xNjE4IDBIMjEuODM4MkMyMi4zNjg3IDAgMjIuODc3NCAwLjIxMDcxNCAyMy4yNTI1IDAuNTg1Nzg3TDMxLjQxNDIgOC43NDc1NUMzMS43ODkzIDkuMTIyNjIgMzIgOS42MzEzMyAzMiAxMC4xNjE4VjIxLjgzODJDMzIgMjIuMzY4NyAzMS43ODkzIDIyLjg3NzQgMzEuNDE0MiAyMy4yNTI1TDIzLjI1MjUgMzEuNDE0MkMyMi44Nzc0IDMxLjc4OTMgMjIuMzY4NyAzMiAyMS44MzgyIDMySDEwLjE2MThDOS42MzEzMyAzMiA5LjEyMjYyIDMxLjc4OTMgOC43NDc1NSAzMS40MTQyTDAuNTg1Nzg2IDIzLjI1MjVDMC4yMTA3MTMgMjIuODc3NCAwIDIyLjM2ODcgMCAyMS44MzgyVjEwLjE2MThDMCA5LjYzMTMzIDAuMjEwNzE0IDkuMTIyNjIgMC41ODU3ODYgOC43NDc1NUw4Ljc0NzU1IDAuNTg1Nzg2Wk0xNiAyM0MxOS44NjYgMjMgMjMgMTkuODY2IDIzIDE2QzIzIDEyLjEzNCAxOS44NjYgOSAxNiA5QzEyLjEzNCA5IDkgMTIuMTM0IDkgMTZDOSAxOS44NjYgMTIuMTM0IDIzIDE2IDIzWiIgZmlsbD0iIzM2QjI0QSIvPgo8L3N2Zz4K";
mineSwitch.appendChild(mineImg);
mineSwitch.addEventListener("click", () => {
    config.supplies.mine = !config.supplies.mine;
    mineImg.classList.toggle("switch_on", config.supplies.mine);
    mineImg.classList.toggle("switch_off", !config.supplies.mine);
    saveConfig();
});
switchContainer.appendChild(mineSwitch);

const multiplySlider = document.createElement("input");
multiplySlider.classList.add("renda_slider");
multiplySlider.type = "range";
multiplySlider.min = 1;
multiplySlider.max = 10;
multiplySlider.value = config.supplies.multiply;
multiplySlider.addEventListener("input", ({target}) => {
    config.supplies.multiply = parseInt(target.value);
    saveConfig();
});
floatingWindow.appendChild(multiplySlider);

const multiplyLabel = document.createElement("span");
multiplyLabel.textContent = `Multiply: ${config.supplies.multiply}`;
setInterval(() => {
    multiplyLabel.textContent = `Multiply: ${config.supplies.multiply}`
}, 100);
floatingWindow.appendChild(multiplyLabel);

const delaySlider = document.createElement("input");
delaySlider.classList.add("renda_slider");
delaySlider.type = "range";
delaySlider.min = 0;
delaySlider.max = 300;
delaySlider.step = 5;
delaySlider.value = config.supplies.delay;
delaySlider.addEventListener("input", ({target}) => {
    config.supplies.delay = parseInt(target.value);
    saveConfig();
});
floatingWindow.appendChild(delaySlider);

const delayLabel = document.createElement("span");
delayLabel.textContent = `Delay: ${config.supplies.delay}`;
setInterval(() => {
    delayLabel.textContent = `Delay: ${config.supplies.delay}`
}, 100);
floatingWindow.appendChild(delayLabel);

const emulateSupply = (supply) => {
    root.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        code: 'Digit' + supply
    }));
    root.dispatchEvent(new KeyboardEvent('keyup', {
        bubbles: true,
        code: 'Digit' + supply
    }));
}

let lastClickTime = Date.now();
function activateSupplies() {
    if (config.supplies.delay != 0) {
        if (Date.now() - lastClickTime < config.supplies.delay) {
            requestAnimationFrame(activateSupplies);
            return;
        };
    }
    config.supplies.repair && emulateSupply("1");
    config.supplies.shield && emulateSupply("2");
    config.supplies.damage && emulateSupply("3");
    config.supplies.speed && emulateSupply("4");
    for (let i = 0; i < config.supplies.multiply; i++) config.supplies.mine && emulateSupply("5");
    lastClickTime = Date.now();
    requestAnimationFrame(activateSupplies);
}
activateSupplies()

const openMenu = () => {
    floatingWindow.style.display = 'block';
    floatingWindow.classList.remove('animOut');
    floatingWindow.classList.add('animIn');
    isMenuOpen = true;
}

const closeMenu = () => {
    floatingWindow.classList.remove('animIn');
    floatingWindow.classList.add('animOut');
    floatingWindow.addEventListener('animationend', () => {
        if (floatingWindow.classList.contains('animOut')) {
            floatingWindow.style.display = 'none';
        }
    }, {once: true});
    isMenuOpen = false;
}

let isMenuOpen = false;
document.addEventListener("keyup", ({code}) => {
    if (document.querySelector('input[type="text"]') !== null) return;
    switch (code) {
        case config.binds.menu:
            isMenuOpen ? closeMenu() : openMenu();
            break;
        case config.binds.mines:
            config.supplies.mine = !config.supplies.mine;
            mineImg.classList.toggle("switch_on", config.supplies.mine);
            mineImg.classList.toggle("switch_off", !config.supplies.mine);
            saveConfig();
            break;
        case config.binds.supplies:
            config.supplies.shield = !config.supplies.shield;
            shieldImg.classList.toggle("switch_on", config.supplies.shield);
            shieldImg.classList.toggle("switch_off", !config.supplies.shield);
            config.supplies.damage = !config.supplies.damage;
            damageImg.classList.toggle("switch_on", config.supplies.damage);
            damageImg.classList.toggle("switch_off", !config.supplies.damage);
            config.supplies.speed = !config.supplies.speed;
            speedImg.classList.toggle("switch_on", config.supplies.speed);
            speedImg.classList.toggle("switch_off", !config.supplies.speed);
            saveConfig();
            break;
    }
});

let offsetX, offsetY, isDragging = false, canDrag = true;
floatingWindow.addEventListener("mousedown", ({target, clientX, clientY}) => {
    if (target.classList.contains("switch") || target.classList.contains("renda_slider")) {
        canDrag = false;
        return;
    }
    canDrag = true, isDragging = true;
    offsetX = clientX - floatingWindow.getBoundingClientRect().left;
    offsetY = clientY - floatingWindow.getBoundingClientRect().top;
});
document.addEventListener("mousemove", ({clientX, clientY}) => {
    if (isDragging && canDrag) {
        const newX = `${clientX - offsetX}px`;
        const newY = `${clientY - offsetY}px`;
        floatingWindow.style.left = newX;
        floatingWindow.style.top = newY;
        config.menu.posX = newX;
        config.menu.posY = newY;
    }
});
document.addEventListener("mouseup", () => {
    isDragging = false;
    saveConfig();
});

document.body.appendChild(floatingWindow);

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
    infoLabel.innerText = 'Press "F2" to toggle sliders';
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
    slidersContainer.appendChild(createSlider('Brightness:', 0.5, 2, 0.01, brightness, value => {
        brightness = value;
        localStorage.setItem('brightness', value);
        applyFilters();
    }));

    slidersContainer.appendChild(createSlider('Saturation:', 0.5, 2, 0.01, saturation, value => {
        saturation = value;
        localStorage.setItem('saturation', value);
        applyFilters();
    }));

    slidersContainer.appendChild(createSlider('Contrast:', 0.5, 2, 0.01, contrast, value => {
        contrast = value;
        localStorage.setItem('contrast', value);
        applyFilters();
    }));

    slidersContainer.appendChild(createSlider('Vibrance:', 0.5, 2, 0.01, vibrance, value => {
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
        if (event.key === 'F2') {
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
    popup.innerText = 'Press F2 to toggle sliders';
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
// MineLine
class Utils {
	constructor() {};

	get rootElement() {
		return document.getElementById('root');
	};

	get isChatOpen() {
		return document.querySelectorAll("input[type=text]").length > 0;
	};


	filterArray = function(value) {
		return value != null;
	};


	getObjectName = function(object) {
		return object?.constructor?.name;
	};
	getObj = function(arr, name, index) {
		if ((!arr) || (!name) || (!index)) return;
		const components = arr;
		for (const component of components) {
			if(typeof component == 'object'){
				const prototype = component?.__proto__;
				const init = Object.values(prototype)[index];
				if (init?.toString()?.includes(name)) {
					return component;
				};
			};
		};
	}


	equal = (a, b) => a?.toUpperCase() === b?.toUpperCase();

	fuzzySearch = function(needle, haystack) {
		var hlen = haystack.length;
		var nlen = needle.length;
		if (nlen > hlen) {
			return false;
		};

		if (nlen === hlen) {
			return needle === haystack;
		};

		outer: for (var i = 0, j = 0; i < nlen; i++) {
			var nch = needle.charCodeAt(i);
			while (j < hlen) {
				if (haystack.charCodeAt(j++) === nch) {
					continue outer;
				};
			};
			return false;
		};
		return true;
	};

	findObjectByName = function(object, name, index = -1, last = false, fuzzy = false) {
		let i = 0;
		for (const key in object) {
			if (typeof object[key] === 'object' && (fuzzy ? this.fuzzySearch(name, this.getObjectName(object[key])) : this.equal(this.getObjectName(object[key]), name))) {
				if (index === -1 || index === i) return last ? [key, object[key]] : object[key];
				i++;
			};
		};
	};




	findByPath = function(object, path) {
		if (typeof path !== 'string' && !Array.isArray(path)) throw new Error(`Путь должен быть строкой 'obj.obj2.obj3...' или массивом [ 'obj', 'obj2', 'obj3' ... ]`);

		const arrayPath = Array.isArray(path) ? path : path.split('.');

		let result = object;
		arrayPath.forEach((name, index) => {
			if (!result) return;

			const last = index === arrayPath.length - 1;
			if (result[name]) result = result[name];
			else if (name.slice(0, 2) === 'i:') result = this.findByIndex(result, name.slice(2, name.length), last);
			else if (name.slice(0, 6) === 'fuzzy:') result = this.findObjectByName(result, name.slice(6, name.length), -1, last, true);
			else {
				const split = name.split(':');
				if (split.length === 2) result = this.findObjectByName(result, split[0], +split[1], last);
				else result = this.findObjectByName(result, name, -1, last);
			}

			if (typeof result !== 'object') return result;
		});

		return result;
	};


	getComponentNames = function(element) {
		if (typeof element !== 'object' && typeof element !== 'function') return;
		const result = {};

		for (const [key, value] of Object.entries(element)) {
			if (Array.isArray(value)) {
				result[key] = value;
				continue;
			}

			if (typeof value === 'function' && value.callableName) {
				result[value.callableName] = element[key];
				continue;
			}

			const name = value?.constructor?.$metadata$?.simpleName;

			if (!name) continue;

			if (result[name]) {
				for (let i = 0; ; i++) {
					const tempName = `${name}_${i}`;

					if (!result[tempName]) {
						result[tempName] = value;
						break;
					}
				}
			} else {
				result[name] = value;
			}
		}

		result['original'] = element;

		return result;
	}

	getByProto = function(arr, name) {
   if (!arr || !name) return;
    const components = Object.values(arr);
    for (const component of components) {
      const prototype = Object.values(component.constructor.prototype);
      for (const t of prototype) {
        const init = t.toString();
        if (init?.includes(name)) return component;
      }
    }
  };

	findByIndex = (object, index, last = false) => {
		const entries = Object.entries(object)?.[index];

		if (last)
			return entries;

		if (typeof entries?.[1] === 'object')
			return entries[1];

		return entries?.[0];
	};


	getByLength = function(obj, length) {
		let validObjects = [];
		for (let i = 0; i < obj.length; i++) {
			let objectsArray = [];
			for (let key in obj[i]) {
				if (typeof obj[i][key] == 'object') {
					objectsArray.push(obj[i][key]);
				};
			};

			if (objectsArray.length == length) validObjects.push(objectsArray);
		};
		return validObjects;
	};


	componentStarter = function(obj, visited = new Set ()) {
		if (visited.has(obj)) {
			return null;
		};

		visited.add(obj);

		if (obj?.constructor?.$metadata$?.simpleName === "ModalComponent") {
			return obj;
		};

		for (let key in obj) {
			if (typeof obj[key] === "object") {
				const result = this.componentStarter(obj[key], visited);
				if (result) {
					return result;
				};
			};
		};

		return null;
	};
	getObj = function(arr, name, index) {
		if ((!arr) || (!name) || (!index)) return;
		const components = arr;
		for (const component of components) {
			if(typeof component == 'object'){
				const prototype = component?.__proto__;
				const init = Object.values(prototype)[index];
				if (init?.toString()?.includes(name)) {
					return component;
				};
			};
		};
	}

	get rootObject() {
        if (this.rootElement) {
            return this.findByPath(
      unsafeWindow.root,
      "i:0.child.child.stateNode"
    )
        } else {
            return;
        };
    };

	get isGameReady() {
		const component = this.rootObject;
		if (!component) return;

		const TOState = this.getBySimpleName(component, ""),
					Store = this.getBySimpleName(TOState, "");

		const ThreadSafeList = Object.entries(Store)?.[1]?.[1];

		if (ThreadSafeList == void 0) return;

		const ThreadSafeListValue = Object.entries(ThreadSafeList)?.[1]?.[1];
		const BattleEntity = this.getByLength(ThreadSafeListValue, 3)?.[1]?.[0];

		return BattleEntity ? true : false
	};

	getByName = function(obj, name) {
		for (const key in obj) {
			if (obj[key]?.constructor?.name === name && typeof obj[key] === "object") {
				return obj[key];
			};
		};
	};

	getBySimpleName = function(obj, simpleName) {
		for (const key in obj) {
			if (obj[key]?.constructor?.$metadata$?.simpleName === simpleName && typeof obj[key] === "object") {
				return obj[key];
			};
		};
	};

	errorLog = function(text) {
		throw new Error('[Shizoval] ' + text);
	};

	notify = function(text, color) {
		const label = document.createElement('div');
		label.innerHTML = text;
		label.style.backgroundColor = color;
		label.className = 'notify-message';
		document.body.appendChild(label);
		setTimeout(() => {
			label.style.top = "-100%";
		}, 2000);
	};

	getRandom = function(min, max) {
		return Math.random() * (max - min) + min;
	};
};

const utils = new Utils();

unsafeWindow.Utils = utils;


class GameObjects {
	constructor() {};
	get TOState() {
		return utils.getBySimpleName(utils.rootObject, "");
	};

	get userName() {
		return utils.findByPath(objects.gameObjects.user, "i:0.i:15")[1];
	};

	get store() {
		return utils.getBySimpleName(this.TOState, "");
	};

	get user() {
		return utils.findByPath(objects.gameObjects.TOState, "i:3.i:4")[1];
	};


	world = {
		get world() {
			if (!utils.isGameReady) return;
			const component = utils.rootObject,
						TOState = utils.getBySimpleName(component, ""),
						Store = utils.getBySimpleName(TOState, ""),
						ThreadSafeList = Object.entries(Store)[1][1];

			if (ThreadSafeList == void 0) return;

			const ThreadSafeListValue = Object.entries(ThreadSafeList)[1][1];
			const BattleEntity = utils.getByLength(ThreadSafeListValue, 3)[1][0];
			const world = utils.getComponentNames(Object.entries(BattleEntity)[1][1]);

			return world;
		}
	};

	localTank = {
		get components() {
			if (!utils.isGameReady) return;
			const component = utils.rootObject,
						TOState = utils.getBySimpleName(component, ""),
						Store = utils.getBySimpleName(TOState, ""),
						ThreadSafeList = Object.entries(Store)[1][1];

			if (ThreadSafeList == void 0) return;

			const ThreadSafeListValue = Object.entries(ThreadSafeList)[1][1];

			const BattleEntity = utils.getByLength(ThreadSafeListValue, 3)[1][0],
						TankArray = Object.entries(BattleEntity)[5][1],
						ComponentList = Object.entries(TankArray)[0][1];

			return ComponentList;
		},
	}

	get gameMode() {
		if (!utils.isGameReady) return;
		const world = this.world.world,
					t0 = utils.getComponentNames(world).ArrayList_0,
					t1 = Object.entries(t0)[1][1],
					t2 = utils.getComponentNames(t1[0]),
					t3 = Object.entries(t2.original)[5][1],
					gameMode = Object.entries(t3)[0][1];

		return gameMode;
	};

	get game() {
		return utils.findByPath(objects.gameObjects.world.world, "ArrayList_0.i:1.0")
	};

	get mines() {
		if (!utils.isGameReady) return;
		const minesPath = Object.entries(utils.getObj(this.gameMode, 'putMine',1))[11][1]

		const minesArraya = utils.findByPath(minesPath, 'i:1')[1];
		const minesArray = Object.entries(minesArraya)[1][1];

		return minesArray;
	};
}
let objects = {
	gameObjects: void 0,
};

let mineLine = 'enabled'

function initObjects() {
    if (utils.isGameReady && (objects.gameObjects == void 0 || objects.features == void 0)) {
        objects.gameObjects = new GameObjects();

        const senderComponent = utils.getByProto(objects.gameObjects.localTank.components, "gameMode")
        console.log(senderComponent)
            senderComponent [
                utils.findByPath(senderComponent, "i:7")[0]
            ] = mineLine === 'enabled';

        unsafeWindow.gameObjects = objects.gameObjects;
    };

    requestAnimationFrame(initObjects);
};

requestAnimationFrame(initObjects);

const isChatOpen = function() {
	for (const input of document.getElementsByTagName('input')) {
		if (input.className.toLocaleLowerCase().includes('chat', 'input')) return true;
	}
	return false;
}

document.addEventListener('keyup', event => {


        if (event.code === "Digit9") {
        mineLine === 'enabled'
        ? mineLine = 'disabled'
        : mineLine = 'enabled'
    }
});






//unsafeWindow.isChatOpen = isChatOpen;
//unsafeWindow.removeMines =removeMines;

/* document.addEventListener('keyup', event => {
	if (isChatOpen()) return;

	/*if (event.code === "KeyM") {
		removeMines.disableRepeats();
	}

	if (event.key == 'F7') enabled = !enabled;
	enabled == true
		? requestAnimationFrame(removeMines.removeAllMines)
	: cancelAnimationFrame(removeMines.removeAllMines)
}); */
