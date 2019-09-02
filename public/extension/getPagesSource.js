var knapp;
if(!localStorage.getItem('GRONAKORSET')){
	knapp = true;
}else{
	knapp = false;
};
chrome.runtime.sendMessage({
    "action": "knapptext",
    "text": knapp
});