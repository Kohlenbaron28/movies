import React from 'react';

import CardList from '../CardList';
import Search from '../Search';
import Navigation from '../Navigation/Navigation';
import Service from '../../services/Service';

export default class App extends React.Component {
  service = new Service();
  state = {
    movies: [],
    keyword: '',
    loading: true,
    currentPage: 1,
    totalResults: 0,
  };
  componentDidMount() {
    this.handleEnter();
  }
  componentDidUpdate(prevState) {
    if (this.state.page !== prevState.page) {
      console.log('page is changed', prevState);
    } else {
      console.log('page isnot');
    }
  }

  items = [];
  currentPage = (num) => {
    this.items = [];
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bc62132d513b6a5e8c531f882e36dfa8&query=${this.state.keyword}&page=${num}`
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
          });
          this.setState({
            movies: [
              {
                id: res.id,
                title: res.title,
                release_date: res.release_date,
                poster_path: res.poster_path,
                overview: res.overview,
                genre_ids: res.genre_ids,
                error: false,
              },
            ],
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
    // this.service
    //   .getResource(key, num)
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
          });
          this.setState({
            movies: [
              {
                id: res.id,
                title: res.title,
                release_date: res.release_date,
                poster_path: res.poster_path,
                overview: res.overview,
                genre_ids: res.genre_ids,
                error: false,
              },
            ],
            loading: false,
          });
        })
      );
  }
  render() {
    console.log(this.items);
    console.log(this.state.page);

    return (
      <div>
        <Navigation />
        <Search enterHandler={this.handleEnter} />
        {this.items.length <= 1 ? (
          <p>no matches</p>
        ) : (
          <CardList
            movies={this.items}
            keyword={this.state.keyword}
            loading={this.state.loading}
            error={this.state.error}
            pagination={this.currentPage}
            page={this.state.page}
            updateMovie={this.updateMovie}
          />
        )}
      </div>
    );
  }
}
