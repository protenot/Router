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
import { iListener, iMatch, iArgs } from "./Types";
export function Router() {
  let listeners: iListener[] = [];
  let currentPath = location.pathname;
  let previousPath: string | null = null;

  const isMatch = (match: iMatch, path: string) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = ({
    match,
    onEnter,
    onLeave,
    onBeforeEnter,
  }: iListener) => {
    const args: iArgs = {
      currentPath,
      previousPath,
      state: history.state,
    };

    onBeforeEnter && isMatch(match, currentPath) && onBeforeEnter();
    console.log(onEnter);
    isMatch(match, currentPath) && onEnter(args);

    onLeave && isMatch(match, previousPath) && onLeave();
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const generateId = () => {
    const getRandomNumber = () =>
      Math.floor(Math.random() * listeners.length * 1000);

    const doesExist = (id: number) =>
      listeners.find((listener) => listener.id === id);

    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };

  const on = (
    match: iMatch,
    onEnter: ((...args: iArgs[]) => () => void) | (() => void),
    onLeave?: (() => string | void) | void,
    onBeforeEnter?: () => string | void,
  ) => {
    const id = generateId();

    const listener: iListener = { id, match, onEnter, onLeave, onBeforeEnter };
    listeners.push(listener);
    console.log(listeners);
    handleListener(listener);

    return () => {
      console.log("removed");
      listeners = listeners.filter((listener) => listener.id !== id);
    };
  };

  const go = (url: string, state?: string) => {
    previousPath = currentPath;

    history.pushState(state, url, url);
    currentPath = location.pathname;

    handleAllListeners();
  };

  // window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}

// USAGE
