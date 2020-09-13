var editor = "";
function afterJS() {
  try {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    editor.session.setMode(new JavaScriptMode())
    getHost();

    document.querySelector("button").onclick = function () {
      saveScript();
      pageReload();
    }
  } catch (err) {}
}

function pageReload() {
  try {
    chrome.tabs.query({
      active: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT
    },
    function (tabs) {
      try {
        var {
          id: tabId
        } = tabs[0].url;
        var code = "window.location.reload()";
        chrome.tabs.executeScript(tabId, {
          code
        },function() {
          window.close();
        });
      } catch (err) {}
    }
  );
  }catch(err) {}
}
function getHost() {
  try {
    chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
      },
      function (tabs) {
        try {
          var {
            id: tabId
          } = tabs[0].url;
          var code = "window.location.host";
          chrome.tabs.executeScript(tabId, {
            code
          }, function (result) {
            document.querySelector(".js-implementer h1").innerHTML = "JS Implementer - " + result;
            getLocaleJS();
          });
        } catch (err) {}
      }
    );
  } catch (err) {}
}

function getLocaleJS() {
  try {
    chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
      },
      function (tabs) {
        try {
          var {
            id: tabId
          } = tabs[0].url;
          var code = 'if (localStorage["js_implementer"]) {eval(atob(localStorage["js_implementer"]));atob(localStorage["js_implementer"]);}';
          chrome.tabs.executeScript(tabId, {
            code
          }, function (result) {
            editor.setValue(result[0])
          });
        } catch (err) {}
      }
    );
  } catch (err) {}
}

function saveScript() {
  try {
    var currentCode = editor.getValue();
    chrome.tabs.query({
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
      },
      function (tabs) {
        try {
          var {
            id: tabId
          } = tabs[0].url;
          var code = "localStorage['js_implementer']='" + btoa(unescape(encodeURIComponent(currentCode))) + "'";
          chrome.tabs.executeScript(tabId, {
            code
          });
        } catch (err) {}
      }
    );
  } catch (err) {}
}

function ready(afterJS) {
  try {
    if (document.readyState != "loading" && document.querySelectorAll("#editor").length > 0) {
      afterJS();
    } else {
      document.addEventListener("DOMContentLoaded", afterJS);
    }
  } catch (err) {}
}
ready(afterJS);