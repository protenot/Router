// 0. Create a render function for visual debugging purposes
const renderHash = () => {
  const route = location.hash.replace("#", "") || "/";
  document.getElementById("root").innerHTML = `<h2>"${route}" page</h2>`;
};

// 1. Handle initial page load
window.addEventListener("load", () => {
  renderHash(); // 👈
});

// 2. Handle hash changes
window.addEventListener("hashchange", () => {
  renderHash(); // 👈
});

// 3. Catch <a> tag clicks
document.body.addEventListener("click", (event) => {
  if (event.target && !(event.target as HTMLElement).matches("a")) {
    return;
  }
  event.preventDefault();
  const url =
    event.target && (event.target as HTMLElement).getAttribute("href");
  location.hash = url; // doesn't reload page
  // location.href = url; // reloads page
  // location.replace(url); // reloads page
});
