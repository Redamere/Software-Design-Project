import { BrowserRouter, Routes, Route } from 'react-router-dom';


//pages
import QuoteForm from "./components/FuelQuoteForm/quoteForm"
import History from './components/FuelQuoteHistory/fuelQuoteHistory';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';



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
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;