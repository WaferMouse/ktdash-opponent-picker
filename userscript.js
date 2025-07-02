"use strict";

// ==UserScript==
// @name        ktdash-opponent-picker
// @namespace   https://ktdash.app
// @version     1.7.0
// @icon        https://www.google.com/s2/favicons?domain=ktdash.app
// @downloadURL https://github.com/WaferMouse/ktdash-opponent-picker/raw/refs/heads/main/userscript.js
// @updateURL   https://github.com/WaferMouse/ktdash-opponent-picker/raw/refs/heads/main/userscript.js
// @description WIP
// @match       https://ktdash.app/u/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

var styleSheet = `
.ng-binding[title='View Roster'] {
  text-transform: none !important;
}
`;

(function () {
  /*
  var s = document.createElement('style');
  s.type = "text/css";
  s.innerHTML = styleSheet;
  (document.head || document.documentElement).appendChild(s);
  document.querySelectorAll(".ng-binding[title='View Roster']").forEach(function (i) {
    var b = i.parentElement.parentElement.parentElement.parentElement.children[1].children[0];
    b.innerHTML = `<div onClick='navigator.clipboard.writeText("` +
      i.href.substring(21) +
      `")'>RosterID: <u>` +
      i.href.substring(21) +
      `</u></div>` + b.innerHTML;
  });
  */
})();
