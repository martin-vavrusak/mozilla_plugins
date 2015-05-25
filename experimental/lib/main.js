var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

//Enable button when facebook page loads
pageMod.PageMod({
  include: "*.facebook.com",
  onAttach: activateButton
});

//Register listeners
//when clicked on tab
tabs.on('activate', tabAccessed);
//when clicked to another tab (tab focus change)
tabs.on('deactivate', tabDeAccessed);

//button.disabled = true;

//Enable button and set icon
function activateButton(){
      console.log();
      button.disabled = false;
      button.icon = {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
        };
}

//Disable button and set icon.
function deactivateButton(){
  button.icon = {
    "16": "./icon-16_inactive.png",
    "32": "./icon-32_inactive.png",
    "64": "./icon-64_inactive.png"
    };
  button.disabled = true;
}

//When clicked on tool icon
function handleClick(state) {
  deactivateButton();
  tabs.open("https://www.mozilla.org/");
}

function pageReady(tab){
    console.log("Page: " + tab.title + " is ready.");
    tab.url
}

function tabAccessed(tab){
    console.log(tab.readyState);
    //console.log(tab.readyState === 'uninitialized');
    console.log("Tab: " + tab.url + " is activated");
    
    if(tab.readyState !== 'complete'){
        //register listener for loading finish time
        tabs.on('ready', pageReady);
    }
}

function tabDeAccessed(tab){
    console.log("Leaving tab.");
    deactivateButton();
}