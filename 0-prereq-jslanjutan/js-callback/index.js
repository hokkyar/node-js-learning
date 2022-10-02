// CALLBACK using jquery

function getMovie(url) {
    $.ajax({
        url: url,
        success: (results) => {
            let cards = ''
            results.Search.forEach((m) => {
                cards += `
            <div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary">Detail</a>
                    </div>
                </div>
            </div>
            `
            })
            $('.movie-container').html(cards)
        },
        error: (e) => console.log(e)
    })
}

$('#search').on('keyup', (e) => {
    if (e.keyCode === 13) {
        let url = 'http://www.omdbapi.com/?apikey=14495380&s='
        url += e.target.value
        getMovie(url)
    }
})



