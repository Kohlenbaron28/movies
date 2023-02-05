import React from 'react';
import { debounce } from 'lodash';
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
    //
  };

  render() {
    return (
      <div>
        <input
          type="text"
          style={{ width: '100%' }}
          placeholder="Type to search..."
          //value={this.state.search}
          onChange={this.changeItem}
          //onKeyUp={this.handleEnter}
        />
        <button className="btn" onClick={() => this.props.enterHandler(this.state.search)}>
          Search
        </button>
        {console.log(this.state.search)}
      </div>
    );
  }
}
