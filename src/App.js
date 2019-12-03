import React from "react";
import logo from "./logo.svg";
import Tagger from "./components/Tagger.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tagger
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque fringilla quis velit eget laoreet. Suspendisse tincidunt non dui eget dictum. 
        Aliquam elementum diam tempor lorem fringilla, vitae ultricies lectus congue. Donec bibendum 
        justo vitae aliquet rutrum. Praesent eleifend risus non velit bibendum, maximus placerat massa efficitur. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed varius mauris. Fusce felis est, tristique 
        sit amet dictum non, aliquam vel ligula.`}
          ents={[
            { type: "g-struc", color: { r: 166, g: 226, b: 45 } },
            { type: "prop", color: { r: 67, g: 198, b: 252 } },
            { type: "value", color: { r: 47, g: 187, b: 171 } },
            { type: "citation", color: { r: 255, g: 102, b: 255 } },
            { type: "fig-ref", color: { r: 204, g: 153, b: 0 } }
          ]}
        />
      </header>
    </div>
  );
}

export default App;
