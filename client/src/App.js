import React, { useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store";

import { theme } from "./themes/theme";
import Routes from "./routes";

function App() {
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const { data } = await axios.get('/csrf-token');
        axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
        axios.defaults.headers.delete['X-CSRF-Token'] = data.csrfToken;
      } catch (error) {
        console.error(error);    
      }
    };
    getCsrfToken();
  }, []);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
