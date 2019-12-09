import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

function ColorSelecter(props) {
  const [pickedColor, setPickedColor] = useState({
    r: 12,
    g: 123,
    b: 43
  });
  const style = {
    left: props.position.x - 220,
    top: props.position.y
  };

  const inputRef = useRef();
  const modalRef = useRef();
  const modalBackgroundRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const hidePicker = e => {
    if (e.target === modalBackgroundRef.current) {
      props.hidePicker();
    }
  };

  const keyPress = e => {
    if (e.keyCode === 13) {
      var input = e.target.value;
      if (input) {
        props.addTag(input, pickedColor);
      }
      // put the login here
    }
  };

  const pickColor = color => {
    setPickedColor(color.rgb);
  };

  return (
    <div
      className="color_picker_modal"
      onClick={hidePicker}
      ref={modalBackgroundRef}
    >
      <div className="floating_box" style={style} tabIndex={1} ref={modalRef}>
        <input className="name_picker" ref={inputRef} onKeyDown={keyPress} />
        <SketchPicker onChangeComplete={pickColor} color={pickedColor} />
      </div>
    </div>
  );
}

export default ColorSelecter;
