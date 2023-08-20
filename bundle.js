/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/history-api.ts":
/*!****************************!*\
  !*** ./src/history-api.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; }
/* harmony export */ });
// 0. Create a render function for visual debugging purposes
const render = () => {
  const route = location.pathname;
  document.getElementById("root").innerHTML = `<h2>"${route} page"</h2>`;
  console.log("1" + route);
};

// 1. Handle initial page load
window.addEventListener("load", () => {
  render(); // 👈
  console.log("2");
});

// 2. Handle history navigations. alternative "window.onpopstate"
/* window.addEventListener("popstate", (event) => {
  render();
  console.log("3")
}); */

// 3. Catch <a> tag clicks + trigger change handler
document.body.addEventListener("click", event => {
  if (event.target && !event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target && event.target.getAttribute("href");
  history.pushState({
    foo: "bar",
    url
  }, document.title, url);
  console.log(history.state);
  // history.replaceState({ foo: "bar" }, url, url);
  render(); // 👈
  console.log("3");
});

/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Router: function() { return /* binding */ Router; }
/* harmony export */ });
/**
 * TODO: modify router.js to support
 * 1. unsubscribe function.
 *    Hint: inside router.js function return unsubscribe function,
 *          which will remove listener by id
 * 2. onLeave callback
 *    Hint: Add 3rd 'onLeave' parameter to Router.on + save in listener object
 *          Check in Router.handleListener if previousPath matches listener
 */

// IMPLEMENTATION

//import { render } from "./history-api";

function Router(hash) {
  let listeners = [];
  let currentPath = location.pathname;
  let previousPath = null;
  const isMatch = (match, path) => match instanceof RegExp && match.test(path) || typeof match === "function" && match(path) || typeof match === "string" && match === path;
  const handleListener = ({
    match,
    onEnter,
    onLeave,
    onBeforeEnter
  }) => {
    const args = {
      currentPath,
      previousPath,
      state: history.state
    };
    isMatch(match, currentPath) && onEnter(args);
    onLeave && isMatch(match, previousPath) && onLeave();
    onBeforeEnter && isMatch(match, currentPath) && onBeforeEnter();
    //console.log(onBeforeEnter);
  };

  const handleAllListeners = () => listeners.forEach(handleListener);
  const generateId = () => {
    const getRandomNumber = () => Math.floor(Math.random() * listeners.length * 1000);
    const doesExist = id => listeners.find(listener => listener.id === id);
    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };
  const on = (match, onEnter, onLeave, onBeforeEnter) => {
    const id = generateId();
    const listener = {
      id,
      match,
      onEnter,
      onLeave,
      onBeforeEnter
    };
    listeners.push(listener);
    console.log(listeners);
    handleListener(listener);
    return () => {
      console.log("removed");
      listeners = listeners.filter(listener => listener.id !== id);
    };
  };
  const go = (url, state) => {
    previousPath = currentPath;
    if (hash === true) {
      window.location.hash = url;
    } else {
      history.pushState(state, url, url);
      currentPath = location.pathname;
      handleAllListeners();
    }
  };

  // window.addEventListener("popstate", handleAllListeners);

  return {
    on,
    go
  };
}

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _history_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./history-api */ "./src/history-api.ts");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./src/router.ts");


const createRender = content => (...args) => {
  console.info(`${content} args=${JSON.stringify(args)}`);
  document.getElementById("root").innerHTML = `<h2>${content}</h2>`;
  console.log(content);
};
const router = (0,_router__WEBPACK_IMPORTED_MODULE_1__.Router)();
router.on("/", () => {
  console.log("home");
},
// onEnter
console.log("[leaving] /home"),
//onLeaving
() => {
  console.log("[coming]/home"); // onBeforeEnter
});

router.on("/contacts", createRender("/contacts"),
// onEnter
console.log("[leaving] /contacts"),
// onLeave
() => {
  console.log("[coming]/"); // onBeforeEnter
});

router.on("/about", createRender("/about"), console.log("[leaving] /about"), () => {
  console.log("[coming/about]");
});
router.on("/about/us", createRender("/about/us"), console.log("[leaving] /about/us"), () => {
  console.log("[coming/about/us]");
});
document.body.addEventListener("click", event => {
  console.log("5");
  if (event.target && !event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target.getAttribute("href");
  router.go(url);
});
window.addEventListener("popstate", () => {
  console.log("4");
  (0,_history_api__WEBPACK_IMPORTED_MODULE_0__.render)();
});
}();
/******/ })()
;