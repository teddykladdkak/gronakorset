chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get(['url'], function(data) {
		if(!data || data == ''){
			chrome.storage.sync.set({'url': []}, function() {
				console.log("Array skapas.");
			});
		}else{
			console.log("Array finns.");
		};
	});
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
        	new chrome.declarativeContent.PageStateMatcher({
          		pageUrl: {hostContains: '.'},
        	})
        ],
		actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});