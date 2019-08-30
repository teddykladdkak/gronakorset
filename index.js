const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var fs = require('fs');
var mkdirp = require('mkdirp');
var nodemailer = require('nodemailer');
var prompt = require('prompt');
prompt.start();

//Kontrollerar ifall fil existerar
function exists(path, dir){
	var wholepath = __dirname + dir + path;
	if (fs.existsSync(wholepath)) {
		return true;
	}else{
		return false;
	};
};
function getPath(folder, id){
	if(!id || id == ''){var end = '';}else{var end = '/';};
	return __dirname + '/' + folder + '/' + id + end;
};

var startConf = {
	properties: {
		port: {
			description: 'Vilken port ska avnändas?',
			type: 'number',
			default: 3355
		},
		doman: {
			description: 'Vilken domän ska avnändas?',
			type: 'string',
			default: 'http://www.nodomain.se'
		},
		mailfooter: {
			description: 'Önskas kod i footer på mailet?',
			type: 'string',
			default: ''
		}
	}
};

var config;
if(!exists('config.json', '/')){
	prompt.get(startConf, function (err, result) {
		var confToSave = {
			"public": __dirname + "/public",
			"port": result.port,
			"domain": result.doman,
			"mailfooter": result.mailfooter,
			"mainmail": ""
		};
		fs.writeFile('config.json', JSON.stringify(confToSave, null, ' '), (err) => {
			if (err){
				console.log('Kunde inte skapa "./config.json", du behöver skapa denna fil själv för att servern ska fungera.');
			}else{
				console.log('Filen "./config.json" är nu skapad');
				config = confToSave;
				startServer();
			};
		});
	});
}else{
	var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	if(!config || config == ''){
		console.log('Filen "./config.json" kunde inte laddas');
	}else{
		startServer()
	};
};

