// fuelQuoteHistory.tsx
import { useEffect, useState, React } from 'react';
import './fuelQuoteHistory.css'

// components
import QuoteHistoryDetails from './quoteHistoryDetails'

const History = () => {

    const [quotes, setQuotes] = useState(null)

    useEffect(() => {
        const fetchQuotes = async () => {
            const response = await fetch('/api/quoteHistory')
            const json = await response.json()

            if (response.ok) {
                setQuotes(json)
                console.log(response)
            }
        }

        fetchQuotes()
    }, [])

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
                        {/* <th>Total Amount Due</th> */}
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