// 0. Create a render function for visual debugging purposes
export const render = () => {
  const route = location.pathname;

  document.getElementById("root").innerHTML = `<h2>"${route}" page</h2>`;
  console.log(route);
};

// 1. Handle initial page load
window.addEventListener("load", () => {
  render(); // 👈
});

// 2. Handle history navigations. alternative "window.onpopstate"
window.addEventListener("popstate", (event) => {
  render();
});

// 3. Catch <a> tag clicks + trigger change handler
document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url =
    event.target && (event.target as HTMLElement).getAttribute("href");
  history.pushState({ foo: "bar", url }, document.title, url);
  // history.replaceState({ foo: "bar" }, url, url);
  render(); // 👈
});
