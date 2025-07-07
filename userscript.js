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

function makeRow() {
  const this_el = document.createElement("div");
  this_el.classList.add("row");
  return(this_el);
}

function makeCol() {
  const this_el = document.createElement("div");
  this_el.classList.add("col-6");
  return(this_el);
}

(function () {
  var wip_enabled = false;
  wip_enabled = true;
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
    const super_container = opponent_selector_container.parentElement;

    const opponent_name_row = makeRow();
    super_container.appendChild(opponent_name_row);

    const opponent_name_title = makeCol();
    opponent_name_row.appendChild(opponent_name_title);
    opponent_name_title.textContent = "Opponent username:";

    const opponent_name_input = document.createElement("div");
    opponent_name_row.appendChild(opponent_name_input);
    opponent_name_input.innerHTML = `<input type="text" class="form-control" id="opponent_uname">`;

    const opponent_name_btn = document.createElement("button");
    opponent_name_row.appendChild(opponent_name_btn);
    opponent_name_btn.innerHTML = `<button type="button" class="btn btn-primary" id="uname_lookup_btn">Find user</button>`;

    const opponent_team_row = makeRow();
    super_container.appendChild(opponent_team_row);

    const opponent_team_title = makeCol();
    opponent_team_row.appendChild(opponent_team_title)
    opponent_team_title.textContent = "Select opponent team:";

    const opponent_team_selector = document.createElement("div");
    opponent_team_row.appendChild(opponent_team_selector);

    const opponent_team_input = document.createElement("select");
    opponent_team_selector.appendChild(opponent_team_input);

    opponent_team_input.outerHTML = `
      <select class="form-control oswald" id="opponent_team_select">
        <option value="? object:null ?" selected="selected"></option>
      </select>
    `
    /*
      <option class="ng-binding ng-scope" value="object:174">
        Angels Of Death (kt24)
      </option>
  */

    //<button type="button" class="btn btn-primary">Confirm</button>
  };

})();
