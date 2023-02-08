import React from 'react';
import { Card, Col, Row, Rate } from 'antd';
import { format, parseISO } from 'date-fns';

export default class RatedPage extends React.Component {
  render() {
    const { minify } = this.props;
    let itemRated = JSON.parse(localStorage.getItem('stars'));
    let genres = JSON.parse(localStorage.getItem('genres'));
    return (
      <Row gutter={16}>
        {itemRated !== null ? (
          itemRated.map((obj) => {
            let res = format(parseISO(obj.release_date), 'MMMM dd, yyyy');
            let arr = [];
            for (let id of obj.genre_ids) {
              for (let objj of genres) {
                if (objj.id === id) {
                  arr.push(objj.name);
                }
              }
            }
            return (
              <Col span={8} key={obj.id}>
                <Card
                  title={obj.title}
                  bordered={false}
                  cover={<img src={`https://image.tmdb.org/t/p/original/${obj.poster_path}`} alt="" />}
                >
                  <div
                    className="reiting"
                    style={
                      obj.star >= 0 && obj.star <= 3
                        ? { borderColor: '#E90000' }
                        : obj.star > 3 && obj.star <= 5
                        ? { borderColor: '#E97E00' }
                        : obj.star > 5 && obj.star <= 7
                        ? { borderColor: '#E9D100' }
                        : obj.star > 7
                        ? { borderColor: '#66E900' }
                        : { borderColor: 'black' }
                    }
                  >
                    {obj.star}
                  </div>
                  <div className="card__date">{res}</div>
                  <div className="card__genres">
                    {arr.map((genre) => (
                      <span className="genre_id" key={genre}>
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="card__description">{minify(obj.overview)}</div>
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
