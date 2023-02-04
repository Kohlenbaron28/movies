import React from 'react';

export default class Search extends React.Component {
  state = {
    search: '',
  };
  changeItem = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleEnter = (event) => {
    if (event.key === 'Enter') {
      this.props.enterHandler(this.state.search);
    }
  };
  render() {
    return (
      <div>
        <input
          type="text"
          style={{ width: '100%' }}
          placeholder="Type to search..."
          value={this.state.search}
          onChange={this.changeItem}
          onKeyUp={this.handleEnter}
        />
        <button className="btn" onClick={() => this.props.enterHandler(this.state.search)}>
          Search
        </button>
        {console.log(this.state.search)}
      </div>
    );
  }
}
