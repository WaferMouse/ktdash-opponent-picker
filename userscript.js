"use strict";

// ==UserScript==
// @name        ktdash-opponent-picker
// @namespace   https://ktdash.app
// @version     0.9
// @icon        https://www.google.com/s2/favicons?domain=ktdash.app
// @downloadURL https://github.com/WaferMouse/ktdash-opponent-picker/raw/refs/heads/main/userscript.js
// @updateURL   https://github.com/WaferMouse/ktdash-opponent-picker/raw/refs/heads/main/userscript.js
// @description Adds a nicer dialogue to select an opponent roster based on their username
// @match       https://ktdash.app/dashboard
// @grant       none
// @run-at      document-end
// ==/UserScript==

var styleSheet = `
.mystyle {
  background: lightblue !important;
}
`;

function retrieveTeams(){
  var uname = document.getElementById("opponent_uname").value;
  var output_el = document.getElementById("opponent_team_select");
  var apiUrl = "https://ktdash.app/api/user.php?username=" + uname;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Display data in an HTML element
      
      while (output_el.firstChild) {
        output_el.removeChild(output_el.lastChild);
      }

      data["rosters"].forEach(element => {
        var this_opt = document.createElement("option");
        this_opt.value = element["rosterid"];
        this_opt.text = element["rostername"];
        output_el.appendChild(this_opt);
      });
      return;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

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
  var js = document.createElement("script");
  js.textContent = `
    function teamChanged(){
      var parent_el = document.getElementById("dashboardopponentmodal");
      var opponent_selector_container = parent_el.children[0].children[0].children[1].children[1];
      var opponent_selector = opponent_selector_container.children[1].children[0];
      var opponent_team_select = document.getElementById("opponent_team_select");
      var this_val = opponent_team_select.value;
      opponent_selector.value = this_val;
      var class_list = ["ng-valid", "ng-not-empty", "ng-touched", "ng-dirty", "ng-valid-parse", "form_control"];
      opponent_selector.className = "";
      class_list.forEach(element => {
        opponent_selector.classList.add(element);
      });
      opponent_selector.dispatchEvent(new Event('change'));
    }
  `;
  document.head.appendChild(js);
  var parent_el = document.getElementById("dashboardopponentmodal");
  var roster_id = parent_el.children[0].children[0].children[1].children[0];
  var s = document.createElement('style');
  s.type = "text/css";
  s.innerHTML = styleSheet;
  (document.head || document.documentElement).appendChild(s);

  var roster_id_txt = roster_id.children[1].children[0].textContent;
  roster_id.setAttribute("onClick", "navigator.clipboard.writeText(`" + roster_id_txt + "`)");

  var opponent_selector_container = parent_el.children[0].children[0].children[1].children[1];

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

  const btn_col = makeCol()
  opponent_name_row.appendChild(btn_col);
  
  const opponent_name_btn = document.createElement("button");
  btn_col.appendChild(opponent_name_btn);
  opponent_name_btn.classList.add("btn");
  opponent_name_btn.classList.add("btn-primary");
  opponent_name_btn.id = "uname_lookup_btn";
  opponent_name_btn.textContent = "Find user";
  opponent_name_btn.onclick = function() {
    retrieveTeams();
  };

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
    <select class="form-control oswald" id="opponent_team_select" onchange="teamChanged()">
      <option value="? object:null ?" selected="selected"></option>
    </select>
  `
  
  /*
    <option class="ng-binding ng-scope" value="object:174">
      Angels Of Death (kt24)
    </option>

    <input type="text" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" style="font-family: monospace;" ng-model="dashboardopponentrosterid">
    <input type="text" class="form-control ng-valid ng-not-empty ng-touched ng-dirty ng-valid-parse" style="font-family: monospace;" ng-model="dashboardopponentrosterid">
  */

})();
