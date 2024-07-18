/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\r\n\r\n\r\n\r\n\r\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer()\r\n\r\nrenderer.setSize(window.innerWidth, window.innerHeight)\r\n\r\ndocument.body.appendChild(renderer.domElement)\r\n\r\nconst scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()\r\n\r\nconst camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(\r\n    50,\r\n    window.innerWidth / window.innerHeight,\r\n    0.1,\r\n    1000\r\n)\r\n\r\n// const orbit = new OrbitControls(camera, renderer.domElement)\r\n// orbit.enablePan = false\r\n\r\nconst axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__.AxesHelper(30)\r\nscene.add(axesHelper)\r\nconst grid = new three__WEBPACK_IMPORTED_MODULE_0__.GridHelper(30,30)\r\nscene.add(grid)\r\ncamera.position.set(0, 1, -3)\r\n//orbit.update()\r\n\r\nconst ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xFFFFFF)\r\nscene.add(ambientLight)\r\n\r\n// const rainbowRoadGeometry = new THREE.PlaneGeometry(3, 200, 10, 200)\r\n// const rainbowRoadMaterial = new THREE.MeshBasicMaterial({\r\n//     color: 0xFFFFFF,\r\n//     wireframe: true})\r\n// const rainbowRoad = new THREE.Mesh(rainbowRoadGeometry, rainbowRoadMaterial)\r\n// scene.add(rainbowRoad)\r\n// rainbowRoad.position.set(0, 0, 95)\r\n// rainbowRoad.rotation.set((-0.5 * Math.PI), 0, 0)\r\n// // adds same color to both sides of the plane\r\n// rainbowRoadMaterial.side = THREE.DoubleSide\r\n\r\nlet segments = 200\r\n// rainbow colors: red   orange    yellow    green      blue      indigo    voilet   https://www.krishnamani.in/color-codes-for-rainbow-vibgyor-colours/\r\nlet colors = [0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x4B0082, 0x9400D3]\r\nlet colorIndex = 0\r\nlet width = 6\r\nlet height = 3\r\nlet roadZ = 0\r\n\r\nfor(let i = 0; i < segments; i++){\r\n    let roadGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(width, height)\r\n    if (colorIndex === 6){\r\n        colorIndex = 0\r\n    }\r\n    let roadMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color: colors[colorIndex]})\r\n    roadMaterial.transparent = true\r\n    roadMaterial.opacity = 0.5\r\n    let roadSegment = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(roadGeometry, roadMaterial)\r\n    scene.add(roadSegment)\r\n    roadMaterial.side = three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide\r\n    roadSegment.rotation.set((-0.5 * Math.PI), 0, 0)\r\n    roadSegment.position.set(0, 0, roadZ)\r\n    roadZ += 3\r\n    colorIndex += 1\r\n}\r\n\r\n\r\nconst raceCarGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(0.25)\r\nconst raceCarMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({color: 0x222222})\r\nconst raceCar = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(raceCarGeometry, raceCarMaterial)\r\nscene.add(raceCar)\r\nraceCar.position.set(0, 0.25, 0)\r\ncamera.lookAt(raceCar.position)\r\n\r\nlet xValue, yValue\r\n\r\nwindow.addEventListener('mousemove', (e) => {\r\n    xValue = e.clientX - window.innerWidth / 2\r\n    yValue = e.clientY - window.innerHeight / 2\r\n})\r\n\r\nfunction steer(mouseX, carX, carY, carZ, acceleration) {\r\n    let steerSpeed = (Math.abs(mouseX) / (window.innerWidth / 2) * 6)\r\n    console.log(steerSpeed)\r\n    if (Math.abs(mouseX) >= ((window.innerWidth / 2) - ((window.innerWidth / 2) * 0.7)) && acceleration != 0.1) {\r\n        switch (Math.sign(mouseX)) {\r\n            // steer left\r\n            case -1:\r\n                raceCar.position.set((carX + (0.01 * steerSpeed)), carY, carZ)\r\n                camera.position.set(raceCar.position.x - (0.09 * steerSpeed), raceCar.position.y + 1, raceCar.position.z - 3)\r\n                camera.lookAt(raceCar.position)\r\n                break\r\n            // steer right\r\n            case 1:\r\n                raceCar.position.set((carX - (0.01 * steerSpeed)), carY, carZ)\r\n                camera.position.set(raceCar.position.x + (0.09 * steerSpeed), raceCar.position.y + 1, raceCar.position.z - 3)\r\n                camera.lookAt(raceCar.position)\r\n                break\r\n            default:\r\n                camera.position.set(carX, carY + 1, carZ - 3)\r\n                break\r\n        }\r\n    }\r\n    else {\r\n        camera.position.set(carX, carY + 1, carZ - 3)\r\n        camera.lookAt(raceCar.position)\r\n    }\r\n}\r\n\r\nlet forward = 0\r\nlet acceleration = 0.1\r\nlet deceleration = -1\r\nlet speedCap = 4\r\nlet mouseDown = false\r\n\r\nfunction animateRoad() {\r\n    if (mouseDown && !mouseIsDown[0]){\r\n        deceleration = acceleration\r\n        forward += 0.1 * acceleration\r\n        acceleration = 0\r\n        raceCar.position.set(raceCar.position.x, 0.25, forward)\r\n        // camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)\r\n        // camera.lookAt(raceCar.position) \r\n        acceleration += 0.1\r\n        mouseDown = false\r\n    }\r\n    else if (!mouseDown && deceleration >= 0){\r\n        forward += 0.1 * deceleration\r\n        raceCar.position.set(raceCar.position.x, 0.25, forward)\r\n        // camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)\r\n        // camera.lookAt(raceCar.position) \r\n        deceleration -= 0.1\r\n    }\r\n    else if (mouseIsDown[0]){\r\n        if (acceleration >= speedCap) {\r\n            acceleration = speedCap\r\n            forward += 0.1 * acceleration\r\n        }\r\n        else {\r\n            forward += 0.1 * acceleration\r\n        }\r\n        deceleration = -1\r\n        raceCar.position.set(raceCar.position.x, 0.25, forward)\r\n        // camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)\r\n        // camera.lookAt(raceCar.position) \r\n        acceleration += 0.1\r\n        mouseDown = true\r\n    }\r\n    if (mouseIsDown[2]){\r\n        forward -= 0.1\r\n        raceCar.position.set(raceCar.position.x, 0.25, forward)\r\n        camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)\r\n        camera.lookAt(raceCar.position) \r\n        speed = 0\r\n    }\r\n    // console.log(acceleration, deceleration)\r\n    steer(xValue, raceCar.position.x, raceCar.position.y, forward, acceleration)\r\n    renderer.render(scene, camera)\r\n}\r\n\r\nlet mouseIsDown = [0,0,0]\r\ndocument.body.onmousedown = (e) => {\r\n    ++mouseIsDown[e.button]\r\n    console.log(mouseIsDown)\r\n}\r\ndocument.body.onmouseup = (e) => {\r\n    --mouseIsDown[e.button]\r\n    console.log(mouseIsDown)\r\n}\r\ndocument.getElementById('reset-button').onclick = () => {\r\n    raceCar.position.set(0, 0.25, 0)\r\n    forward = 0\r\n    acceleration = 0 \r\n    deceleration = 0\r\n    camera.position.set(raceCar.position.x, raceCar.position.y+1, raceCar.position.z - 3)\r\n    camera.lookAt(raceCar.position)\r\n}\r\nrenderer.setAnimationLoop(animateRoad)\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;