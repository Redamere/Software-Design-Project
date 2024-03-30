const formDetails = ({quoteForm}) => {
    return (
        <div className="quoteform-details">
            <h4>{quoteForm.FormAddress}</h4>
            <h4>{quoteForm.FormDate}</h4>
            <h4>{quoteForm.FormGallons}</h4>
            <h4>{quoteForm.FormPrice}</h4>
            <p>{quoteForm.createdAt}</p>
        </div>
    )
}

export default formDetails;