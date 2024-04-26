import { BrowserRouter, Routes, Route } from 'react-router-dom';


//pages
import QuoteForm from "./components/FuelQuoteForm/quoteForm"
import Login from './components/Login/login';
import History from './components/FuelQuoteHistory/fuelQuoteHistory';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import Signup from './components/Signup/signup';
import ClientProfileManagement from './components/ClientProfileManagement/ClientProfileManagement';
import EditProfile from './components/EditProfile/editProfile';
import NewQuoteForm from './components/FuelQuoteForm1/fuelQuoteForm';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <div className='Pages'>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Home />
                                    <Footer />
                                </>
                            }
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
                        <Route
                            path="/signup"
                            element={<Signup />}
                        />
                        <Route
                            path="/editProfile"
                            element={<EditProfile />}
                        />
                        <Route
                            path="/quoteForm"
                            element={<NewQuoteForm />}
                        />
                    </Routes>

                </div>

            </BrowserRouter>
        </div>
    );
}
export default App;