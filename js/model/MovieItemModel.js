import APIDataModel from "./APIModel.js";

class Movie extends APIDataModel{
    constructor(id,title,poster,overview,link, favorite, rating){
        super();
        this.id = id;
        this.title = title;
        this.poster = poster;
        this.overview = overview;
        this.link =link;      
        this.favorite = favorite;
        this.rating = rating;
    }
    

    getDetailApiUrl(movie_id,key){
        return this.generateApiPath(this.detail_path, movie_id,key);     
    }
    
    getVideosApiUrl(movie_id,key){
        return this.generateApiPath(this.videos_path, movie_id,key);
    }

    generateApiPath(raw_Url, movie_id,key){
        return this.rootURL + raw_Url.replace("{movie_id}",movie_id).replace("<<api_key>>",key);
    }

    async fetchMovieDetail(movie_id,key){

        //Detail Information
        const fetchedJson =  await fetch(this.getDetailApiUrl(movie_id,key));
        const jsonResult = await fetchedJson.json();

        //List of Videos
        const fetchVideoResult = await fetch(this.getVideosApiUrl(movie_id, key));
        const videoJsonData = await fetchVideoResult.json();
        const videoArray = videoJsonData.results;
        //console.log("videoData ", videoJsonData.results);
        return this.updateData(jsonResult, videoArray);
            
    }


    updateData(data, videos){
        //console.log(data);
        this.id = data.id;
        this.title = data["original_title"];
        this.poster = data["poster_path"];
        this.overview = data["overview"];
        this.videos = videos;
        return this;
    }

}

export default Movie;