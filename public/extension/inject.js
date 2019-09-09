if(!localStorage.getItem('GRONAKORSET')){}else{
	var body = document.getElementsByTagName('body')[0];
		var iframe = document.createElement('iframe');
			iframe.setAttribute('src', 'https://gronakorset.teddyprojekt.se/reg.html?id=extention');
			iframe.setAttribute('style', 'min-width: 415px; position: fixed; bottom: 0px; right: 0px; background-color: #FFF;')
		body.appendChild(iframe);
};