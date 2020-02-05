let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );
let jsonParser = bodyParser.json();
let {MoviesList} = require( './model');
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

/* Tu código va aquí */

app.get( '/api/moviedex', ( req, res ) => {
	MoviesList.getAll()
		.then( moviesList => {
			return res.status( 200 ).json( moviesList );
		})
		.catch( error => {
			console.log(error);
			res.statusMessage = "Hubo un error de conexion con la BD."
			return res.status( 500 ).send();
		});
});

app.post( '/api/moviedex', jsonParser, ( req, res ) =>{
	let film_title = req.body.film_title;
	let year = req.body.year;
	let rating = req.body.rating;
	let film_ID = uuid.v4();

	if(film_title == undefined || year == undefined || rating == undefined || film_ID == undefined){
		res.statusMessage = "Hacen falta parámetros.";
		return res.status( 406 ).send();
	}
	else{
		let newMovie = {
			film_ID,
			film_title,
			year,
			rating
		};
		MoviesList.create( newMovie )
			.then( movie => {
				return res.status( 201 ).json( movie );
			})
			.catch( error => {
				res.statusMessage = "Hubo un error de conexion con la BD.";
				return res.status( 500 ).json( error );
			});
	}	
});

let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}