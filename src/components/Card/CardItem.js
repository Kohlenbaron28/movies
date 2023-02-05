import React from 'react';
import { Card, Col, Row } from 'antd';
import { format, parseISO } from 'date-fns';

export default class CardItem extends React.Component {
  state = {
    loading: true,
  };
  render() {
    const { data, minify } = this.props;

    return (
      <Row gutter={16}>
        {data.map((obj) => {
          let res = format(parseISO(obj.release_date), 'MMMM dd, yyyy');
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
