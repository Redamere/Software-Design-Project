import React from 'react';
import './quoteForm.css';

// const router = require("./routes/QuoteForm")
import {useEffect, useState} from 'react'

//components
import FormDetails from './formDetails';
//import QuoteForm from "./components/FuelQuoteForm/quoteForm"

//documentation


const QuoteForm = () => {
const [gallons, setGallons] = useState('')
const [date, setDate] = useState('')
const [address, setAddress] = useState('')
const [price, setPrice] = useState('')
const [due, setDue] = useState('')
const [error, setError] = useState('')
const [quoteForms, setQuoteForms] = useState('')




// useEffect(() => {

//     const fetchQuoteForm = async () => {
//         const response = await fetch("/api/quoteForm")
//         const json = await response.json()

//         if (response.ok){
//             setQuoteForms(json)
//             // console.log(json)
//         }
        
//     }
//     fetchQuoteForm()
// }, [])

const handleSubmit = async (e)=> {
  e.preventDefault()
  const quoteform = {gallons, date, address, price}

  const response = await fetch('/api/quoteForm' , 
  {
    method: "POST",
    body: JSON.stringify(quoteform), 
    headers: {
      'Content-type': 'application/json'
    }
  }) 
  const json = await response.json() 
  console.log("got here")
  if (!response.ok){ //return the error if there is one
    setError(json.error)
  }
  if (response.ok){
    setGallons('')
    setDate('')
    setAddress('')
    setPrice('')
    setDue('')
    setError(null)
    console.log("New Form Created", json)
  }
}

    return (
        <div>
        <meta charSet="UTF-8" />
        <h1 id="title">Fuel Quote Form</h1>
        {/*Must have  --
    Gallons requested (numeric, required)
    Delivery Address (Non-editable, comes from client profile)
    Delivery Date (Calendar, Date Picker)
    Suggested Price/gallon (numberic non-editable, price will be calculated 
        by pricing module -- We are not building this yet (2/17/2024))
    -Total Amount Due (numeric non-editable, calculated [gallons * price])
*/} 
        <div className="testDetails">
            <p>Test details</p>
            {quoteForms && quoteForms.map((thisQuoteForm) => (
              <FormDetails key = {quoteForms._id} quoteForms = {thisQuoteForm}/>
            ))}
        </div>


          <div>
              <form className="createForm" onSubmit={handleSubmit}>
          <div className="grid-containerE">
            <div className="grid-itemB">
              <form>
                <label htmlFor="gallonsRequested">Gallons Requested:</label>
                <input type="text" id="gallonsRequested" name="gallonsRequested" placeholder="How many gallons?" required onChange={(e) => setGallons(e.target.value)} value={gallons}/>
                <p>How many gallons are you requesting?</p>
                <p/>
                {/* <button name="gallonsRequested" value="gallonsRequested" type="submit">Submit</button> */}
              </form>
            </div>

            <div className="grid-itemB">
              <form>
                <label htmlFor="deliveryDate">Delivery Date:</label>
                <input type="date" id="deliveryDate" name="deliveryDate" onChange={(e)=>setDate(e.target.value)} value={date}/>
                <p>What delivery date would you expect?</p>
                {/* <form action method="post"><button name="dateSubmit" value="dateSubmit" type="submit">Submit</button></form> */}
              </form>
            </div>
          </div>


        <div className="grid-containerD">
          <div className="grid-itemB">
            <form>
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <input type="text" name="deliveryAddress" id="deliveryAddress" placeholder="Your delivery address" onChange={(e)=>setAddress(e.target.value)} value={address}/> 
              <p>This is the delivery Address where your product will be delivered. (Address is default based on customer profile)</p>
              {/* <form action method="get"><button name="deliveryAddress" value="deliveryAddress" type="submit">Get My Address</button></form> */}
            </form>
          </div>

          <div className="grid-itemB">
            <form>
              <label htmlFor="suggestedPrice">Suggested Price</label>
              <input type="text" name="suggestedPrice" id="suggestedPrice" placeholder="Your suggested price" onChange={(e)=>setPrice(e.target.value)} value={price} /> 
              <p>This is the suggested price per gallon of your product, automatically calculated</p>
              {/* <form action method="get"><button name="getPrice" value="getPrice" type="submit">Calculate Suggested Price</button></form> */}
            </form>
          </div>

          <div className="grid-itemB">
            {/* <h2 style="text-align: left;">Total Amount Due</h2> */}
            <form>
              <label htmlFor="totalAmountDue">Total Amount Due</label>
              <input type="text" name="totalAmountDue" id="totalAmountDue" placeholder="Your total amount due" readOnly value ="$400" />
              <p>Total calculated amount due based on price and amount of gallons</p>
              {/* <form action method="get"><button name="getTotalAmount" value="getTotalAmount" type="submit">Calculated Total Ammunt Due</button></form> */}
            </form>
          </div>
        </div>
        <button type="submit">Submit Form</button>
              </form>
        
        
        </div>
      </div>
    ); }


export default QuoteForm;
