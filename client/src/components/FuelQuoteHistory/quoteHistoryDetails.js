const quoteHistoryDetails = ({ quoteHistory }) => {
    return (
        <div className="quote-details">
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
                    <tr>
                        <td>{quoteHistory.FormGallons}</td>
                        <td>{quoteHistory.FormAddress}</td>
                        <td>{quoteHistory.FormDate}</td>
                        <td>{quoteHistory.FormPrice}</td>
                        {/* <td>250</td> */}
                    </tr>
                    {/* <tr>
                        <td>200</td>
                        <td>456 Elm St, Dallas, TX</td>
                        <td>2024-02-15</td>
                        <td>2.4</td>
                        <td>480</td>
                    </tr>
                    <tr>
                        <td>150</td>
                        <td>789 Pine St, Austin, TX</td>
                        <td>2024-02-10</td>
                        <td>2.6</td>
                        <td>390</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default quoteHistoryDetails