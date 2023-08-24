// 0. Create a render function for visual debugging purposes
//import { PREFIX } from "../webpack.config";
declare const PRODUCTION: boolean;
declare const PREFIX: string;
export const render = () => {
  const route = location.pathname;
  const href = window.location.href;

  document.getElementById("root").innerHTML = `<h2>"${route} page"</h2>`;
  console.log("1 " + route);
};

/*  *
  document.querySelectorAll("a").forEach((link) => {
    link.href = PREFIX + link.pathname;
  });/

// 1. Handle initial page load
window.addEventListener("load", () => {
  render(); // 👈
  console.log("2");
});

 /*    document.querySelectorAll("a").forEach((link) => {
    link.pathname = PREFIX + link.pathname;
  }); */

// 2. Handle history navigations. alternative "window.onpopstate"
/* window.addEventListener("popstate", (event) => {
  render();
  console.log("3")
}); */

// 3. Catch <a> tag clicks + trigger change handler
document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  let url = event.target && (event.target as HTMLElement).getAttribute("href");

  url = "/Router" + url;
  const href = window.location.href;
  /* document.querySelectorAll("a").forEach((link) => {
    link.href = PREFIX + link.pathname;
  }); */
  console.log("url: " + url + "  href: " + href + " route" + location.pathname);
  history.pushState({ foo: "bar", url }, document.title, url);
  console.log(history.state);
  // history.replaceState({ foo: "bar" }, url, url);
  render(); // 👈
  console.log("3 + " + url);
});
