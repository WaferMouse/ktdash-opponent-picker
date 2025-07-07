"use strict";

// ==UserScript==
// @name        ktdash-opponent-picker
// @namespace   https://ktdash.app
// @version     1.7.0
// @icon        https://www.google.com/s2/favicons?domain=ktdash.app
// @downloadURL https://github.com/WaferMouse/ktdash-opponent-picker/raw/refs/heads/main/userscript.js
// @updateURL   https://github.com/WaferMouse/ktdash-opponent-picker/raw/refs/heads/main/userscript.js
// @description WIP
// @match       https://ktdash.app/dashboard
// @grant       none
// @run-at      document-end
// ==/UserScript==

var styleSheet = `
.mystyle {
  background: lightblue !important;
}
`;

(function () {
  var wip_enabled = false;
  //wip_enabled = true;
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
  var parent_el = document.getElementById("dashboardopponentmodal");
  var roster_id = parent_el.children[0].children[0].children[1].children[0];
  console.log(roster_id);
  var s = document.createElement('style');
  s.type = "text/css";
  s.innerHTML = styleSheet;
  (document.head || document.documentElement).appendChild(s);

  var roster_id_txt = roster_id.children[1].children[0].textContent;
  roster_id.setAttribute("onClick", "navigator.clipboard.writeText(`" + roster_id_txt + "`)");

  var opponent_selector_container = parent_el.children[0].children[0].children[1].children[1];

  var opponent_selector_title = opponent_selector_container.children[0];
  var opponent_selector = opponent_selector_container.children[1];
  if (wip_enabled) {
    //opponent_selector.classList.add("mystyle");

    /* NOTES
    <input type="text" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" style="font-family: monospace;">
    */
    
    
  };
})();
