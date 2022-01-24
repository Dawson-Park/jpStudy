import './App.css';
import Container_non from "./non-middleware/Container_non";
import Container_thunk from "./thunk/Container_thunk";
import {useState} from "react";

function App() {
    const [lib, setLib] = useState("none");

  return (
    <div className="App">
      <header className="App-header">
          <ul>
              <li><Link setLib={setLib}>none</Link></li>
              <li><Link setLib={setLib}>thunk</Link></li>
              <li><Link setLib={setLib}>saga</Link></li>
          </ul>
          { lib === "none" && <Container_non /> }
          { lib === "thunk" && <Container_thunk /> }
      </header>
    </div>
  );
}

function Link({children, setLib}) {
    return <a href="" onClick={
        event => {
            event.preventDefault();
            setLib(children);
        }
    }>{children}</a>
}

export default App;
