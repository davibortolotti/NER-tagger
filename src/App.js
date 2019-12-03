import React from 'react';
import logo from './logo.svg';
import Tagger from './components/Tagger.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tagger text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque fringilla quis velit eget laoreet. Suspendisse tincidunt non dui eget dictum. 
        Aliquam elementum diam tempor lorem fringilla, vitae ultricies lectus congue. Donec bibendum 
        justo vitae aliquet rutrum. Praesent eleifend risus non velit bibendum, maximus placerat massa efficitur. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed varius mauris. Fusce felis est, tristique 
        sit amet dictum non, aliquam vel ligula.`} />

      </header>
    </div>
  );
}

export default App;
