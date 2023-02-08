import React from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';

import CardItem from './Card/CardItem';

export default class CardList extends React.Component {
  stars = this.props.movies.map((mov) => mov.star);

  render() {
    const { loading, error, onChangeStar, getGenres, genresArr, minify } = this.props;

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div>
        <Offline>
          <h1>You are offline!🐖</h1>
        </Offline>
        <Online>
          {loading && !error ? (
            <Spin
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
              indicator={antIcon}
            />
          ) : !loading && !error ? (
            <div>
              <CardItem
                data={this.props.movies}
                minify={minify}
                onChangeStar={onChangeStar}
                getGenres={getGenres}
                genresArr={genresArr}
              />
              <Pagination total={20} onChange={(num) => this.props.pagination(num)} />;
            </div>
          ) : error ? (
            <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />
          ) : null}
        </Online>
      </div>
    );
  }
}
