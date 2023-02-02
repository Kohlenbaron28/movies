import React from 'react';
import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Offline } from 'react-detect-offline';

import Service from '../services/Service';

import CardItem from './Card/CardItem';

export default class CardList extends React.Component {
  constructor() {
    super();
    this.updateMovie();
  }

  service = new Service();
  state = {
    items: [],
    loading: true,
  };
  componentDidMount() {
    this.setState({
      //loading: false,
    });
  }
  onError() {
    this.setState({
      error: true,
    });
    console.log('err');
  }
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
                error: false,
              },
            ],
            loading: false,
          });
        })
      )
      .catch(this.onError);
  }
  render() {
    const { loading, error } = this.state;
    const minify = (text) => {
      return text.replace(/^(.{100}[^\s]*).*/, '$1');
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div>
        <Offline>You are offline!</Offline>
        {loading && !error ? (
          <Spin
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
            indicator={antIcon}
          />
        ) : !loading && !error ? (
          <CardItem data={this.items} minify={minify} />
        ) : error ? (
          <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />
        ) : null}
      </div>
    );
  }
}
