<<<<<<< HEAD
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages
import QuoteForm from "./components/FuelQuoteForm/quoteForm"

function App(){
    return (
        <div className='App'>
            <BrowserRouter>
            <div className='Pages'>
                <Routes>
                    <Route
                    path="/"
                    element={<QuoteForm/>}
                    />
                </Routes>
            </div>
            </BrowserRouter>
        </div>
    );
}

=======
import React from 'react';
import './App.css';
import LoginSignup from './components/LoginSignup/login';
import ClientProfileManagement from './components/ClientProfileManagement/ClientProfileManagement';
import History from './components/FuelQuoteHistory/fuelQuoteHistory';
import FuelQuoteForm from './components/FuelQuoteForm/quoteForm'

function App() {
  return (
    <div className="App">
      <ClientProfileManagement />
      {/* <LoginSignup /> */}
      {/* <History /> */}
      {/* <FuelQuoteForm /> */}
    </div>
  );
}
>>>>>>> origin/new-main
export default App;