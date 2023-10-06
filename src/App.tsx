import React, {} from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from "./theme";
import Home from "./pages/Home/index.tsx";

import "./styles/App.scss";

const App = () => {
    return (
      <ChakraProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </div>
      </ChakraProvider>
  );
}

export default App;
