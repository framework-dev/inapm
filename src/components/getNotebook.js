import Prism from 'https://cdn.jsdelivr.net/npm/prism-es6@1.2.0/prism.min.js'
import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";

function getNotebook(notebook, parent) {
  parent.replaceChildren();
  new Runtime().module(notebook, name => {

    const container = document.createElement("div");
    const inspector = new Inspector(container);

    inspector.original = inspector.fulfilled; // preserve default fulfilled

    inspector.fulfilled = (value) => {  // override fulfilled

      // console.log(name, "type: ", typeof value, value); // DEBUG
      // >>> create elements for code highlighting
      let pre = document.createElement("pre");
      pre.className = 'language-javascript';
      let code = document.createElement("code");
      code.className = 'language-javascript';
      pre.appendChild(code);
      // <<<
      // now parse the possibilities
      if (typeof value === 'function') {
        let valueCode = value.toString();
        // this allows for => arrow functions
        if (!valueCode.startsWith("function")) valueCode = `${name} = ${valueCode}`;
        // console.log("before ƒ:", valueCode); // DEBUG
        if (name.startsWith("ƒ")) {
          let blkIdx = valueCode.indexOf("=>");
          if (blkIdx > -1) {
            valueCode = valueCode.substring(blkIdx + 3);
          } else {
            blkIdx = valueCode.indexOf("{");
            // console.log("non-arrow:", valueCode); // DEBUG
            valueCode = valueCode.substring(blkIdx);
          }
          valueCode = name.substring(name.indexOf("ƒ") + 1) + " = " + valueCode;
        }
        code.innerHTML = valueCode;
        container.appendChild(pre);
        Prism.highlightElement(pre); // syntax highlight
      } else {
        inspector.original(value, name); //  if not function: do default fulfilled
        if (!(value instanceof Element)) {
          if (typeof value === "string" || typeof value === 'number' || typeof value === 'boolean') {
            code.innerHTML = container.innerHTML;
            container.innerHTML = "";
            container.appendChild(pre);
            Prism.highlightElement(pre);
          }
        }
      }
      return inspector;
    };

    parent.append(container);

    // TODO turn these into configuration options
    // for cells with defined names ...
    if (name) {
      // give them an id attribute (for #links)
      container.id = name;
      // do not display them if their names start with underscore
      if (name.startsWith("_")) container.style.display = "none";
    }

    return inspector;
  });
}
export { getNotebook }
