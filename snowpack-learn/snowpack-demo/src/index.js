import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
    return (
      <div>hello world</div>
    );
}

window.addEventListener("load", () =>
  ReactDOM.render(<App />, document.getElementById("app"))
);