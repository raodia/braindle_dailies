import "./App.css";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import MainScreen from "./components/MainScreen/MainScreen";


const App = (props) => {
  return (

    <div className="App">
      <Header />
      <Navbar />
      <MainScreen state={props.puzzlesState} puzzlesDispatch={props.puzzlesDispatch}/>
      {/* <TypingGame /> */}
    </div>

  );
};

export default App;
