// main.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./offline-uzitrake.js")
      //  .then(reg=>
      //   // console.log('serviceWorker')
      //   )
      .catch((err) => console.log("Error:", err));
  });
}

import { partytownSnippet } from "@builder.io/partytown/integration";

const snippetText = partytownSnippet();
const el = document.createElement("script");
el.innerText = snippetText;
document.body.appendChild(el);
