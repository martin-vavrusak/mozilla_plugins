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
  onAttach: function() {
      button.disabled = false;
      button.icon = {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
        };
  }
});

//Register listener
tabs.on('activate', tabAccessed);

//button.disabled = true;

function handleClick(state) {
  tabs.open("https://www.mozilla.org/");
  button.icon = {
    "16": "./icon-16_inactive.png",
    "32": "./icon-32_inactive.png",
    "64": "./icon-64_inactive.png"
    };
  button.disabled = true;
}

function pageReady(tab){
    console.log("Page is ready.");
}

function tabAccessed(tab){
    console.log(tab.readyState);
    console.log(tab.readyState === 'uninitialized');
    console.log("Tab: " + tab.url + " is activated");
    
    if(tab.readyState !== 'complete'){
        //register listener for loading finish time
        tabs.on('ready', pageReady);
    }
}

function tabDeAccessed(){
    
}

function tabDeAccessed(tab){
    
}