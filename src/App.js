import "./App.css";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import MainScreen from "./components/MainScreen/MainScreen";


const App = (props) => {
  let currentWindowWidth = window.screen.width;
  return (

    <div className="App">
      <Header />
      {
        currentWindowWidth > 1000 ?
        (<Navbar />)
        :
        (<img width="70em" src="https://i.pinimg.com/736x/31/df/a4/31dfa47e92e8b5ef7fd902c93c5204a3.jpg" alt="pen" />)
      }
      <MainScreen state={props.puzzlesState} puzzlesDispatch={props.puzzlesDispatch} />
    </div>

  );
};

export default App;
