// quoteHistoryDetails.js
const QuoteHistoryDetails = ({ quoteHistory }) => {
    return (
        <tr>
            <td>{quoteHistory.FormGallons}</td>
            <td>{quoteHistory.FormAddress}</td>
            <td>{quoteHistory.FormDate}</td>
            <td>{quoteHistory.FormPrice}</td>
            {/* <td>{quoteHistory.TotalPrice}</td> */}
        </tr>
    )
}

export default QuoteHistoryDetails;