import React, { ReactDOM, Component, createRef } from "react";
import Taggy from "../../react-taggy/src";
import TaggerModal from "../TaggerModal/TaggerModal";
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

  taggerRef = createRef();

  toggleModal = () => {
    this.setState(prevState => {
      return {
        modal: !prevState.modal
      };
    });
  };

  measureElement = element => {
    const DOMNode = ReactDOM.findDOMNode(element);
    return {
      width: DOMNode.offsetWidth,
      height: DOMNode.offsetHeight
    };
  };

  onSelect = e => {
    var sel = window.getSelection();
    var baseIndex = sel.baseOffset;
    var lastIndex = sel.focusOffset;

    if (baseIndex > lastIndex) {
      baseIndex = sel.focusOffset;
      lastIndex = sel.baseOffset;
    }
    if (
      sel
        .getRangeAt(0)
        .cloneContents()
        .textContent.slice(-1) === " "
    ) {
      lastIndex -= 1;
    }
    var wordSize = lastIndex - baseIndex;
    var elem = sel.baseNode.parentNode;
    var offset = baseIndex;

    var closestMark = elem.closest("mark");
    if (
      ((wordSize === 0) & !closestMark) |
      (sel.getRangeAt(0).startContainer !== sel.getRangeAt(0).endContainer)
    ) {
      return;
    } else if (closestMark) {
      var siblingOffset = 0;
      siblingOffset = this.calculateSiblingsOffset(
        closestMark.parentNode,
        siblingOffset
      );
      if (!this.state.selectForChange) {
        this.setState(prevState => {
          return {
            selectForChange: prevState.selected.filter(
              e => e.start === siblingOffset
            )[0]
          };
        });
      } else if (wordSize <= 0) {
        this.toggleModal();
        // this.setState({ selectForChange: null, selection: null });

        return;
      }
    }

    var xPosition = e.clientX;
    var yPosition = e.clientY;
    var left = xPosition;
    var right = "none";

    this.toggleModal();

    this.setState({
      modalPosition: { top: yPosition, left: left, right: right }
    });

    offset = this.calculateSiblingsOffset(elem, offset);
    var start = offset;
    var end = offset + wordSize;

    this.setState({ selection: { start, end } });
  };

  calculateSiblingsOffset = (elem, offset) => {
    if (elem.previousSibling) {
      if (elem.parentNode.nodeName === "MARK") {
        elem = elem.parentNode.parentNode;
      }
    }

    while ((elem = elem.previousSibling)) {
      offset += elem.textContent.length;
      if (elem.children && elem.children.length > 0) {
        if (elem.children[0].nodeName === "MARK") {
          offset -= elem.children[0].children[0].textContent.length;
        }
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
  };

  deleteTag = () => {
    var toDelete = {
      start: this.state.selectForChange.start,
      end: this.state.selectForChange.end
    };
    this.setState(prevState => ({
      selected: prevState.selected.filter(
        e => (e.start !== toDelete.start) & (e.end !== toDelete.end)
      )
    }));
    this.setState({ selectForChange: null });
  };

  changeTag = e => {
    e.persist();
    var toChange = {
      start: this.state.selectForChange.start,
      end: this.state.selectForChange.end,
      type: e.target.value
    };
    this.setState(prevState => ({
      selected: [
        ...prevState.selected.filter(
          s => (s.start !== toChange.start) & (s.end !== toChange.end)
        ),
        toChange
      ].sort(this.sortTags)
    }));
    this.setState({ selectForChange: null });
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
    var handler = this.setTag;
    if (this.state.selectForChange) {
      deleteTag = this.deleteTag;
      handler = this.changeTag;
    }
    if (this.state.modal === true) {
      modal = (
        <TaggerModal
          position={this.state.modalPosition}
          handler={handler}
          deleteTag={deleteTag}
          ents={this.props.ents}
          toggleModal={this.toggleModal}
          width={
            this.taggerRef.current.offsetWidth -
            parseInt(this.taggerRef.current.style.paddingRight)
          }
        />
      );
    }

    return (
      <Container ref={this.taggerRef} fluid={true} className="white_taggy_text">
        {modal}
        <div onMouseUp={this.onSelect}>
          <Taggy text={this.props.text} spans={spans} ents={this.props.ents} />
        </div>
      </Container>
    );
  }
}
