chrome.runtime.sendMessage({
    action: "getSource",
    source: window.location.href
});