import React from 'react';
import './App.css';
import LoginSignup from './components/LoginSignup/login';
import ClientProfileManagement from './components/ClientProfileManagement/ClientProfileManagement';
import History from './components/FuelQuoteHistory/fuelQuoteHistory';
import FuelQuoteForm from './components/FuelQuoteForm/quoteForm'

function App() {
  return (
    <div className="App">
      {/* <ClientProfileManagement /> */}
      <LoginSignup />
      {/* <History /> */}
      {/* <FuelQuoteForm /> */}
    </div>
  );
}
export default App;