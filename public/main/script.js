//OnLoad funktioner
	function loadStart(){
		loadID();
	};
	function loadKors(){
		omNy();
		saveID();
	};
	function loadReg(){
		var rubrik = document.getElementById('efterhand');
		if(!rubrik){
			saveID();
		}else{
			loadRubrik();
		};
	};
	//Funktion som kollar ifall användaren har hashtagen "#ny", om det är sant informeras användaren om att spara ID.
	function omNy(){
		if(location.hash){
			alert('Ditt nya ID är: ' + getUrlParameter('id') + '!\nGlöm inte att skriva upp det, då det inte kan återkallas.');
			window.location.href = window.location.href.split('#')[0];
		};
	};
	//Kollar om ID inte är sparat och existerar, så kommer den sparas. Samt att logga ut knappen visas.
	function saveID(){
		var id = getUrlParameter('id');
		if(!id || id == ''){}else{
			localStorage.setItem('id', id);
			addLoggaUt();
		};
	};
	//Kollar ifall ID finns.
	function loadID(){
		if(!localStorage.getItem('id') || localStorage.getItem('id') == ''){}else{
			document.getElementById('avdid').value = localStorage.getItem('id');
		};
	};

//Knappar
	//Öppnar vyn för gröna korset.
	function loggaIn(){
		var id = document.getElementById('avdid').value;
		window.open(encodeURI('/index.html?id=' + id),'_self')
	};
	//Öppnar vyn för registrering
	function registrering(){
		var id = document.getElementById('avdid').value;
		window.open(encodeURI('/reg.html?id=' + id),'_self')
	};
	//Annropar till servern önskan om att få ett nytt ID.
	function nyID(){
		var mail = document.getElementById('mail');
		if(!mail || mail.value == '' || !mail.value.includes("@")){
			window.open(encodeURI('/nyid.html?id=#ny'),'_self')
		}else{
			window.open(encodeURI('/nyid.html?mail=' + encodeURI(mail.value) + '&id=#ny'),'_self')
		};
	};
	//Bläddrar mellan månader i grönakorset vyn.
	function next(dat){
		window.open(window.location.href.split('.html?')[0] + '.html?id=' + getUrlParameter('id') + '&dat=' + dat,"_self");
	};
	function loggaUT(){
		localStorage.removeItem('id');
		window.open(encodeURI('/index.html'),'_self')
	};
	function tillbaka(){
		window.open(encodeURI('/index.html'),'_self')
	};
	function showHide(visa, dolj){
		document.getElementById(visa).setAttribute('style', 'display: block;');
		document.getElementById(dolj).setAttribute('style', 'display: none;');
	};

//Grundfunktioner
	//Datum funktion.
	function addzero(number){if(number <= 9){return "0" + number;}else{return number;};};
	function getDatum(dateannan, timeannan, milisecsave){
		if(!dateannan && !timeannan && !milisecsave){var date = new Date();}else if(!milisecsave){var annatdatum = dateannan.split('-');var annattid = timeannan.split(':');var date = new Date(annatdatum[0], annatdatum[1] - 1, annatdatum[2], annattid[0], annattid[1]);}else{var date = new Date(parseInt(milisecsave));};
		return {"datum": date.getFullYear() + '-' + addzero(date.getMonth() + 1) + '-' + addzero(date.getDate()), "tid": addzero(date.getHours()) + ':' + addzero(date.getMinutes()), "milisec": date.getTime(), "manad": date.getFullYear() + '-' + addzero(date.getMonth() + 1)};
	};
	//Funktion som tar ut querys ifrån menyn.
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};
	//Ändrar från nummer till text, så det kan användas som id.
	function numToText(num){
		var a = num.split('');
		var re = [];
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i] == 0){re.push('a')}
			else if(a[i] == 1){re.push('b')}
			else if(a[i] == 2){re.push('c')}
			else if(a[i] == 3){re.push('d')}
			else if(a[i] == 4){re.push('e')}
			else if(a[i] == 5){re.push('f')}
			else if(a[i] == 6){re.push('g')}
			else if(a[i] == 7){re.push('h')}
			else if(a[i] == 8){re.push('i')}
			else if(a[i] == 9){re.push('j')}
		};
		return re.join('');
	};
	//Visar logga ut knappen
	function addLoggaUt(){
		document.getElementById('loggaut').setAttribute('style', 'display: inline-block;')
	};
	function removechilds(parent){
		if(parent.hasChildNodes()){
			while (parent.hasChildNodes()) {
				parent.removeChild(parent.firstChild);
			};
		};
	};