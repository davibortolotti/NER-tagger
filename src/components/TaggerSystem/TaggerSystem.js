import React, { useState, useLayoutEffect, useEffect } from "react";
import Tagger from "../Tagger/Tagger.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaggerSystem.css";
import TagCreator from "../TagCreator/TagCreator.js";
import axios from "axios";

import nextIcon from "../../move-to-next.svg";
import prevIcon from "../../move-to-prev.svg";

function TaggerSystem() {
  const backendUrl = "http://10.0.0.186:3001/project";
  const [ents, setEnts] = useState([]);

  const [spans, setSpans] = useState([]);
  const [text, setText] = useState(null);
  const [samples, setSamples] = useState([]);
  const [currentSample, setCurrentSample] = useState();
  const [counter, setCounter] = useState(0);

  const nextText = () => {
    updateSampleSpans();
    var newCounter = counter + 1;
    setCounter(newCounter);
    getCurrentSampledata(samples[newCounter]);
  };

  const previousText = () => {
    updateSampleSpans();
    var newCounter = counter - 1;
    setCounter(newCounter);
    getCurrentSampledata(samples[newCounter]);
  };

  useEffect(() => {
    axios.get(`${backendUrl}/1/texts/`).then(response => {
      var projectSamples = response.data;
      setSamples(projectSamples);
      getCurrentSampledata(projectSamples[counter]);
    });
    axios.get(`${backendUrl}/1/types/`).then(response => {
      var projectTypes = response.data;
      setEnts(projectTypes);
    });
  }, []);

  const getCurrentSampledata = sampleId => {
    axios.get(`${backendUrl}/1/texts/${sampleId}`).then(response => {
      var currentSample = response.data;
      setCurrentSample(currentSample);
      setText(currentSample.text);
      currentSample.annotations
        ? setSpans(currentSample.annotations)
        : setSpans([]);
    });
  };

  const updateSampleSpans = () => {
    var newSample = currentSample;
    var id = newSample["_id"];
    delete newSample["_id"];
    newSample.annotations = spans;
    axios.put(`${backendUrl}/1/texts/${id}`, newSample, res => {
      return res;
    });
  };

  const createTagType = (newEnt, rgb) => {
    const newType = {
      type: newEnt.toLowerCase(),
      color: rgb
    };
    axios.post(`${backendUrl}/1/types/`, newType).then(res => {
      newType._id = res.data.created._id;
    });

    setEnts(prevState => {
      return [...prevState, newType];
    });
  };

  const removeTagType = removeEnt => {
    if (
      window.confirm(
        "Deseja realmente apagar esta tag? Todos os elementos taggeados com ela serão perdidos."
      )
    ) {
      var id;
      setEnts(prevState => {
        id = prevState.filter(e => {
          return e.type === removeEnt;
        })[0]._id;
        axios.delete(`${backendUrl}/1/types/${id}`, res => {});
        return prevState.filter(e => {
          return e.type !== removeEnt;
        });
      });
      setSpans(prevSpans => {
        return prevSpans.filter(e => e.type !== removeEnt.toUpperCase());
      });
    }
  };

  var buttons = [];
  if (samples[counter - 1]) {
    buttons.push(
      <button
        className="arrow_button"
        onClick={previousText}
        key="previousButton"
      >
        <img src={prevIcon} />
      </button>
    );
  }

  if (samples[counter + 1]) {
    buttons.push(
      <button className="arrow_button" onClick={nextText} key="nextButton">
        <img src={nextIcon} fill="currentColor" />
      </button>
    );
  }

  return (
    <div className="tagger-system">
      <div>
        {/* <header className="header">
          <button>Add content</button>
        </header> */}

        <div className="content">
          <div className="buttons">{buttons}</div>

          <Tagger text={text} ents={ents} spans={spans} setSpans={setSpans} />
        </div>
      </div>

      <TagCreator
        createTagType={createTagType}
        removeTagType={removeTagType}
        ents={ents}
      />
    </div>
  );
}

export default TaggerSystem;
