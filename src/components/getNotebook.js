import Prism from 'https://cdn.jsdelivr.net/npm/prism-es6@1.2.0/prism.min.js'
import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";

function getNotebook(notebook, parent) {
  parent.replaceChildren();
  new Runtime().module(notebook, name => {

    const container = document.createElement("div");
    const inspector = new Inspector(container);

    inspector.original = inspector.fulfilled; // preserve default fulfilled

    inspector.fulfilled = (value) => {  // override fulfilled

      inspector.original(value, name); // do default fulfilled

      // console.log("name, value, type:", name, value, typeof value);
      if (typeof value === 'function') { // handle functions only
        const pre = document.createElement("pre");
        pre.className = 'language-javascript';
        const code = document.createElement("code");
        code.className = 'language-javascript';
        let valueCode = value.toString();
        if (!valueCode.startsWith("function")) valueCode = `${name} = ${valueCode}`;
        // console.log(value.toString()); // DEBUG
        code.innerHTML = valueCode; // DEBUG value.toString();
        pre.appendChild(code);
        container.appendChild(pre);
        Prism.highlightElement(pre); // syntax highlight
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
