import './App.css';
import Container_non from "./containers/Container_non";
import Container_thunk from "./containers/Container_thunk";
import Container_promise from "./containers/Container_promise";
import {useState} from "react";
import Container_saga from "./containers/Container_saga";

function App() {
    const [lib, setLib] = useState("none");

  return (
    <div className="App">
      <header className="App-header">
          <ul>
              <li><Link setLib={setLib}>none</Link></li>
              <li><Link setLib={setLib}>thunk</Link></li>
              <li><Link setLib={setLib}>promise</Link></li>
              <li><Link setLib={setLib}>saga</Link></li>
          </ul>
          { lib === "none" && <Container_non /> }
          { lib === "thunk" && <Container_thunk /> }
          { lib === "promise" && <Container_promise /> }
          { lib === "saga" && <Container_saga /> }
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
