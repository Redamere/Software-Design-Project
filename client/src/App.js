import { BrowserRouter, Routes, Route } from 'react-router-dom';


//pages
import QuoteForm from "./components/FuelQuoteForm/quoteForm"
import History from './components/FuelQuoteHistory/fuelQuoteHistory';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import ClientProfileManagement from './components/ClientProfileManagement/ClientProfileManagement';
import Login from './components/LoginSignup/login';


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <div className='Pages'>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/form"
                            element={<QuoteForm />}
                        />
                        <Route
                            path="/history"
                            element={<History />}
                        />
                        <Route
                            path="/profile"
                            element={<ClientProfileManagement />}
                        />
                        <Route
                            path="/login"
                            element={<Login />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}
export default App;