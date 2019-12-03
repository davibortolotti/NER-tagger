import React, { ReactDOM, Component } from "react";
import Taggy from "react-taggy";
import TaggerModal from "./TaggerModal";
import Container from "react-bootstrap/Container";

export default class Tagger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      modal: false,
      modalPosition: { top: null, left: null }
    };
    this.setTag = this.setTag.bind(this);
  }

  checkIfTagAlreadyExists = (list, newElement) => {
    return false;

    return list.some(
      e => (e.start === newElement.start) & (e.end === newElement.end)
    );
  };

  showModal = () => {
    this.setState({ modal: true });
    console.log("modal");
  };

  hideModal = () => {
    this.setState({ modal: false });
    console.log("modal off");
  };

  // updateDimensions = (e) => {
  //     var windowX = window.clientX;

  //     if (this.state.modalPosition & this.state.modalPosition.left + 400 < windowX) {
  //         console.log('foi')
  //         this.setState( (prevState) => {
  //             this.setState({modalPosition: {top: prevState.top, left: prevState.left - 400}})
  //         })
  //     }

  //     //
  // };

  measureElement = element => {
    const DOMNode = ReactDOM.findDOMNode(element);
    return {
      width: DOMNode.offsetWidth,
      height: DOMNode.offsetHeight
    };
  };

  onSelect = e => {
    if (e.target.nodeName == "MARK") {
      var siblingOffset = 0;
      siblingOffset = this.calculateSiblingsOffset(
        e.target.parentNode,
        siblingOffset
      );
      this.setState(prevState => {
        return {
          selected: prevState.selected.filter(e => e.start !== siblingOffset)
        };
        this.setState({ selectedExistant: true });
      });
    }

    var baseIndex = window.getSelection().baseOffset;
    var lastIndex = window.getSelection().focusOffset;
    var wordSize = lastIndex - baseIndex;
    if (wordSize <= 0) {
      this.hideModal();
      return;
    }
    var elem = window.getSelection().baseNode.parentNode;
    var offset = window.getSelection().baseOffset;
    if (
      ((elem.parentNode.nodeName == "MARK") & (elem.nodeName == "SPAN")) |
      (elem.nodeName == "MARK")
    ) {
      return;
    }

    var xPosition = e.clientX;
    var yPosition = e.clientY;
    var left = xPosition;
    var right = "none";
    // console.log(xPosition);

    this.showModal();

    // console.log(modalWidth);
    // // console.log(window.innerWidth)
    // if ((xPosition + self.modalWidth) > window.innerWidth) {
    //     left = 'none';
    //     right = 0;
    //     // console.log('foi')
    // }

    this.setState({
      modalPosition: { top: yPosition, left: left, right: right }
    });
    offset = this.calculateSiblingsOffset(elem, offset);
    var start = offset;
    var end = offset + wordSize;
    this.setState({ selection: { start, end } });
  };

  calculateSiblingsOffset = (elem, offset) => {
    while ((elem = elem.previousSibling)) {
      offset += elem.textContent.length;
      if (elem.children.length > 0 && elem.children[0].nodeName === "MARK") {
        offset -= elem.children[0].children[0].textContent.length;
      }
    }
    return offset;
  };

  setTag(e) {
    this.setState(
      {
        test: e.target.value
      },
      () => {
        console.log(this.state);
      }
    );
    var newSelected = {
      start: this.state.selection.start,
      end: this.state.selection.end,
      type: e.target.value
    };

    this.setState(prevState => ({
      selected: [...prevState.selected, newSelected].sort(this.sortTags)
    }));
    this.hideModal();
  }

  sortTags = (a, b) => {
    if (a.start > b.start) {
      return 1;
    }
    if (a.start < b.start) {
      return -1;
    }
    return 0;
  };

  render() {
    const spans = this.state.selected;

    const ents = [
      { type: "g-struc", color: { r: 166, g: 226, b: 45 } },
      { type: "prop", color: { r: 67, g: 198, b: 252 } },
      { type: "value", color: { r: 47, g: 187, b: 171 } },
      { type: "citation", color: { r: 255, g: 102, b: 255 } },
      { type: "fig-ref", color: { r: 204, g: 153, b: 0 } }
    ];

    var modal = null;
    console.log(this.state.modal);
    if (this.state.modal === true) {
      modal = (
        <TaggerModal
          position={this.state.modalPosition}
          handler={this.setTag}
          ents={ents}
          ref={r => (this.tagRef = r)}
        />
      );
    }

    return (
      <Container
        fluid={true}
        onMouseUp={this.onSelect}
        className="white_taggy_text"
      >
        {modal}
        <Taggy text={this.props.text} spans={spans} ents={ents} />
      </Container>
    );
  }
}
