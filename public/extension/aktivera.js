localStorage.setItem('GRONAKORSET', 'demo');
chrome.runtime.sendMessage({
    "action": "knapptext",
    "text": false
});
location.reload();