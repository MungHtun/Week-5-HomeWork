class MovieListView {
    constructor(controller){
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-detail-template").innerHTML;
        this.viewport = document.getElementById("viewport");        
        this.videoTemplate = document.getElementById("youtube-video-template").innerHTML;
        this.viewport.addEventListener('click',(event)=>this.listViewBtnListener(event));
        this.home = document.getElementById("home");     
        this.home.addEventListener('click', (event) => this.homeViewBtnListener(event));
    }

    homeViewBtnListener(event){
        event.preventDefault();
        //const targetEle = event.target;      
                
        this.controller.changeListView();
    
    }

    listViewBtnListener(event){
        event.preventDefault();
        const targetEle = event.target;        
                
        if(targetEle && targetEle.parentNode.classList.contains('list-view-button')){              
            this.controller.changeListView();
        }
    }

    getItemTemplate(object){

        const videoTemplate = this.getVideoTemplate(object.videos)

        const result = this.itemTemplate
        .replace("{{this.title}}",object.title)
        .replace("{{this.poster}}",`https://image.tmdb.org/t/p/w400/${object.poster}`)
        .replace("{{this.overview}}",object.overview)
        .replace("{{this.id}}",object.id)
        .replace("{{this.videos}}",videoTemplate);
        return result;
    }    

    getVideoTemplate(videos){
        let template = '';
        for(const video of videos){           
            template += this.videoTemplate.replace("{{id}}", video.key);
        }
        return template;
    }

    render(object) {        
        document.documentElement.scrollTop = 0;  
        this.viewport.innerHTML = this.getItemTemplate(object);        
    }
}

export default MovieListView;