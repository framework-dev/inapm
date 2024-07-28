import { Runtime, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import hljs from 'npm:highlightjs';

function getNotebook(notebook, parent) {
  parent.replaceChildren();
  new Runtime().module(notebook, name => {

    const container = document.createElement("div");
    const inspector = new Inspector(container);

    inspector.original = inspector.fulfilled; // preserve default fulfilled

    inspector.fulfilled = (value) => {  // override fulfilled

      // console.log(name, "type: ", typeof value, value); // DEBUG
      // >>> create elements for possible code highlighting
      let pre = document.createElement("pre");
      let code = document.createElement("code");
      code.className = "language-javascript";
      pre.appendChild(code);
      // <<<
      // now parse the possibilities
      if (typeof value === "function") {
        let valueCode = value.toString();
        // the following handles for => arrow and aysnc functions
        if (!valueCode.startsWith("function") && !valueCode.startsWith("async function")) valueCode = `${name} = ${valueCode}`;
        if (name.startsWith("ƒ")) {
          // This code relies on a naming convention that allows the exposure of
          // named cell definitions which are code blocks or expressions.
          // The named call calls a function with same name prefaced by "ƒ"
          // and this ƒfunction contains the code block or expression.
          let blkIdx = valueCode.indexOf("=>");
          if (blkIdx > -1) {
            // get the code block only for arrow functions
            valueCode = valueCode.substring(blkIdx + 2).trimStart();
          } else {
            blkIdx = valueCode.indexOf("{");
            // get the code block for other function defs
            valueCode = valueCode.substring(blkIdx);
          }
          // display these in the their 'reactive' form
          valueCode = name.substring(name.indexOf("ƒ") + 1) + " = " + valueCode;
          // the actual named cell will display with the returned value
          // thanks to unhacked Runtime inspection
        }
        // now both notebook cells that were either 1) already function definitions
        // or 2) named cell code block/expression definitions are properly formatted
        code.innerHTML = escapeHtml(valueCode);
        container.appendChild(pre);
        // if highlighted by Prism (would need js import and css)
        // Prism.highlightElement(code);
        hljs.highlightBlock(code);
      } else {
        // handle literal definitions
        inspector.original(value, name); // do default fulfilled
        if (!(value instanceof Element)) {
          if (["string", "number", "boolean", "bigint", "undefined", "null", "symbol"].includes(typeof value)) {
            code.innerHTML = escapeHtml(container.innerText);
            container.innerText = "";
            container.appendChild(pre);
            // if highlighted by Prism (would need js import and css)
            // Prism.highlightElement(code);
            hljs.highlightBlock(code);
          }
        }
        // If the value was a (literal) object it would slip through to here.
        // If you want an object or array definition code-highlighted, then
        // treat it as you would an expression (extra function using "ƒ" convention).
        // If the value was already an Element (md or html)
        // it slips through to here, with default fulfilled.
      }
      return inspector;
    };

    parent.append(container);

    // TODO make these into configuration options
    // - add id attribute for links true/false
    // - do not display elements derived from names prefixed by <char>
    // for cells with pre-defined names ...
    if (name) {
      // give them an id attribute (for #links)
      container.id = name;
      // pure convention: do not display them if their names start with underscore
      if (name.startsWith("_")) container.style.display = "none";
    }

    return inspector;
  });

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
export { getNotebook }
