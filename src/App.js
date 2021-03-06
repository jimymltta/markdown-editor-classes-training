import React, { Component } from "react";
import "./App.css";

import marked from "marked";

import { sampleText } from "./sampleText";

class App extends Component {
  state = {
    text: sampleText,
  };

  componentDidMount() {
    const text = localStorage.getItem("text");
    if (text) {
      this.setState({ text });
    } else {
      this.setState({ text: sampleText });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    localStorage.setItem("text", text);
  }

  handleChange = (e) => {
    const text = e.target.value;
    this.setState({ text });
  };

  renderText = (text) => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              rows="35"
              className="form-control"
              value={this.state.text}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="col-sm-6">
            <div>
              <div
                dangerouslySetInnerHTML={this.renderText(this.state.text)}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
