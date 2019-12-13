import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";

import "./TaggerModal.css";

const TaggerModal = props => {
  var modalRef = useRef();
  useEffect(() => {
    if (
      modalRef.current.offsetWidth -
        +parseInt(modalRef.current.style.left, 10) >
      props.width
    ) {
      modalRef.current.style.left = null;
      modalRef.current.style.right = 0;
    }
  }, [props.width]);

  {
    const buttons = props.ents.map(element => {
      var name = element.type;
      var colors = element.color;
      var backgroundColor = `rgb(${colors.r}, ${colors.g}, ${colors.b})`;
      return (
        <Button
          className="tag_button"
          onClick={props.handler}
          value={name.toUpperCase()}
          style={{ backgroundColor }}
          key={name}
        >
          {name.toUpperCase()}
        </Button>
      );
    });

    var deleteButton = null;
    if (props.deleteTag) {
      deleteButton = (
        <Button
          className="delete_button"
          onClick={props.deleteTag}
          value="delete"
          key="delete"
          style={{ backgroundColor: "red" }}
        >
          X
        </Button>
      );
    }

    return (
      <div className="tagger_modal" onClick={props.toggleModal}>
        <div
          ref={modalRef}
          className="tagger_modal_main"
          style={props.position}
        >
          <div>
            {buttons}
            {deleteButton}
          </div>
        </div>
      </div>
    );
  }
};
export default TaggerModal;
