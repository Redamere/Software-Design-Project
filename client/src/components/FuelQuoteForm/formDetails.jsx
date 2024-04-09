
//This is a form structure put into a JSX component to display all the properties from a published quote form. Initially used for testing, still needs to be polished for production use.
//NOT FINISHED


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