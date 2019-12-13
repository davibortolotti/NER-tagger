import React, { useState, useRef } from "react";
import "./TagCreator.css";
import Button from "react-bootstrap/Button";
import ColorSelecter from "../ColorSelecter/ColorSelecter";
import DeleteIcon from "@material-ui/icons/Delete";

function TagCreator(props) {
  const [pickerPosition, setPickerPosition] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const addTag = (tagname, rgb) => {
    setShowPicker(false);
    return props.createTagType(tagname, rgb);
  };

  const openColorPicker = e => {
    setShowPicker(true);
    setPickerPosition({ x: e.clientX, y: e.clientY });
  };

  const removeTag = e => {
    props.removeTagType(e.target.value);
  };

  const tagDivs = props.ents.map(e => {
    // var o = Math.round(
    //   (parseInt(e.color.r) * 299 +
    //     parseInt(e.color.g) * 587 +
    //     parseInt(e.color.b) * 114) /
    //     1000
    // );
    // var fore = o > 125 ? "black" : "white";
    const divStyle = {
      backgroundColor: `rgb(${e.color.r}, ${e.color.g}, ${e.color.b})`
      // color: fore
    };

    return (
      <div className="container" key={e.type}>
        <div className="tagcreator_content_tag" style={divStyle} key={e.type}>
          {e.type.toUpperCase()}
        </div>
        <button className="remove_button" onClick={removeTag} value={e.type}>
          <DeleteIcon className="remove_button_icon" />
        </button>
      </div>
    );
  });
  var thisPicker;

  const hidePicker = () => {
    setShowPicker(false);
  };

  var selector;
  if (showPicker) {
    selector = (
      <ColorSelecter
        position={pickerPosition}
        addTag={addTag}
        hidePicker={hidePicker}
      />
    );
  }

  return (
    <aside className="tagcreator">
      <h2 className="tagcreator_content">TAGS</h2>
      {selector}
      <Button className="add_button" onClick={openColorPicker}>
        + Criar Tag
      </Button>
      {thisPicker}
      {tagDivs}
    </aside>
  );
}

export default TagCreator;
