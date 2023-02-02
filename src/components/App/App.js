import React from 'react';

import CardList from '../CardList';

export default class App extends React.Component {
  state = {
    movies: [],
  };
  render() {
    return <CardList movies={this.state.movies} />;
  }
}
