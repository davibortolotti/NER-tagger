import React, { useState, useLayoutEffect, useEffect } from "react";
import Tagger from "./components/Tagger/Tagger.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TagCreator from "./components/TagCreator/TagCreator.js";
import axios from "axios";

function App() {
  const [ents, setEnts] = useState([
    {
      type: "person",
      color: {
        r: 100,
        g: 200,
        b: 300
      }
    }
  ]);

  const [spans, setSpans] = useState([]);

  const [text, setText] = useState(null);
  const refreshText = () => {
    axios
      .get("http://127.0.0.1:3001/project/1/texts/randomUnannotated")
      .then(function(response) {
        setText(response.data[0].text);

        if (response.data[0].annotations) {
          setSpans(response.data[0].annotations);
        } else {
          setSpans([]);
        }
      });
  };

  useEffect(() => {
    refreshText();
  }, []);

  const createTagType = (newEnt, rgb) => {
    setEnts(prevState => {
      return [
        ...prevState,
        {
          type: newEnt.toLowerCase(),
          color: rgb
        }
      ];
    });
  };

  const removeTagType = removeEnt => {
    setEnts(prevState => {
      return prevState.filter(e => {
        return e.type !== removeEnt;
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <Tagger text={text} ents={ents} spans={spans} />
        </div>
        <button onClick={refreshText}>next</button>
        <TagCreator
          createTagType={createTagType}
          removeTagType={removeTagType}
          ents={ents}
        />
      </header>
    </div>
  );
}

export default App;
