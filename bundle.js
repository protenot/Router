/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/history-api.ts":
/*!****************************!*\
  !*** ./src/history-api.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: function() { return /* binding */ render; }\n/* harmony export */ });\n// 0. Create a render function for visual debugging purposes\n//import { PREFIX } from \"../webpack.config\";\n\nconst render = () => {\n  const route = location.pathname;\n  const href = window.location.href;\n  document.getElementById(\"root\").innerHTML = `<h2>\"${route} page\"</h2>`;\n  console.log(\"1 \" + route);\n};\n\n/*  *\n  document.querySelectorAll(\"a\").forEach((link) => {\n    link.href = PREFIX + link.pathname;\n  });/\n\n// 1. Handle initial page load\nwindow.addEventListener(\"load\", () => {\n  render(); // 👈\n  console.log(\"2\");\n});\n\n /*    document.querySelectorAll(\"a\").forEach((link) => {\n    link.pathname = PREFIX + link.pathname;\n  }); */\n\n// 2. Handle history navigations. alternative \"window.onpopstate\"\n/* window.addEventListener(\"popstate\", (event) => {\n  render();\n  console.log(\"3\")\n}); */\n\n// 3. Catch <a> tag clicks + trigger change handler\ndocument.body.addEventListener(\"click\", event => {\n  if (event.target && !event.target.matches(\"a\")) {\n    return;\n  }\n  event.preventDefault();\n  let url = event.target && event.target.getAttribute(\"href\");\n  url = \"/Router\" + url;\n  const href = window.location.href;\n  /* document.querySelectorAll(\"a\").forEach((link) => {\n    link.href = PREFIX + link.pathname;\n  }); */\n  console.log(\"url: \" + url + \"  href: \" + href + \" route\" + location.pathname);\n  history.pushState({\n    foo: \"bar\",\n    url\n  }, document.title, url);\n  console.log(history.state);\n  // history.replaceState({ foo: \"bar\" }, url, url);\n  render(); // 👈\n  console.log(\"3 + \" + url);\n});\n\n//# sourceURL=webpack://router/./src/history-api.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _history_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./history-api */ \"./src/history-api.ts\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ \"./src/router.ts\");\n\n\n//import { PREFIX } from \"../webpack.config\";\nconst aArray = document.querySelectorAll(\"a\");\nconsole.log(aArray);\naArray.forEach(link => {\n  link.href = \"/Router\" + link.pathname;\n  console.log(aArray[0].href);\n});\nconst createRender = content => (...args) => {\n  console.info(`${content} args=${JSON.stringify(args)}`);\n  document.getElementById(\"root\").innerHTML = `<h2>${content}</h2>`;\n  console.log(content);\n};\nconst router = (0,_router__WEBPACK_IMPORTED_MODULE_1__.Router)();\nrouter.on(\"/\", () => {\n  console.log(\"home\");\n},\n// onEnter\nconsole.log(\"[leaving] /home\"),\n//onLeaving\n() => {\n  console.log(\"[coming]/home\"); // onBeforeEnter\n});\n\nrouter.on(\"/contacts\", createRender(\"/contacts\"),\n// onEnter\nconsole.log(\"[leaving] /contacts\"),\n// onLeave\n() => {\n  console.log(\"[coming]/\"); // onBeforeEnter\n});\n\nrouter.on(\"/about\", createRender(\"/about\"), console.log(\"[leaving] /about\"), () => {\n  console.log(\"[coming/about]\");\n});\nrouter.on(\"/about/us\", createRender(\"/about/us\"), console.log(\"[leaving] /about/us\"), () => {\n  console.log(\"[coming/about/us]\");\n});\ndocument.body.addEventListener(\"click\", event => {\n  console.log(\"5\");\n  if (event.target && !event.target.matches(\"a\")) {\n    return;\n  }\n  event.preventDefault();\n  const url = event.target.getAttribute(\"href\");\n  router.go(url);\n});\nwindow.addEventListener(\"popstate\", () => {\n  console.log(\"4\");\n  (0,_history_api__WEBPACK_IMPORTED_MODULE_0__.render)();\n});\n\n//# sourceURL=webpack://router/./src/index.ts?");

/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: function() { return /* binding */ Router; }\n/* harmony export */ });\n/**\n * TODO: modify router.js to support\n * 1. unsubscribe function.\n *    Hint: inside router.js function return unsubscribe function,\n *          which will remove listener by id\n * 2. onLeave callback\n *    Hint: Add 3rd 'onLeave' parameter to Router.on + save in listener object\n *          Check in Router.handleListener if previousPath matches listener\n */\n\n// IMPLEMENTATION\n\n//import { render } from \"./history-api\";\n\n//import { PREFIX } from \"../webpack.config\";\nfunction Router(hash) {\n  let listeners = [];\n  let currentPath = location.pathname;\n  console.log(currentPath);\n  let previousPath = null;\n  const isMatch = (match, path) => match instanceof RegExp && match.test(path) || typeof match === \"function\" && match(path) || typeof match === \"string\" && match === path;\n  const handleListener = ({\n    match,\n    onEnter,\n    onLeave,\n    onBeforeEnter\n  }) => {\n    const args = {\n      currentPath,\n      previousPath,\n      state: history.state\n    };\n    isMatch(match, currentPath) && onEnter(args);\n    console.log(match, currentPath);\n    onLeave && isMatch(match, previousPath) && onLeave();\n    onBeforeEnter && isMatch(match, currentPath) && onBeforeEnter();\n    //console.log(onBeforeEnter);\n  };\n\n  const handleAllListeners = () => listeners.forEach(handleListener);\n  const generateId = () => {\n    const getRandomNumber = () => Math.floor(Math.random() * listeners.length * 1000);\n    const doesExist = id => listeners.find(listener => listener.id === id);\n    let id = getRandomNumber();\n    while (doesExist(id)) {\n      id = getRandomNumber();\n    }\n    return id;\n  };\n  const on = (match, onEnter, onLeave, onBeforeEnter) => {\n    const id = generateId();\n    const listener = {\n      id,\n      match,\n      onEnter,\n      onLeave,\n      onBeforeEnter\n    };\n    listeners.push(listener);\n    console.log(listeners);\n    handleListener(listener);\n    return () => {\n      console.log(\"removed\");\n      listeners = listeners.filter(listener => listener.id !== id);\n    };\n  };\n  const go = (url, state) => {\n    previousPath = currentPath;\n    if (hash === true) {\n      window.location.hash = url;\n    } else {\n      history.pushState(state, url, url);\n      currentPath = location.pathname;\n      handleAllListeners();\n    }\n  };\n\n  // window.addEventListener(\"popstate\", handleAllListeners);\n\n  return {\n    on,\n    go\n  };\n}\n\n//# sourceURL=webpack://router/./src/router.ts?");

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;