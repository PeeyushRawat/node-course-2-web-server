const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var nowv = new Date().toString();
	var log = `${nowv}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log');
		}
	})
	next();
});

app.use((req, res, next) => {
	res.render('maintain.hbs');
});

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();	
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name: 'Peeyush rawat',
	// 	likes: [
	// 		'coding',
	// 		'football'
	// 	]
	// });
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website'
	});
});

app.get('/about', (req, res) => {
	// res.send('About Page');
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Error handling request'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});