import React from "react";
import Tagger from "./components/Tagger/Tagger.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tagger
          text={`Apple Inc. (NASDAQ: AAPL; NYSE: AAPL; anteriormente Apple Computer, Inc.) é uma empresa multinacional norte-americana que tem o objetivo de projetar e comercializar produtos eletrônicos de consumo, software de computador e computadores pessoais. Os produtos de hardware mais conhecidos da empresa incluem a linha de computadores Macintosh, iPod, iPhone, iPad, Apple TV e o Apple Watch. Os softwares incluem o sistema operacional macOS, o navegador de mídia iTunes, suíte de software multimídia e criatividade iLife, suíte de software de produtividade iWork, Aperture, um pacote de fotografia profissional, Final Cut Studio, uma suíte de vídeo profissional, produtos de software, Lógica Studio, um conjunto de ferramentas de produção musical, navegador Safari e o iOS, um sistema operacional móvel.`}
          ents={[
            { type: "empresa", color: { r: 166, g: 226, b: 45 } },
            { type: "produto", color: { r: 67, g: 198, b: 252 } },
            { type: "verbo", color: { r: 47, g: 187, b: 171 } }
            //   { type: "citation", color: { r: 255, g: 102, b: 255 } },
            //   { type: "fig-ref", color: { r: 204, g: 153, b: 0 } }
          ]}
        />
      </header>
    </div>
  );
}

export default App;
