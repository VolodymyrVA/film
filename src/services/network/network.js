class Network {
    constructor(){
        this.api = {
            filmList: '../fake-server/film-list.json',
            filmPage: '../fake-server/films/'
        }
    }

    createRequest(url){
        let promis = new Promise((resolve, reject) => {
                let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                this.parseResponse( resolve, reject, xhttp)
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        });

        return promis;
    }

    parseResponse(resolve, reject, xhttp){
        if (xhttp.readyState == 4) {
            if (xhttp.responseText) {
                let parseResponseText = JSON.parse(xhttp.responseText);
                resolve(parseResponseText);
            } else {
                reject(`HTTP error, status ${xhttp.status}`)
            }
        }
    }


    getFilmList(){
        let url = this.api.filmList;
        return this.createRequest(url);
    }

    getFilmPage(filmId){
        let url = this.api.filmPage + filmId + '.json';
        return this.createRequest(url);
    }
}

let network = new Network();

export default network
