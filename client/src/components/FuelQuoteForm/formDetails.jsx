const FormDetails = ({quoteForms}) => {
    return (
        <div className="quoteform-details">
            <h4>Address: {quoteForms.FormAddress}</h4>
            <h4>Form Date: {quoteForms.FormDate}</h4>
            <h4>Gallons: {quoteForms.FormGallons}</h4>
            <h4>Price: {quoteForms.FormPrice}</h4>
            <p>Created at: {quoteForms.createdAt}</p>
        </div>
    )
}

export default FormDetails;