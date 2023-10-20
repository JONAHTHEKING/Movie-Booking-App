import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../Home/Loading";
import "../Moviepage/moviepage.css";

function Movie() {
  let nav = useNavigate();
  const [movies, setMovies] = useState();
  let [iscity, setiscity] = useState(false);
  let [iscinema, setiscinema] = useState(false);
  const [cinema, setCinema] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function getMovies() {
      await axios
        .get("http://127.0.0.1:8000/api/movies/?page=1")
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getMovies();
  }, []);

  function isPage(page_number) {
    if (movies) {
      return page_number <= movies.total_pages;
    } else {
      return false;
    }
  }

  function click(event) {
    if (iscinema) {
      axios(
        `http://127.0.0.1:8000/api/movies/cinema/?cinema=${cinema}&page=${event.target.id}`
      )
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (iscity) {
      axios(
        `http://127.0.0.1:8000/api/movies/city/?city=${city}&page=${event.target.id}`
      )
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/movies/?page=${event.target.id}`)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  let buttons = [];
  if (movies) {
    for (let i = 1; i <= movies.total_pages + 2; i++) {
      buttons.push(
        <button
          className="btn btn-transparent btn-lg page"
          
          disabled={!isPage(i)}
          id={i}
          onClick={click}
        >
          {i}
        </button>
      );
    }
  }

  function handleCityChange(event) {
    if (event.target.value === "Select") {
      setiscity(false);
      setCity(event.target.value);
    } else {
      setiscity(true);
      setCity(event.target.value);
    }

    axios(`http://127.0.0.1:8000/api/movies/city/?city=${event.target.value}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCinemaChange(event) {
    if (event.target.value === "Select") {
      setiscinema(false);
      setCinema(event.target.value);
    } else {
      setiscinema(true);
      setCinema(event.target.value);
    }

    axios(
      `http://127.0.0.1:8000/api/movies/cinema/?cinema=${event.target.value}`
    )
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function navigateTotheater(event) {
    let logged = localStorage.getItem("access_token");

    if (logged) {
      let id = event.target.id;
      nav(`/movie/${id}`);
    } else {
      alert("Please Login First!");
      nav("/login/");
    }
  }

  function movieSearch(event) {
    event.preventDefault();
    let val = document.getElementById("search").value;
    axios
      .get(`http://127.0.0.1:8000/api/movies/search/?search=${val}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    document.getElementById("search").value = "";
  }

  return (
    <>
      <div className="filter-section">
      <div>
        <p className="header1">WELCOME TO BOLETO</p>
        <h1 className="header2">WHAT ARE YOU LOOKING FOR</h1>
      </div>
      <div className="searchBox">
      <div className="searchOption">
      <span >
          <form
            className="form-inline my-2 my-lg-0"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "1em",
            }}
            onSubmit={movieSearch}
          >
            <div className="search-input">
              <input
                className="sear"
                type="search"
                placeholder="Search"
                id="search"
                aria-label="Search"
              />
              <i className="search-icon">🔍</i>
            </div>
            <button className="sear1" type="submit">
              Search
            </button>
          </form>
        </span>
        
        <span>
        <img src="http://pixner.net/boleto/demo/assets/images/ticket/city.png"></img>
          <label className="w-full md:w-7rem">City: </label>
          <select onChange={handleCityChange} className="options">
            <option value="Select">Select a City</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="kukatpally">kukatpally</option>
            <option value="America">America</option>
            <option value="Kakinada">Kakinada</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
            <option value="Kolkata">Kolkata</option>
          </select>
        </span>
        </div>
        <div className="searchOption">
        <img
            src="http://pixner.net/boleto/demo/assets/images/ticket/cinema.png"
            alt=""
          />
        <span>
          <label className="select-label">Cinema: </label>
          <select onChange={handleCinemaChange} className="selecting">
            <option value="Select">Select</option>
            <option value="Inox">Inox</option>
            <option value="PVR">PVR</option>
            <option value="Cinepolis">Cinepolis</option>
            <option value="Imax">Imax</option>
            <option value="Jyothi">Jyothi</option>
            <option value="Cinemax">Cinemax</option>
           
          </select>
        </span>
        </div>
        </div>
      
      </div>
      {movies &&
        movies.movies.map((i, p) => (
          <div className="col-md-3">
            <div className="card-main" id={i.movie_id}>
              <div className="image-container">
                <img
                  src={i.image}
                  id={i.movie_id}
                  className="card-img-bottom zoom-image"
                  style={{ width: "18rem", height: "20rem", padding: "5px"}}
                  alt="LoadImage"
                  onClick={navigateTotheater}
                />
              </div>
              <h5  id={i.movie_id} className="title">
                {i.title}
                
              </h5>
              <img
                className="popcone"
                src="https://pixner.net/boleto/demo/assets/images/movie/tomato.png"
                alt="Tomato"
              
              />
              <img
                className="fruit"
                src="https://pixner.net/boleto/demo/assets/images/movie/cake.png"
                alt="Cake"
              />
              <br />
            
            </div>
          </div>
        ))}
      {!movies && (
        <div className="loading">
          <Loading></Loading>
        </div>
      )}

      {movies && movies.movies.length <= 0 && (
        <div className="col-md-3">
          <p>No Movies Found!!</p>
        </div>
      )}

      <div className="pagination">{buttons}</div>
    </>
  );
}

export default Movie;
