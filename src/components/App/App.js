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
  };
  items = [];
  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }
  handleEnter = (search) => {
    if (search.trim() === '') return;
    this.setState({
      keyword: search,
    });

    this.service
      .getResource(this.state.keyword)
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
  };
  render() {
    console.log(this.items);
    return (
      <div>
        <Navigation />
        <Search enterHandler={this.handleEnter} />
        <CardList
          movies={this.items}
          keyword={this.state.keyword}
          loading={this.state.loading}
          error={this.state.error}
        />
      </div>
    );
  }
}
