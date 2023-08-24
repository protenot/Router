import { render } from "./history-api";
import { Router } from "./router";
import { iArgs } from "./Types";
//import { PREFIX } from "../webpack.config";
const aArray = document.querySelectorAll("a");
console.log(aArray);
aArray.forEach((link) => {
  link.href = "/Router" + link.pathname;
  console.log(aArray[0].href);
});
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
  console.log("5");
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url = (event.target as HTMLElement).getAttribute("href");
  router.go(url);
});

window.addEventListener("popstate", () => {
  console.log("4");
  render();
});
