import APIDataModel from "./APIModel.js";


class MovieListModel extends APIDataModel {

    getUpcomingApiUrl(key) {
        return this.rootURL + this.upcoming_path.replace("<<api_key>>", key);
    }

    // fetchUpcomingMovie(key){
    //     return fetch(this.getUpcomingApiUrl(key))
    //         .then(res => res.json())
    //         .then(data=> data.results);
    // }

    async fetchUpcomingMovie(key) {
        const fetchedResult = await fetch(this.getUpcomingApiUrl(key));
        const jsonResult = await fetchedResult.json();

        //this is for favorite icon
        var favoriteArray = [];
        var favoriteString = localStorage.getItem('favorite');
        if (favoriteString) {
            favoriteArray = JSON.parse(favoriteString);
        }

        for (let i = 0; i < jsonResult.results.length; i++) {
            for (let item of favoriteArray) {
                if (parseInt(item) === jsonResult.results[i].id) {
                    jsonResult.results[i]["favorite"] = true;
                }
            }
        }

        //this is for rating icon
        var ratingArray = [];
        var ratingString = localStorage.getItem('rating');
        if (ratingString) {
            ratingArray = JSON.parse(ratingString);
        }


       

        for (let i = 0; i < jsonResult.results.length; i++) {
            for (let item of ratingArray) {

                console.log(item.id);

                // let ratingStart = 1;
                // let ratingEnd = 4;
                // let ratings = Array(ratingEnd - ratingStart + 1)
                //     .fill()
                //     .map(() => ratingStart++);


                if (parseInt(item.id) === jsonResult.results[i].id) {
                    jsonResult.results[i]["rating"] = item.number;
                }
            }
        }

        console.log(jsonResult.results);
        return jsonResult.results;

    }

}

export default MovieListModel;