function startServer(){
	//Kollar IP adress för server.
	function getIPAddress() {
		var interfaces = require('os').networkInterfaces();
		for (var devName in interfaces) {
			var iface = interfaces[devName];
			for (var i = 0; i < iface.length; i++) {
				var alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
				return alias.address;
			};
		};
		return '0.0.0.0';
	};
	var ip = getIPAddress();
	console.log('http://localhost:' + config.port);
	console.log('http://' + ip + ':' + config.port);

	//Datum funktion.
	function addzero(number){if(number <= 9){return "0" + number;}else{return number;};};
	function getDatum(dateannan, timeannan, milisecsave){
		if(!dateannan && !timeannan && !milisecsave){var date = new Date();}else if(!milisecsave){var annatdatum = dateannan.split('-');var annattid = timeannan.split(':');var date = new Date(annatdatum[0], annatdatum[1] - 1, annatdatum[2], annattid[0], annattid[1]);}else{var date = new Date(parseInt(milisecsave));};
		return {"datum": date.getFullYear() + '-' + addzero(date.getMonth() + 1) + '-' + addzero(date.getDate()), "tid": addzero(date.getHours()) + ':' + addzero(date.getMinutes()), "milisec": date.getTime(), "manad": date.getFullYear() + '-' + addzero(date.getMonth() + 1)};
	};
	function daysInMonth(month, year){ 
		return new Date(year, month, 0).getDate(); 
	};
	function nextAndPrevMonth(year, month){
		if(month == '01'){
			var pY = parseInt(year) - 1;
			var pM = '12';
			var nY = year;
			var nM = '02';
		}else if(month == '12'){
			var pY = year;
			var pM = '11';
			var nY = parseInt(year) + 1;
			var nM = '01';
		}else{
			var pY = year;
			var pM = addzero(parseInt(month) - 1);
			var nY = year;
			var nM = addzero(parseInt(month) + 1);
		};
		return {'prev': pY + '-' + pM, 'next': nY + '-' + nM}
	};


	function checkWards(){
		var wardsPath = getPath('wards', '');
		if (!fs.existsSync(wardsPath)) {
			mkdirp(wardsPath, function (err) {
			    if (err) console.error(err)
			});
		};
	};
	checkWards();

	var ids = [];
	function createIDs(){
		var allID = fs.readdirSync(getPath('wards', ''));
		var startval = 10000;
		var endval = 99999;
		var loops = endval - startval;
		var array = [];
		for (var i = 0; i < loops + 1; i++){
			array.push(startval + i);
		};
		for (var i = allID.length - 1; i >= 0; i--) {
			for (var a = array.length - 1; a >= 0; a--) {
				if(allID[i] == array[a]){
					ids.splice(a, 1)
				};
			};
		};
		ids = array;
	};
	createIDs();

	function makeNewId(){
		var indx = Math.floor(Math.random() * ids.length);
		var number = ids[indx];
		ids.splice(indx, 1);
		return number;
	};

	function makeDefault(){
		var data = {};
		for (var i = 0; i < 31; i++){
			data[i+1] = [];
		};
		data.amne = "";
		return data;
	};
	function makeDefFile(path){
		var def = makeDefault();
		fs.writeFileSync(path + getDatum().manad + '.json', JSON.stringify(def, null, ' '));
		return JSON.stringify(def, null, ' ');
	};
	function daysInMonth (month, year) {
	    return new Date(year, month, 0).getDate();
	};
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
	function countColor(array){
		var count = 0;
		for (var a = 0; a < array.length; a++){
			count = count + array[a];
		};
		if(array.length == 0){
			var color = 'white';
		}else{
			var result = Math.round(count / array.length);
			if(result == 0){
				var color = 'green';
			}else if(result == 1){
				var color = 'lightgreen';
			}else if(result == 2){
				var color = 'yellow';
			}else if(result == 3){
				var color = 'orange';
			}else if(result == 4){
				var color = 'red';
			};
		};
		return color;
	};


	//Mail
	//Skapar basfiler som bör ändras innan start!
	var schema = {
		properties: {
			email: {
				pattern: /@gmail.com/,
				message: 'Stödjer enbart Gmail!',
				required: true
			},
			losen: {
				hidden: true,
				message: 'Lösenord',
				required: true
			}
		}
	};
	if(!exists('mailKonto.json', '/')){
		prompt.get(schema, function (err, result) {
			var tosave = {
				service: 'gmail',
				auth: {
					user: result.email,
					pass: result.losen
				}
			};
			fs.writeFile('mailKonto.json', JSON.stringify(tosave, null, ' '), (err) => {
				if (err){
					console.log('Kunde inte skapa "./mailKonto.json", du behöver skapa denna fil själv för att kunna skicka ID till nya användare.');
				}else{
					console.log('Filen "./mailKonto.json" är nu skapad');
					var mailKonto = tosave;
					if(!mailKonto || mailKonto == ''){}else{
						config.mainmail = result.email;
						var transporter = nodemailer.createTransport(mailKonto);
					};
				};
			});
		});
	}else{
		var mailKonto = JSON.parse(fs.readFileSync('mailKonto.json', 'utf8'));
		if(!mailKonto || mailKonto == ''){}else{
			var transporter = nodemailer.createTransport(mailKonto);
			config.mainmail = mailKonto.auth.user;
		};
	};



	function skapaKors(data, datum){
		if(!data || data == ''){
			return '';
		};
		if(!datum || datum == ''){
			var datumSplit = getDatum().manad.split('-');
			var number = daysInMonth(datumSplit[1],datumSplit[0]);
		}else{
			var datumSplit = datum.split('-')
			if(datumSplit[1] >= 13){
				var number = 0;
				datumSplit = ['????', '??'];
			}else{
				var number = daysInMonth(datumSplit[1],datumSplit[0]);
			};
		};
		var innerHMTL = [];
		for (var i = 0; i < 33; i++){
			if(number <= i){
				innerHMTL.push('<td></td>');
			}else{
				var color = countColor(data[i + 1]);
				innerHMTL.push('<td style="background-color: ' + color + '" class="' + numToText(datumSplit[0] + '-' + datumSplit[1] + '-' + addzero(i + 1)) + '">' + (i + 1) + '</td>')
			};
		};
		if(datumSplit[1] >= 13){}else{
			var prevNext = nextAndPrevMonth(datumSplit[0], datumSplit[1]);
		};
		innerHMTL[0] = '<table><tbody><tr><td colspan="7" id="headinput"><input type="text" value="' + data.amne + '" onchange="updateAmne(\'' + datumSplit[0] + '-' + datumSplit[1] + '\', this)"/></td></tr><tr><td onclick="next(\'' + prevNext.prev + '\')"><-</td><td colspan="5">' + datumSplit[0] + '-' + datumSplit[1] + '</td><td onclick="next(\'' + prevNext.next + '\')">-></td></tr><tr><td colspan="2" rowspan="2"></td>' + innerHMTL[0];
		innerHMTL[3] = '<td colspan="2" rowspan="2"></td></tr><tr>' + innerHMTL[3];
		innerHMTL[6] = '</tr><tr>' + innerHMTL[6];
		innerHMTL[13] = '</tr><tr>' + innerHMTL[13];
		innerHMTL[20] = '</tr><tr>' + innerHMTL[20];
		innerHMTL[27] = '</tr><tr><td colspan="2" rowspan="2"></td>' + innerHMTL[27];
		innerHMTL[30] = '<td colspan="2" rowspan="2"></td></tr><tr>' + innerHMTL[30];
		return innerHMTL.join('') + '</tr></tbody></table>';
	};
	const app = express();
	var server = require('http').Server(app);
	var io = require('socket.io')(server);
		app.use(bodyParser.json());
		//Mall kod
		app.engine('html', function (filePath, options, callback) {
			fs.readFile(filePath, function (err, content) {
				if(!options.datum || options.datum == ''){
					var dat = getDatum().manad;
				}else{
					var dat = options.datum;
				};
				if(!options.id || options.id == ''){
					var getAmne = '{Kunde inte hitta ID}';
				}else{
					var path = getPath('wards', options.id);
					var filePath = path + dat + '.json';
					if (fs.existsSync(filePath)) {
						var readData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
						if(readData.amne == ''){
							var getAmne = '{Ämne är inte vald}';
						}else{
							var getAmne = readData.amne;
						};
					}else{
						var def = makeDefault();
						fs.writeFileSync(path + dat + '.json', JSON.stringify(def, null, ' '));
						var readData = def;
						var getAmne = '{Kunde inte hitta sparfil}';
					};
				};
				var korsHMTL = skapaKors(readData, dat);
				var rendered = content.toString()
					.replace('#kors#', korsHMTL)
					.replace('#amne#', getAmne)
				return callback(null, rendered)
			})
		}).set('views', './views').set('view engine', 'html').use(express.static('public'))

		app.get('/nyid.html', function(req, res) {
			var recID =  req.query.mail;
			var id = makeNewId();
			var path = getPath('wards', id);
			if(!recID || recID == '' || recID == undefined){
				console.log('Av någon anledning skickade inte användare med sin mail.')
			}else{
				if(!transporter || transporter == ''){}else{
					var mailOptions = {
						from: config.mainmail,
						to: decodeURI(recID),
						subject: 'Välkommen till GrönaKorset!',
						html: '<h1>Välkommen till GrönaKorset!</h1>' +
							'<p>Spara detta mailet, eller skriv ner ID på säker plats, kan inte återskapas.</p>' +
							'<p style="font-weight: bold;">Ditt ID är: ' + id + '</p>' + 
							'<p><a href="' + config.domain + '/index.html?id=' + id + '">Till GrönaKorset vyn</a><br/><a href="' + config.domain + '/reg.html?id=' + id + '">Till Registrerings vyn</a></p>' +
							config.mailfooter
					};
					transporter.sendMail(mailOptions, function(error, info){
						if (error) {
							console.log(error);
						}else{
							console.log('Email sent: ' + info.response);
						}
					});
				};
			};

			mkdirp(path, function (err) {
			    if (err){ console.error(err) }
			    else {
			    	res.redirect('index.html?id=' + id + '#ny');
			    }
			});
		});
		app.get('/reg.html', function(req, res) {
			var path = getPath('wards', req.query.id);
			if (fs.existsSync(path)) {
				var options = {};
				var filePath = path + getDatum().manad + '.json';
				if (fs.existsSync(filePath)) {
					var readData = fs.readFileSync(filePath, 'utf8');
				}else{
					var readData = makeDefFile(path);
				};
				options.data = JSON.parse(readData);
				if(!req.query.dat || req.query.dat == ''){}else{
					options.datum = req.query.dat;
				};
				options.id = req.query.id;
				res.render('reg', options);
			}else{

			};
		});
		app.get(['/', '/index.html'], function(req, res) {
			if(!req.query.id || req.query.id == ''){
				res.render('index', '')
			}else{
				if(req.query.dat){
					if(req.query.dat.split('-')[0] == '????'){
						res.redirect('/index.html');
						return;
					};
				};
				var path = getPath('wards', req.query.id);
				if (fs.existsSync(path)) {
					var options = {};
					if(!req.query.dat || req.query.dat == ''){
						var filePath = path + getDatum().manad + '.json';
						options.datum = getDatum().manad;
					}else{
						var filePath = path + req.query.dat + '.json';
						options.datum = req.query.dat;
					};
					if (fs.existsSync(filePath)) {
						var readData = fs.readFileSync(filePath, 'utf8');
					}else{
						var readData = makeDefFile(path);
					};
					options.data = JSON.parse(readData);
					options.id = req.query.id;
					res.render('login', options);
				}else{
					//Error kan inte logga in
					res.redirect('index.html');
				};
			};
		});
	app.use(express.static(path.join(__dirname, "public")));

	io.sockets.on('connection', function (socket, username) {
		socket.emit('online', '');
		socket.on('sendreg', function (data) {
			var path = getPath('wards', data.id);
			var filePath = path + getDatum().manad + '.json';
			if (fs.existsSync(filePath)) {
				var readData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
				var datum = getDatum().datum;
				readData[parseInt(datum.split('-')[2])].push(parseInt(data.num));
				var color = countColor(readData[parseInt(datum.split('-')[2])]);
				fs.writeFileSync(path + getDatum().manad + '.json', JSON.stringify(readData, null, ' '));
				socket.emit('registrerat', 'Värde registrerat');
				socket.broadcast.emit('registrerat', {'varde': data.num, 'datum': datum, 'color': color, 'id': data.id});
			};
		});
		socket.on('nyttamne', function (data) {
			var path = getPath('wards', data.id);
			var filePath = path + data.datum + '.json';
			if (fs.existsSync(filePath)) {
				var readData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
				readData.amne = data.amne
				fs.writeFileSync(path + data.datum + '.json', JSON.stringify(readData, null, ' '));
				socket.broadcast.emit('uppdatera', data.id);
			};
		});
	});
	server.listen(config.port);
};