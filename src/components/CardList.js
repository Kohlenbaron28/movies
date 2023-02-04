import React from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';

import Service from '../services/Service';

import CardItem from './Card/CardItem';

export default class CardList extends React.Component {
  service = new Service();

  //     this.state = {
  //       items: [],
  //       loading: true,
  //     };
  //   }

  //   componentDidMount() {
  //     this.updateMovie();
  //   }
  //   onError() {
  //     this.setState({
  //       error: true,
  //       loading: false,
  //     });
  //   }
  //   items = [];
  //   updateMovie() {
  //     let keyword = this.props.keyword;
  //     console.log(keyword);
  //     this.service
  //       .getResource(keyword)
  //       .then((res) => res.results)
  //       .then((res) =>
  //         res.forEach((res) => {
  //           this.items.push({
  //             id: res.id,
  //             title: res.title,
  //             release_date: res.release_date,
  //             poster_path: res.poster_path,
  //             overview: res.overview,
  //             genre_ids: res.genre_ids,
  //           });
  //           this.setState({
  //             items: [
  //               {
  //                 id: res.id,
  //                 title: res.title,
  //                 release_date: res.release_date,
  //                 poster_path: res.poster_path,
  //                 overview: res.overview,
  //                 genre_ids: res.genre_ids,
  //                 error: false,
  //               },
  //             ],
  //             loading: false,
  //           });
  //         })
  //       )
  //       .catch(this.onError);
  //   }
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
              <Pagination defaultCurrent={1} total={50} />;
            </div>
          ) : error ? (
            <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon />
          ) : null}
        </Online>
      </div>
    );
  }
}
