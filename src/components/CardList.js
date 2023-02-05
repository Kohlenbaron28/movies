import React from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';

import Service from '../services/Service';

import CardItem from './Card/CardItem';

export default class CardList extends React.Component {
  service = new Service();
  componentDidUpdate(prevProps) {
    if (this.props.page !== prevProps.page && prevProps.page !== null) {
      console.log('cardList', prevProps);
      console.log('cardListuuu', this.props);

      //this.props.updateMovie(this.props.keyword, this.props.page);
    }
  }

  render() {
    const { loading, error } = this.props;

    const minify = (text) => {
      return text.replace(/^(.{100}[^\s]*).*/, '$1');
    };
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
              <CardItem data={this.props.movies} minify={minify} />
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
