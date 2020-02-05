let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let movies = mongoose.Schema({
    film_ID: {type: String},
    film_title: {type: String},
    year: {type: Number},
    rating: {type: Number}
});

let Movie = mongoose.model( 'movies', movies  );

let MoviesList = {

    getAll : function(){
        return Movie.find()
        .then( movies => {
            return movies;
        })
        .catch( error => {
            throw Error( error );
        });
    },

    create : function( newMovie ){
        return Movie.create( newMovie )
        .then( movie => {
            return movie;
        })
        .catch( error => {
            throw Error(error);
        });
    },
};

module.exports = {
    MoviesList
};