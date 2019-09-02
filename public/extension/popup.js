/*let sparasida = document.getElementById('sparasida');
sparasida.onclick = function(element) {
	alert(window.location.href)
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
		tabs[0].id,
		{code: 'console.log(window.location.href);'});
	});
};
chrome.storage.sync.get('color', function(data) {
	sparasida.style.backgroundColor = data.color;
	sparasida.setAttribute('value', data.color);
});
*/
var button = document.getElementById('sparasida');
sparasida.onclick = function(element) {
	chrome.storage.sync.get('url', function(data) {
		console.log(data.url);
		var url = button.getAttribute('data-url');
		data.url.push(url);
		console.log(data);
		chrome.storage.sync.set({'url': data.url}, function() {
			console.log('Lagt till: ' + url);
		});
	});
};

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
  	//alert(request.source)
    button.setAttribute('data-url', request.source);
  }
});

function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      button.value = 'Kan inte lägga till sida';
    }
  });
  chrome.runtime.sendMessage("test");
}

window.onload = onWindowLoad;