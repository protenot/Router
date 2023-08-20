import { render } from "./history-api";
import { Router } from "./practice";
import { iArgs } from "./Types";

const createRender =
  (content: string) =>
  (...args: iArgs[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);

    document.getElementById("root").innerHTML = `<h2>${content}</h2>`;
    console.log(content);
  };

const router = Router();

router.on(
  "/",
  () => {
    console.log("home");
  }, // onEnter
  console.log("[leaving] /home"), //onLeaving
  () => {
    console.log("[coming]/home"); // onBeforeEnter
  },
);
router.on(
  "/contacts",
  createRender("/contacts"), // onEnter
  console.log("[leaving] /contacts"), // onLeave
  () => {
    console.log("[coming]/"); // onBeforeEnter
  },
);

router.on(
  "/about",
  createRender("/about"),
  console.log("[leaving] /about"),
  () => {
    console.log("[coming/about]");
  },
);
router.on(
  "/about/us",
  createRender("/about/us"),
  console.log("[leaving] /about/us"),
  () => {
    console.log("[coming/about/us]");
  },
);

document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href");
  router.go(url);
  //unsubscribe();
});

window.addEventListener("popstate", () => {
  render();
});
