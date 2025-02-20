const apiKey=`ee94a2a5bb453ffc6f1d73df35919bc3`;
const apiQuery= `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
const searchQuery=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const movieBox=document.querySelector("main");
const searchBox=document.getElementById("search");

async function getMovies(query) 
{
    try 
    {
        const data= await fetch(query);
        const dataJson= await data.json();
        displayMovies(dataJson.results);
    } 
    catch (error) 
    {
        console.error('GET data error: ', error);
    }
}

function displayMovies(movies)
{
    movies.forEach(movie => 
    {
        const moviePoster=`https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        const movieTitle=movie.title || movie.name;
        const moviePlot=movie.overview || "This movie does not have an overview.";
        
        div=document.createElement("div");
        div.classList.add("movieCard");

        const img=document.createElement("img");
        img.src=moviePoster;

        const h3=document.createElement("h3");
        h3.textContent=movieTitle;

        movieBox.appendChild(div);
        div.appendChild(img);
        div.appendChild(h3);

        div.onclick= () => movieInfo(moviePoster,movieTitle,moviePlot);
    });
}


searchBox.addEventListener("input", searchMovie);

function searchMovie()
{
    if (searchBox.value=="") 
    {
        getMovies(apiQuery);
    }
    movieBox.innerHTML="";
    getMovies(searchQuery+searchBox.value);
}


function movieInfo(poster,title,plot)
{
    if (!document.body.classList.contains("activePopout"))
    {
        document.body.classList.add("activePopout");
        const closeButton=document.querySelector(".closeButton");
        
        const popoutImg=document.getElementById("popoutImg");
        const popoutH3= document.getElementById("popoutH3");
        const popoutP= document.getElementById("popoutP");
    
        popoutImg.src=poster;
        popoutH3.innerText=title;
        popoutP.innerText=plot;

        closeButton.addEventListener("click", () => {
            document.body.classList.remove("activePopout");
        });
    }
}



getMovies(apiQuery);