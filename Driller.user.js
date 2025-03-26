// ==UserScript==
// @name         Driller
// @description  Clicker & Gamma for Tanki Online
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
