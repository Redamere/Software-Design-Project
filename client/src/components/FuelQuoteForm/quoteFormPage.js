import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages
import QuoteForm from './fuelQuoteForm/quoteForm'

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

export default App;