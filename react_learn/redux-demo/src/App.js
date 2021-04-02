import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function Example() {
 // Declare a new state variable, which we'll call "count"
 const [count, setCount] = useState(0)
 useEffect(() => {
  // Update the document title using the browser API
  document.title = `You clicked ${count} times`
 }, [count])
 return (
  <div>
  <p>You clicked {count} times</p>



  
  <button onClick={() => setCount(count + 1)}>
  Click me
  </button>
  </div>
 )
}

function App() {
  return (
    <div className="App">
      <Example></Example>
      <header className="App-header">      
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
