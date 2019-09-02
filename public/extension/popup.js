var button = document.getElementById('sparasida');
chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "knapptext") {
		if(request.text){
			button.setAttribute('value', 'Aktivera');
			button.setAttribute('data-todo', 'aktivera');
		}else{
			button.setAttribute('value', 'Av aktivera');
			button.setAttribute('data-todo', 'avaktivera');
		};
	};
});
function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    if (chrome.runtime.lastError) {
      button.value = 'Kan inte lägga till sida';
    }
  });
}
button.onclick = function(element) {
	if(button.getAttribute('data-todo') == 'aktivera'){
		chrome.tabs.executeScript(null, {
			file: "aktivera.js"
		}, function() {
			if (chrome.runtime.lastError) {
				button.value = 'Kan inte lägga till sida';
			}
		});
	}else if(button.getAttribute('data-todo') == 'avaktivera'){
		chrome.tabs.executeScript(null, {
			file: "deaktivera.js"
		}, function() {
			if (chrome.runtime.lastError) {
				button.value = 'Kan inte lägga till sida';
			}
		});
	}else{
		console.log('Något gick fel...')
	};
};
window.onload = onWindowLoad;