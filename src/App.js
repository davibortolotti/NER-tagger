import React, { useState } from "react";
import Tagger from "./components/Tagger/Tagger.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TagCreator from "./components/TagCreator/TagCreator.js";

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
          <Tagger
            text={`Apple Inc. (NASDAQ: AAPL; NYSE: AAPL; anteriormente Apple Computer, Inc.) é uma empresa multinacional norte-americana que tem o objetivo de projetar e comercializar produtos eletrônicos de consumo, software de computador e computadores pessoais. Os produtos de hardware mais conhecidos da empresa incluem a linha de computadores Macintosh, iPod, iPhone, iPad, Apple TV e o Apple Watch. Os softwares incluem o sistema operacional macOS, o navegador de mídia iTunes, suíte de software multimídia e criatividade iLife, suíte de software de produtividade iWork, Aperture, um pacote de fotografia profissional, Final Cut Studio, uma suíte de vídeo profissional, produtos de software, Lógica Studio, um conjunto de ferramentas de produção musical, navegador Safari e o iOS, um sistema operacional móvel.`}
            ents={ents}
          />
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
