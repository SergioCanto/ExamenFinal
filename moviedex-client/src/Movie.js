import React from 'react';
function Movie(props){
return (<div>
{props.lista.map((movies, index) => {
    return (
        <div>
            <h2> {movies.film_title} </h2>
            <p> {movies.rating} </p>
            <p> {movies.year} </p>
        </div>
    )
})}
</div>)
}
export default Movie;