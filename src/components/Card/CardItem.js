import React from 'react';
import { Card, Col, Row, Rate } from 'antd';
import { format, parseISO } from 'date-fns';

import './Card.css';
import { Consumer } from '../../services/Context';
export default class CardItem extends React.Component {
  state = {
    loading: true,
  };
  findGenre = (genres) => {
    for (let id of genres) {
      this.props.getGenres(id);
    }
  };
  render() {
    const { data, minify, onChangeStar } = this.props;
    let newdata = JSON.parse(localStorage.getItem('stars'));

    return (
      <Row gutter={16}>
        {newdata !== null ? (
          data.map((obj) => {
            let val = 0;
            let res = format(parseISO(obj.release_date), 'MMMM dd, yyyy');
            for (let objj of newdata) {
              if (objj.id === obj.id) {
                val = objj.star;
              }
            }
            console.log(obj.genre_ids);
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
                      val >= 0 && val <= 3
                        ? { borderColor: '#E90000' }
                        : val > 3 && val <= 5
                        ? { borderColor: '#E97E00' }
                        : val > 5 && val <= 7
                        ? { borderColor: '#E9D100' }
                        : val > 7
                        ? { borderColor: '#66E900' }
                        : { borderColor: 'black' }
                    }
                  >
                    {val}
                  </div>
                  <div className="card__date">{res}</div>
                  <div className="card__genres">
                    <Consumer>
                      {(value) => {
                        let arr = [];
                        for (let id of obj.genre_ids) {
                          for (let objj of value) {
                            if (objj.id === id) {
                              arr.push(objj.name);
                            }
                          }
                          //return value.map((objj) => objj.id === id && arr.push[objj.name]);
                          //<span key={objj.id}>{objj.name}</span> : null));
                        }
                        console.log(arr);
                        return arr.map((genre) => (
                          <span key={genre} className="genre_id">
                            {genre}
                          </span>
                        ));
                        //return <span>{[...arr]}</span>;
                      }}
                    </Consumer>
                  </div>
                  <div className="card__description">{minify(obj.overview)}</div>
                  <Rate
                    allowHalf
                    count={10}
                    value={val}
                    onChange={(num) => {
                      onChangeStar(num, obj.id);
                      localStorage.setItem('stars', JSON.stringify(newdata));
                    }}
                  />
                </Card>
              </Col>
            );
          })
        ) : (
          <p>null</p>
        )}
      </Row>
    );
  }
}
