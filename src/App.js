import React, { useState, useEffect } from "react";
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

  const [text, setText] = useState("teste");

  useEffect(() => {
    axios.get("http://localhost:3001/").then(function(response) {
      // handle success
      setText(response.data);
    });
  });

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
          <Tagger text={text} ents={ents} />
        </div>
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
