import React from 'react';

import Service from '../services/Service';

import CardItem from './Card/CardItem';

export default class CardList extends React.Component {
  constructor() {
    super();
    this.updateMovie();
  }
  componentDidMount() {
    //this.updateMovie();
  }
  service = new Service();
  state = {
    items: [],
  };
  items = [];
  updateMovie() {
    this.service
      .getResource()
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
            items: [
              {
                id: res.id,
                title: res.title,
                release_date: res.release_date,
                poster_path: res.poster_path,
                overview: res.overview,
                genre_ids: res.genre_ids,
              },
            ],
          });
        })
      );
  }
  render() {
    const minify = (text) => {
      return text.replace(/^(.{100}[^\s]*).*/, '$1');
    };

    return (
      <div>
        <CardItem data={this.items} minify={minify} />
      </div>
    );
  }
}
