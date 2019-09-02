localStorage.removeItem('GRONAKORSET');
chrome.runtime.sendMessage({
    "action": "knapptext",
    "text": true
});
location.reload();