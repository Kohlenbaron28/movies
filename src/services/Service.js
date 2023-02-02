import React from 'react';

export default class Service extends React.Component {
  _imgBase = 'https://image.tmdb.org/t/p/original';
  async getResource() {
    let link = await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=bc62132d513b6a5e8c531f882e36dfa8&query="return"'
    );
    if (!link.ok) {
      throw new Error('service err');
    }
    let json = await link.json();
    return json;
  }
  async getImage(url) {
    return `${this._imgBase}/${url}`;
  }
}
