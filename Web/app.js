var express = require('express');
var models = require('./models');
var app = express();

// Setting for app here
app.use(express.static(__dirname + '/public'));
var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	pagesDir		: __dirname + '/views/pages/',
	helpers			: {
		paginate: paginateHelper.createPagination
	}
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var customer = require('./routes/customer');
// app.use('/customer', customers);
// var product = require('./routes/product');
// app.use('/product', product);
// var productdetail = require('./routes/productdetail');
// app.use('/productdetail', productdetails);
// var transaction = require('./routes/transaction');
// app.use('/transaction', transactions);
// var type = require('./routes/type');
// app.use('/type', types);


// Define your routes here
app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});

// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});
