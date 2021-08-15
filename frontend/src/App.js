import React from 'react';
import './App.css';
import Payment from './components/payment_page';
import Success from './components/success';
import Error from './components/error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>
        <Router>
       <Route exact path="/">
        <Payment/>
       </Route>

       <Route  path="/success">
        <Success/>
       </Route>

       <Route path="/error">
        <Error/>
       </Route>

       </Router>
    </>
  )
}

export default App




