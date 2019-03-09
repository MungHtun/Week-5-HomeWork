class MovieListView {
    constructor(controller) {
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-info-template").innerHTML;
        this.viewport = document.getElementById("viewport");
        this.viewport.addEventListener('click', (event) => this.detailViewBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.favoriteBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.ratingListener(event));

        this.ratingData = [];

    }

    ratingListener(event) {

        let span = event.target;

        if (span && span.parentNode.classList.contains('rating-star')) {

            let parent = span.parentNode;
            let parentId = parent.id.slice(12);

            //console.log(parentId);

            let movieId = span.id;
            let childId = movieId.slice(0, 6);


            if (parentId === childId) {
                var stars = parent.children;

            }

            let match = false;
            let num = 0;

            [].forEach.call(stars, function (star, index) {
                if (match) {
                    star.classList.remove('rated');
                } else {
                    star.classList.add('rated');
                }

                if (star === span) {
                    match = true;
                    num = index + 1;
                }

            });

            document.querySelector('.stars').setAttribute('data-rating', num);

            const ratings = { id: childId, number: num }

            let inputRating = [];

            inputRating = JSON.parse(localStorage.getItem('rating') || "[]");

            if (inputRating.length === 0) {

                if (ratings.id != "") {
                    inputRating.push(ratings);
                    localStorage.setItem('rating', JSON.stringify(inputRating));
                } else {
                    return;
                }


            } else {

                for (let item of inputRating) {


                    var id = inputRating.length + 1;
                    var found = inputRating.some(function (el) {
                        return el.id === childId;
                    });

                    if (!found && childId != "") {
                        inputRating.push(ratings);
                        localStorage.setItem('rating', JSON.stringify(inputRating));
                        //console.log(inputRating);
                    } else if (found && childId != "") {

                        inputRating.find(item => item.id == childId).number = ratings.number;
                        localStorage.setItem('rating', JSON.stringify(inputRating));
                    } else {
                        return;
                    }

                }


            }

            this.ratingData.push(ratings);

            console.log(this.ratingData);

        }

    }

    favoriteBtnListener(event) {
        event.preventDefault();

        const favoriteMark = event.target;

        if (favoriteMark && favoriteMark.parentNode.classList.contains('mark-favorite-button')) {
            let parent = favoriteMark.parentNode.id;
            let parentId = parent.slice(6);

            let child = favoriteMark.id;
            let childId = child.slice(5);

            let tempData = favoriteMark.innerHTML;

            if (tempData === "favorite_border" && parentId === childId) {
                tempData = "favorite";
                document.getElementById(child).innerHTML = tempData;
            } else if (tempData === "favorite" && parentId === childId) {
                tempData = "favorite_border";
                document.getElementById(child).innerHTML = tempData;
            }

            let inputFav = [];

            // Parse the serialized data back into an array of objects
            inputFav = JSON.parse(localStorage.getItem('favorite') || "[]");

            if (inputFav.length === 0) {

                inputFav.push(childId);
                localStorage.setItem('favorite', JSON.stringify(inputFav));

            } else {

                let temp = false;
                for (let item of inputFav) {

                    if (parseInt(item) != childId) {

                        var index = inputFav.indexOf(childId);
                        if (index > -1) {
                            temp = false;
                        } else {
                            temp = true;
                        }


                    }
                    else if (parseInt(item) == childId) {

                        if (!temp) {
                            var index = inputFav.indexOf(childId);
                            if (index > -1) {
                                inputFav.splice(index, 1);
                                localStorage.setItem('favorite', JSON.stringify(inputFav));
                            }
                        } else {
                            return;
                        }

                    }

                    if (temp) {

                        inputFav.push(childId);
                        localStorage.setItem('favorite', JSON.stringify(inputFav));
                        return;
                    }
                }



            }

            // Re-serialize the array back into a string and store it in localStorage
            //localStorage.setItem('favorite', JSON.stringify(inputFav));

        }
    }

    detailViewBtnListener(event) {
        event.preventDefault();

        const targetEle = event.target;
        if (targetEle && targetEle.parentNode.classList.contains('detail-view-button')) {
            const movieId = targetEle.parentNode.dataset.id;
            this.controller.displayDetail(movieId);
        }
    }

    getItemTemplate(object) {


        let result = "";

        if (object.favorite) {
            object.favorite = "favorite";
        } else {
            object.favorite = "favorite_border";
        }


        if (object.rating) {

            if (object.rating == 1) {
                var result1 = 'rated';
            } else if (object.rating == 2) {
                var result1 = 'rated';
                var result2 = 'rated';

            } else if (object.rating == 3) {
                var result1 = 'rated';
                var result2 = 'rated';
                var result3 = 'rated';
            } else if (object.rating == 4) {
                var result1 = 'rated';
                var result2 = 'rated';
                var result3 = 'rated';
                var result4 = 'rated';
            } else if (object.rating == 5) {
                var result1 = 'rated';
                var result2 = 'rated';
                var result3 = 'rated';
                var result4 = 'rated';
                var result5 = 'rated';
            }
        }







        //for(let rate in )

        result = this.itemTemplate
            .replace("{{this.title}}", object.title)
            .replace("{{this.poster}}", `https://image.tmdb.org/t/p/w400/${object.poster}`)
            .replace("{{this.overview}}", this.getExcerptWords(object.overview))
            .replace("{{this.id}}", object.id)
            .replace("{{this.parentFavid}}", object.id)
            .replace("{{this.childFavid}}", object.id)
            .replace("{{this.parentRateid}}", object.id)
            .replace("{{this.childRateid}}_1", object.id)
            .replace("{{this.childRateid}}_2", object.id)
            .replace("{{this.childRateid}}_3", object.id)
            .replace("{{this.childRateid}}_4", object.id)
            .replace("{{this.childRateid}}_5", object.id)   
            
            .replace("{{this.rated_1}}", result1)   
            .replace("{{this.rated_2}}", result2)   
            .replace("{{this.rated_3}}", result3)   
            .replace("{{this.rated_4}}", result4)   
            .replace("{{this.rated_5}}", result5)   
            


            .replace("{{this.favorite}}", object.favorite);



        return result;
    }

    getExcerptWords(mainString) {
        const sliced = mainString.slice(0, 100)
        const split = sliced.split(" ");
        split.splice(-1, 1);
        const joined = split.join(" ");
        return joined + "...";
    }

    render(templates) {
        document.documentElement.scrollTop = 0;
        this.viewport.innerHTML = "";
        for (let template of templates) {
            this.viewport.innerHTML += template;
        }
    }
}

export default MovieListView;