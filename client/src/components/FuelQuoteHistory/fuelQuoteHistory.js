// fuelQuoteHistory.tsx
import { useEffect, useState, React } from 'react';
import './fuelQuoteHistory.css'

// components
import QuoteHistoryDetails from './quoteHistoryDetails'
// import FormDetails from '../formDetails';
// import FormDetails from '../FuelQuoteForm/formDetails';

const History = () => {

    const [quotes, setQuotes] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const getUserIdFromCookie = () => {
            const cookies = document.cookie.split('; ');
            for (let cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name === 'userId') {
                    setUserId(value);
                    break;
                }
            }
        };

        const fetchQuotes = async () => {
            getUserIdFromCookie();
            if (userId) {
                const response = await fetch(`/api/quoteForm/${userId}`);
                const data = await response.json();
                setQuotes(data);
            }
        };

        fetchQuotes();
    }, [userId]);

    return (
        <div className="container">
            <table className="table">
                <caption className="caption">
                    <h1>Fuel Quote History</h1>
                </caption>
                <thead>
                    <tr>
                        <th>Gallons Requested</th>
                        <th>Delivery Address</th>
                        <th>Delivery Date</th>
                        <th>Suggested Price / gallon</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes && quotes.map((quote) => (
                        <QuoteHistoryDetails key={quote._id} quoteHistory={quote} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;