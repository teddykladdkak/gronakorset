//OnLoad funktioner
	function loadStart(){
		loadID();
		sel('avdid');
	};
	function loadKors(){
		omNy();
		saveID();
	};
	function loadReg(){
		var rubrik = document.getElementById('efterhand');
		if(!rubrik){}else{
			window.location.href = window.location.href.split('?')[0] + '?id=' + localStorage.getItem('id');
		};
	};
	var firstTime = true;
	function connect(){
		if(firstTime){
			document.getElementById('offline').removeAttribute('style');
			firstTime = false;
		}else{
			location.reload();
		};
	};
	function disconnect(){
		document.getElementById('offline').setAttribute('style', 'display: block;');
		//location.reload();
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
	function removeWradLine(elem){
		elem.parentElement.parentElement.removeChild(elem.parentElement);
		var wrapper = document.getElementById('moreWardWrapper');
		if(wrapper.getElementsByTagName('div').length == 0){
			addWardLine()
		};
	};
	function addWardLine(val){
		var wrapper = document.getElementById('moreWardWrapper');
			var line = document.createElement('div');
				var input = document.createElement('input');
					input.setAttribute('type', 'text');
					input.setAttribute('placeholder', 'ID');
					input.setAttribute('maxlength', '5');
					if(!val || val == ''){}else{
						input.setAttribute('value', val);
					};
				line.appendChild(input);
				var button = document.createElement('span');
					button.setAttribute('class', 'button redbutton');
					button.setAttribute('onclick', 'removeWradLine(this);');
					var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
						svg.setAttribute('aria-hidden', 'true');
						svg.setAttribute('class', 'svg');
						svg.setAttribute('role', 'img');
						svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
						svg.setAttribute('viewBox', '0 0 448 512');
						var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
							path.setAttribute('fill', 'currentColor');
							path.setAttribute('d', 'M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z');
						svg.appendChild(path);
					button.appendChild(svg);
					var text = document.createTextNode('Ta bort');
					button.appendChild(text);
				line.appendChild(button);
			wrapper.appendChild(line);
	};

	function addWardLines(){
		if(!localStorage.getItem('gronaKorsetFlera')){

		}else{
			removechilds(document.getElementById('moreWardWrapper'));
			var saveID = localStorage.getItem('gronaKorsetFlera').split(',');
			for (var i = saveID.length - 1; i >= 0; i--) {
				addWardLine(saveID[i]);
			};
		};
	};
//Knappar
	function oppnaFlera(){
		var allWards = [];
		var wrapper = document.getElementById('moreWardWrapper');
			var allLines = wrapper.getElementsByTagName('div');
			for (var i = allLines.length - 1; i >= 0; i--) {
				var input = allLines[i].getElementsByTagName('input')[0];
				if(input.value.split('').length == 5){
					input.removeAttribute('style');
				}else{
					input.setAttribute('style', 'border: solid 3px red;');
					return false;
				}
				allWards.push(input.value);
			};
		localStorage.setItem('gronaKorsetFlera', allWards.join(','));
		window.open(encodeURI('/org.html?id=' + allWards.join(',')),'_self')
	};
	//Öppnar vyn för året
	function openYear(){
		var id = document.getElementById('avdid').value;
		window.open(encodeURI('/year.html?id=' + id),'_self')
	};
	//Öppnar vyn för gröna korset.
	function loggaIn(){
		var id = document.getElementById('avdid').value;
		window.open(encodeURI('/kors.html?id=' + id),'_self')
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
	function sel(id){
		document.getElementById(id).select();
	};
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
	function showVid(link, elem){
		var parent = elem.parentElement;
		removechilds(parent);
		var vid = document.createElement('video');
			vid.setAttribute('width', '100%');
			vid.setAttribute('controls', '');
			var todo = [{'type': 'video/mp4', 'src': '.mp4'}, {'type': 'video/ogg', 'src': '.Ogg'}, {'type': 'video/webm', 'src': '.webm'}];
			for (var i = todo.length - 1; i >= 0; i--) {
				var webm = document.createElement('source');
					webm.setAttribute('src', link + todo[i].src);
					webm.setAttribute('type', todo[i].type);
				vid.appendChild(webm);
			};
			var txt = document.createTextNode('Your browser does not support the video tag.');
			vid.appendChild(txt);
		parent.appendChild(vid);
	};