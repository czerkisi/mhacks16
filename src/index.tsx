import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from "./store/store";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import GradingPage from "./GradingPage/GradingPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <div>
                  <Header/>
                  <Routes>
                      <Route path="/" Component={Home} />
                      <Route path="/grading" Component={GradingPage}/>
                  </Routes>
              </div>
          </Router>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
