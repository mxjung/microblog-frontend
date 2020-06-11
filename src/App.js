import React from 'react';
import './App.css';
import NavBox from "./NavBox";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./rootReducer";
import immerRootReducer from "./immerRootReducer";
import thunk from "redux-thunk";

const store = createStore(
  immerRootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBox />
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
