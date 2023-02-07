import React from 'react';
import { Card, Col, Row, Rate } from 'antd';
//import { format, parseISO } from 'date-fns';

export default class RatedPage extends React.Component {
  render() {
    let itemRated = JSON.parse(localStorage.getItem('stars'));
    console.log(itemRated);
    return (
      <Row gutter={16}>
        {itemRated !== null ? (
          itemRated.map((obj) => {
            //let res = format(parseISO(obj.release_date), 'MMMM dd, yyyy');
            return (
              <Col span={8} key={obj.id}>
                <Card
                  title={obj.title}
                  bordered={false}
                  cover={<img src={`https://image.tmdb.org/t/p/original/${obj.poster_path}`} alt="" />}
                >
                  <div className="card__date">{obj.release_date}</div>
                  <div className="card__genres">
                    <span>{obj.genre_ids}</span>
                  </div>
                  <div className="card__description">{obj.overview}</div>
                  <Rate allowHalf count={10} value={obj.star} />
                </Card>
              </Col>
            );
          })
        ) : (
          <p>nothing</p>
        )}
      </Row>
    );
  }
}
