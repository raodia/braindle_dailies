import "./App.css";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import MainScreen from "./components/MainScreen/MainScreen";
import { BrowserRouter } from "react-router-dom";


const App = () => {
  return (
  <BrowserRouter>

    <div className="App">
      <Header />
      <Navbar />
      <MainScreen />
      {/* <TypingGame /> */}
    </div>
  </BrowserRouter>

  );
};

export default App;
