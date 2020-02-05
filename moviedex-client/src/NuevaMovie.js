import React from 'react';

function NuevaMovie(props){
    function click(event){
        event.preventDefault();
        let nuevaMovie = {
            film_title : event.target.title.value,
            year : event.target.year.value,
            rating : event.target.rating.value
    };
    
    props.agregaMovie(nuevaMovie);

    }
    return (
    <form onSubmit={(event) => click(event)} id='movieForm'>
        <label htmlFor='movieNueva'> Title : </label>
        <input name='title' type='text' id='title' />
        <label htmlFor='movieNueva'> Year : </label>
        <input name='year' type='text' id='year' />
        <label htmlFor='movieNueva'> Rating : </label>
        <input name='rating' type='text' id='rating' />
        <button type='submit'>
        Add
        </button>
    </form>
    )
}
export default NuevaMovie;