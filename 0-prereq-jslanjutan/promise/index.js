const url = 'http://www.omdbapi.com/?apikey=14495380&s='


function getMovies() {
    return fetch(url + 'avengers')
        .then(response => response.json())
        .then(response => response.Search)
}

function getSpiderman() {
    return fetch(url + 'spiderman')
        .then(response => response.json())
        .then(response => response.Search)
}

async function getData() {
    const spiderman = await getSpiderman()
    const movies = await getMovies()
    return [spiderman, movies]
}

getData()
    .then(data => console.log(...data))

