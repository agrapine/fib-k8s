import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({ seenIndexes: seenIndexes.data });
  }

  renderSeenIndexes() {
    const { seenIndexes } = this.state;
    return seenIndexes.map(({ number }) => number).join(", ");
  }

  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          for index {key} => {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  handleSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: this.state.index
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>enter your index:</label>
          <input
            value={this.state.index}
            onChange={e => this.setState({ index: e.target.value })}
          />
          <button>submit</button>
        </form>
        <h3>indexes seen</h3>
        {this.renderSeenIndexes()}
        <h3>calculated values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
