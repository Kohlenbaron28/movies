import React from 'react';
import { debounce } from 'lodash';

import './Search.css';

export default class Search extends React.Component {
  state = {
    search: '',
  };
  debouncedSearch = debounce(async (criteria) => {
    this.setState({
      search: criteria,
    });
    this.props.enterHandler(criteria);
  }, 500);
  changeItem = async (e) => {
    this.debouncedSearch(e.target.value);
    console.log(this.state.search);
  };

  render() {
    return (
      <div className="search">
        <input className="search__input" type="text" placeholder="Type to search..." onChange={this.changeItem} />
      </div>
    );
  }
}
