import { render } from "./history-api";
import { Router } from "./practice";
import { iArgs } from "./Types";
const createRender =
  (content: string) =>
  (...args: iArgs[]) => {
    console.info(`${content} args=${JSON.stringify(args)}`);
    document.getElementById("root").innerHTML = `<h2>${content}</h2>`;
  };
console.log(createRender);
const router = Router();

let unsubscribe = router.on(/.*/, createRender("/.*"));

router.on(
  "/",
  () => {
    console.log("home");
  },

  unsubscribe(),
  () => {
    unsubscribe = router.on(/.*/, createRender("/.*"));
  },
);
router.on(
  (path) => path === "/contacts",
  createRender("/contacts"), // onEnter
  console.log("[leaving] /contacts"), // onLeave
);
router.on("/about", createRender("/about"));
router.on("/about/us", createRender("/about/us"));

document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href");
  router.go(url);
  unsubscribe();
});

window.addEventListener("popstate", () => {
  render();
});
