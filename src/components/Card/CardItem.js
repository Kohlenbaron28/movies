import React from 'react';
import { Card, Col, Row } from 'antd';
import { format, parse } from 'date-fns';

export default class CardItem extends React.Component {
  state = {
    loading: true,
  };
  render() {
    const { data, minify } = this.props;
    let res = '';
    const formating = (dateString = '2017-01-13') => {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      res = format(date, 'MMMM dd, yyyy');
      return res;
    };

    return (
      <Row gutter={16}>
        {data.map((obj) => {
          let dateString = obj.release_date;
          res = formating(dateString);
          return (
            <Col span={8} key={obj.id}>
              <Card
                title={obj.title}
                bordered={false}
                cover={<img src={`https://image.tmdb.org/t/p/original/${obj.poster_path}`} alt="" />}
              >
                <div className="card__date">{res}</div>
                <div className="card__genres">
                  <span>{obj.genre_ids}</span>
                  <span>Drama</span>
                </div>
                <div className="card__description">{minify(obj.overview)}</div>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}
