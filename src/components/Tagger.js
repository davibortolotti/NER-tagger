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
  }

  checkIfTagAlreadyExists = (list, newElement) => {
    return false;

    return list.some(
      e => (e.start === newElement.start) & (e.end === newElement.end)
    );
  };

  showModal = () => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  measureElement = element => {
    const DOMNode = ReactDOM.findDOMNode(element);
    return {
      width: DOMNode.offsetWidth,
      height: DOMNode.offsetHeight
    };
  };

  onSelect = e => {
    var baseIndex = window.getSelection().baseOffset;
    var lastIndex = window.getSelection().focusOffset;
    var wordSize = lastIndex - baseIndex;
    var elem = window.getSelection().baseNode.parentNode;
    var offset = window.getSelection().baseOffset;
    console.log(elem.nodeName);

    if ((wordSize == 0) & (elem.nodeName !== "MARK")) {
      this.hideModal();
      return;
    }

    if (
      ((elem.parentNode.nodeName == "MARK") & (elem.nodeName == "SPAN")) |
      (elem.nodeName == "MARK")
    ) {
      var siblingOffset = 0;
      siblingOffset = this.calculateSiblingsOffset(
        e.target.parentNode,
        siblingOffset
      );
      if (!this.state.selectForDelete) {
        this.setState(prevState => {
          return {
            selectForDelete: prevState.selected.filter(
              e => e.start === siblingOffset
            )[0]
          };
        });
      } else if (wordSize <= 0) {
        this.hideModal();
        this.setState({ selectForDelete: null, selection: null });
        return;
      }
    }

    var xPosition = e.clientX;
    var yPosition = e.clientY;
    var left = xPosition;
    var right = "none";

    this.showModal();

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

  setTag = e => {
    var newSelected = {
      start: this.state.selection.start,
      end: this.state.selection.end,
      type: e.target.value
    };

    this.setState(prevState => ({
      selected: [...prevState.selected, newSelected].sort(this.sortTags)
    }));
    this.hideModal();
  };

  deleteTag = () => {
    console.log(this.state);
    var toDelete = {
      start: this.state.selectForDelete.start,
      end: this.state.selectForDelete.end
    };
    console.log(toDelete);

    this.setState(prevState => ({
      selected: prevState.selected.filter(
        e => (e.start !== toDelete.start) & (e.end !== toDelete.end)
      )
    }));
    this.setState({ selectForDelete: null });
    this.hideModal();
  };

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

    var modal = null;
    var deleteTag = null;
    if (this.state.selectForDelete) {
      deleteTag = this.deleteTag;
    }
    if (this.state.modal === true) {
      modal = (
        <TaggerModal
          position={this.state.modalPosition}
          handler={this.setTag}
          deleteTag={deleteTag}
          ents={this.props.ents}
          ref={r => (this.tagRef = r)}
          hideModal={this.hideModal}
        />
      );
    }

    return (
      <Container fluid={true} className="white_taggy_text">
        {modal}
        <div onMouseUp={this.onSelect}>
          <Taggy text={this.props.text} spans={spans} ents={this.props.ents} />
        </div>
      </Container>
    );
  }
}
