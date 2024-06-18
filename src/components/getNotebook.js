import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
const parent = document.getElementById("notebook");
function getNotebook(define) {
  new Runtime().module(define, name => {
    const container = document.createElement("div");
    if (name) {
      container.id = name;
      if (name.startsWith("_")) container.style.display = "none";
    }
    parent.append(container);
    return new Inspector(container);
  });
}
export { getNotebook }
