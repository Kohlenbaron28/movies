import React from 'react';

import './SearchPage.css';
import CardList from '../CardList';
import Search from '../Search/Search';
import Service from '../../services/Service';
import { Provider } from '../../services/Context';

export default class SearchPage extends React.Component {
  service = new Service();
  state = {
    movies: [],
    keyword: '',
    loading: true,
    currentPage: 1,
    totalResults: 0,
    genres: null,
  };
  componentDidMount() {
    this.handleEnter();
    this.getGenres();
  }
  genresArr = [];
  items = [];
  currentPage = (num) => {
    let items = [];
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bc62132d513b6a5e8c531f882e36dfa8&query=${this.state.keyword}&page=${num}`
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) =>
        res.forEach((res) => {
          items.push({
            id: res.id,
            title: res.title,
            release_date: res.release_date,
            poster_path: res.poster_path,
            overview: res.overview,
            genre_ids: res.genre_ids,
            star: 0,
          });
          this.setState({
            movies: [...items],
            loading: false,
            currentPage: num,
          });
        })
      );
    console.log(num);
  };
  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }
  handleEnter = (search) => {
    this.setState({
      keyword: search,
    });
    this.updateMovie();
  };
  updateMovie() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bc62132d513b6a5e8c531f882e36dfa8&query=${this.state.keyword}&page=${this.state.currentPage}`
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) =>
        res.forEach((res) => {
          this.items.push({
            id: res.id,
            title: res.title,
            release_date: res.release_date,
            poster_path: res.poster_path,
            overview: res.overview,
            genre_ids: res.genre_ids,
            star: 0,
          });
          this.setState({
            movies: [...this.items],
            loading: false,
          });
        })
      );
  }
  getGenres = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=bc62132d513b6a5e8c531f882e36dfa8')
      .then((res) => res.json())
      .then((res) => res.genres)
      .then((res) => {
        this.setState({
          genres: res,
        });
        localStorage.setItem('genres', JSON.stringify(res));
      });
  };
  onChangeStar = (num, id) => {
    this.setState((state) => {
      let existingEntries = JSON.parse(localStorage.getItem('stars'));
      if (existingEntries == null) existingEntries = [];
      let idx = state.movies.findIndex((el) => el.id === id);
      const oldItem = state.movies[idx];
      const newItem = { ...oldItem, star: num };
      localStorage.setItem('newStar', JSON.stringify(newItem));
      existingEntries.push(newItem);
      localStorage.setItem('stars', JSON.stringify(existingEntries));
      const newArr = [...state.movies.slice(0, idx), newItem, ...state.movies.slice(idx + 1)];
      console.log(newItem);
      return {
        data: newArr,
      };
    });
  };
  render() {
    return (
      <Provider value={this.state.genres}>
        <div>
          <Search enterHandler={this.handleEnter} />
          {this.items.length <= 1 ? (
            <div className="nothing">
              <p>no matches...</p>
              <img src="https://i.gifer.com/2GU.gif" alt="" />
            </div>
          ) : (
            <CardList
              movies={this.state.movies}
              keyword={this.state.keyword}
              loading={this.state.loading}
              error={this.state.error}
              pagination={this.currentPage}
              page={this.state.page}
              updateMovie={this.updateMovie}
              getGenres={this.getGenres}
              genresAee={this.genresArr}
              onChangeStar={this.onChangeStar}
              minify={this.props.minify}
            />
          )}
        </div>
      </Provider>
    );
  }
}
