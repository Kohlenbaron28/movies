import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SearchPage from '../SearchPage';
import RatedPage from '../RatedPage';
import Navigation from '../Navigation/Navigation';

export default class App extends React.Component {
  state = {
    rated: [],
  };

  render() {
    console.log(localStorage.getItem('stars'));
    if (localStorage.getItem('stars') === null) {
      localStorage.setItem(
        'stars',
        JSON.stringify([
          {
            id: 661374,
            title: 'Glass Onion: A Knives Out Mystery',
            release_date: '2022-11-23',
            poster_path: '/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg',
            overview:
              'World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery surrounding a tech billionaire and his eclectic crew of friends.',
            genre_ids: [35, 80, 9648],
            star: 0,
          },
        ])
      );
    }

    return (
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/rate" element={<RatedPage />} />
        </Routes>
      </div>
    );
  }
}
