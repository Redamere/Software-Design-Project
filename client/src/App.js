import React from 'react';
import './App.css';
import LoginSignup from './components/LoginSignup/login';
import ClientProfileManagement from './components/ClientProfileManagement/ClientProfileManagement';
import History from './components/FuelQuoteHistory/fuelQuoteHistory';
import quoteForm from './components/FuelQuoteForm/quoteForm'

function App() {
  return (
    <div className="App">
      <ClientProfileManagement />
      {/* <LoginSignup /> */}
      {/* <History /> */}
      {/* <quoteForm /> */}
    </div>
  );
}

export default App;
