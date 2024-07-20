import React from 'react';
import App from './App';
import { CurrentUserContextProvider } from "../../shared-library/src/index";

function MainApp() {
  return (
    <CurrentUserContextProvider>
      <App/>
    </CurrentUserContextProvider>
  );
}

export default MainApp;
