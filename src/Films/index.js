import React, { Component } from "react";
import axios from "axios";

import "./style.css";

import Card from "../Components/Card";
import Loader from "../Components/Loader";

const filmsEndpointURL = "https://app.codescreen.com/api/assessments/films";

//Your API token. This is needed to successfully authenticate when calling the films endpoint.
//This needs to be added to the Authorization header (using the Bearer authentication scheme) in the request you send to the films endpoint.
const apiToken = "8c5996d5-fb89-46c9-8821-7063cfbc18b1";

export default class Films extends Component {
  state = {
    filmList: [],
    loading: true,
  };

  async componentDidMount() {
    const { directorName } = this.props;
    // In case the endpoint is down or removed
    try {
      const finalRes = await axios({
        url: `${filmsEndpointURL}?directorName=${directorName}`,
        method: "GET",
        headers: {
          Authorization: apiToken,
        },
      });
      this.setState({ filmList: finalRes.data, loading: false });
    } catch (e) {
      console.log(
        `🚀 ~ Films ~ componentDidMount ~ Error: \n Error occurred during fetch`,
        e
      );
    }
  }

  /**
   * Retrieves the name of the best rated film from the given list of films.
   * If the given list of films is empty, this method should return "N/A".
   */
  getBestRatedFilm(films) {
    if (films.length === 0) return "N/A";
    let bestFilm = "";
    let bestRating = 0;
    let ratings = films.map((film) => {
      if (!bestRating || bestRating < film.rating) {
        bestRating = film.rating;
        bestFilm = film.name;
      }
    });
    return bestFilm;
  }

  /**
   * Retrieves the length of the film which has the longest running time from the given list of films.
   * If the given list of films is empty, this method should return "N/A".
   *
   * The return value from this function should be in the form "{length} mins"
   * For example, if the duration of the longest film is 120, this function should return "120 mins".
   */
  getLongestFilm(films) {
    if (films.length === 0) return "N/A";

    let FilmsLength = films.map((film) => film.length);

    return `${Math.max.apply(null, FilmsLength)} mins`;
  }

  /**
   * Retrieves the average rating for the films from the given list of films, rounded to 1 decimal place.
   * If the given list of films is empty, this method should return 0.
   */
  getAverageRating(films) {
    if (films.length === 0) return 0;
    let totalRating = 0;
    films.map((film) => (totalRating += film.rating));
    const averageRating = totalRating / films.length;
    return averageRating.toFixed(1);
  }

  /**
   * Retrieves the shortest number of days between any two film releases from the given list of films.
   *
   * If the given list of films is empty, this method should return "N/A".
   * If the given list contains only one film, this method should return 0.
   * Note that no director released more than one film on any given day.
   *
   * For example, if the given list is composed of the following 3 entries
   *
   * {
   *    "name": "Batman Begins",
   *    "length": 140,
   *
   *    "rating": 8.2,
   *    "releaseDate": "2006-06-16",
   *    "directorName": "Christopher Nolan"
   * },
   * {
   *    "name": "Interstellar",
   *    "length": 169,
   *    "rating": 8.6,
   *    "releaseDate": "2014-11-07",
   *    "directorName": "Christopher Nolan"
   * },
   * {
   *   "name": "Prestige",
   *   "length": 130,
   *   "rating": 8.5,
   *   "releaseDate": "2006-11-10",
   *   "directorName": "Christopher Nolan"
   * }
   *
   * then this method should return 147, as Prestige was released 147 days after Batman Begins.
   */
  getShortestNumberOfDaysBetweenFilmReleases(films) {
    if (films.length === 0) return "N/A";
    if (films.length === 1) return 0;
    const durations = [];
    const sortedFilms = films.sort((a, b) => {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    });

    for (let i = 1; i < sortedFilms.length; i++) {
      durations.push(
        new Date(sortedFilms[i - 1].releaseDate) -
          new Date(sortedFilms[i].releaseDate)
      );
    }

    return Math.floor(Math.min.apply(null, durations) / (3600000 * 24));
  }

  render() {
    if (this.state.loading)
      return (
        <div className="stats-boxes">
          <Loader small />
        </div>
      );
    return (
      <div className="stats-boxes">
        <div className="stats-box-row-1">
          <Card
            key={"best-rated-film"}
            id={"best-rated-film"}
            title={"Best rated film"}
            description={this.getBestRatedFilm(this.state.filmList)}
          />
          <Card
            className="stats-box-right"
            key={"longest-film"}
            id={"longest-film"}
            title={"Longest film duration"}
            description={this.getLongestFilm(this.state.filmList)}
          />
        </div>
        <div className="stats-box-row-1">
          <Card
            key={"average-rating"}
            id={"average-rating"}
            title={"Average rating"}
            description={this.getAverageRating(this.state.filmList)}
          />
          <Card
            className="stats-box-right"
            id={"shortest-days"}
            key={"shortest-days"}
            title={"Shortest days between releases"}
            description={this.getShortestNumberOfDaysBetweenFilmReleases(
              this.state.filmList
            )}
          />
        </div>
      </div>
    );
  }
}
