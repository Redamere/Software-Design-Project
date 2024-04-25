// quoteHistoryDetails.js
import "./quoteHistoryDetails.css"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
const QuoteHistoryDetails = ({ quoteHistory }) => {
    return (
        <tr>
            <td>{quoteHistory.FormGallons}</td>
            <td>{quoteHistory.FormAddress}</td>
            <td>{quoteHistory.FormDate}</td>
            <td>{quoteHistory.FormPrice}</td>
            <td>{formatDistanceToNow(new Date(quoteHistory.createdAt), { addSuffix: true })}</td>
            {/* <td>{quoteHistory.TotalPrice}</td> */}
            {/* <td>250</td> */}
        </tr>
    )
}

export default QuoteHistoryDetails;