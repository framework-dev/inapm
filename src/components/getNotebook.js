import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";

const parent = document.getElementById("notebook-div");
parent.replaceChildren();

function getNotebook(notebook) {
  new Runtime().module(notebook, name => {

    const container = document.createElement("div");
    const inspector = new Inspector(container);

    inspector.original = inspector.fulfilled; // preserve default fulfilled

    inspector.fulfilled = (value) => {  // override fulfilled

      inspector.original(value, name); // do default fulfilled

      // console.log("name, value, type:", name, value, typeof value);
      if (typeof value === 'function') { // handle functions only
        const pre = document.createElement("pre");
        pre.innerText = value.toString();
        container.appendChild(pre);
      }
    };

    parent.append(container);

    // TODO make these configuration options for this code
    // for cells with defined names ...
    if (name) {
      // give them an id attribute (for #links)
      container.id = name;
      // console.log("name:", name);
      // do not display them if their names start with underscore
      if (name.startsWith("_")) container.style.display = "none";
    }

    return inspector;
  });
}
export { getNotebook }
