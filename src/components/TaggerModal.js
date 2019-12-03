import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import "./TaggerModal.css";

export default class TaggerModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (
      this.ref.offsetWidth + parseInt(this.ref.style.left, 10) >
      window.innerWidth
    ) {
      this.ref.style.left = null;
      this.ref.style.right = 0;
    }
  }
  render() {
    const buttons = this.props.ents.map(element => {
      var name = element.type;
      var colors = element.color;
      var backgroundColor = `rgb(${colors.r}, ${colors.g}, ${colors.b})`;
      return (
        <Button
          className="tag_button"
          onClick={this.props.handler}
          value={name}
          style={{ backgroundColor }}
          key={name}
        >
          {name.toUpperCase()}
        </Button>
      );
    });

    var deleteButton = null;
    if (this.props.deleteTag) {
      deleteButton = (
        <Button
          className="delete_button"
          onClick={this.props.deleteTag}
          value="delete"
          key="delete"
          style={{ backgroundColor: "red" }}
        >
          X
        </Button>
      );
    }

    return (
      <div className="tagger_modal" onClick={this.props.hideModal}>
        <div
          className="tagger_modal_main"
          style={this.props.position}
          ref={r => (this.ref = r)}
        >
          <div>
            {buttons}

            {deleteButton}
          </div>
        </div>
      </div>
    );
  }
}
