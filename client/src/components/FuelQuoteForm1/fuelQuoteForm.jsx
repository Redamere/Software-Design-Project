import React, { useState, useEffect } from 'react';

const NewQuoteForm = () => {
    const [fullName, setFullName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [gallonsRequested, setGallonsRequested] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [suggestedPrice, setSuggestedPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [error, setError] = useState(null);
    const [fullAddress, setFullAddress] = useState('');
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [orderPlaced, setOrderPlaced] = useState(false)

    const getUserIdFromCookie = () => {
        const cookies = document.cookie.split(';');
        const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));
        if (userIdCookie) {
            return userIdCookie.split('=')[1];
        } else {
            console.error('User ID cookie not found');
            // Handle the case where the user ID cookie is not found
        }
    };

    useEffect(() => {
        const userId = getUserIdFromCookie();
        // Fetch user details from the server
        fetch(`/api/profile/${userId}`) // Use backticks for string interpolation
            .then((res) => res.json())
            .then((data) => {
                setUserDetails(data.profile);
                // Set state variables based on user details
                setAddress1(data.profile.address1);
                setAddress2(data.profile.address2);
                setCity(data.profile.city);
                setState(data.profile.state);
                setZipcode(data.profile.zipcode);
                setFullName(data.profile.fullName);
                let fullAddress = `${data.profile.address1}, ${data.profile.city}, ${data.profile.state}, ${data.profile.zipcode}`;
                if (data.profile.address2.trim() !== '') {
                    fullAddress += `, ${data.profile.address2}`;
                }
                setFullAddress(fullAddress);
                setUserId(userId);
            })
            .catch(error => {
                setError(error.message);
                console.error('Error fetching user details:', error);
            });
    }, []);


    const handleCalculatePrice = async (e) => {
        e.preventDefault();

        const profile = { user_id: userId, address: fullAddress, city, state, zipcode, date: deliveryDate, gallonsRequested };

        try {
            const response = await fetch('/api/quoteForm/calculate', {
                method: 'POST',
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(`Server responded with status: ${response.status} and message: ${errorText}`);
                return;
            }

            const json = await response.json();
            console.log(json);
            setSuggestedPrice(json.suggestedPricePerGallon);
            setTotalPrice(json.totalAmountDue);
            setError(null); // Reset error state to null on successful calculation

        } catch (error) {
            setError(`An error occurred while fetching: ${error.message}`);
        }
    };

    const getCurrentDate = () => {
        const today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        const year = today.getFullYear();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };


    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const profile = { user_id: userId, address: fullAddress, gallons: gallonsRequested, price: suggestedPrice, date: deliveryDate };
        console.log("placing order")
        console.log(profile)

        try {
            const response = await fetch('/api/quoteForm', {
                method: 'POST',
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(`Server responded with status: ${response.status} and message: ${errorText}`);
                return;
            }

            const json = await response.json();
            console.log(json);
            setOrderPlaced(true);
            setError(null); // Reset error state to null on successful order placement

        } catch (error) {
            setError(`An error occurred while fetching: ${error.message}`);
        }
    };


    return (
        <div
            style={{
                maxWidth: '400px',
                margin: 'auto',
                padding: '20px',
                textAlign: 'center',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
            }}
        >
            <h1 style={{ fontFamily: 'Inter', marginTop: '4.7rem', fontSize: '20px', fontWeight: '600' }}>
                Order Quote 📦
            </h1>
            <h2 style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', color: '#636D7E', marginBottom: '2rem' }}>
                Fill out the form below to get a quote
            </h2>

            {/* // add later here */}
            <form >
                <div className="form-group" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Address</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="123 Main St, Apt 1, City, State, Zipcode"
                        value={fullAddress} // Use the fullAddress state variable here
                        readOnly
                        disabled
                        style={{
                            border: '2px solid #EFF3F7',
                            borderRadius: '4px',
                            height: '45px',
                            width: '100%',
                            padding: '10px',
                            boxSizing: 'border-box',
                            marginTop: '5px',
                            marginBottom: '10px',
                            color: 'black' // This sets the text color to black
                        }}
                    />
                </div>

                <div className="form-group" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Gallons Requested</label>
                    <input
                        type="text"
                        id="gallonsRequested"
                        placeholder="Enter gallons here"
                        value={gallonsRequested}
                        onChange={(e) => setGallonsRequested(e.target.value)}
                        style={{ border: '2px solid #EFF3F7', borderRadius: '4px', height: '45px', width: '100%', padding: '10px', boxSizing: 'border-box', marginTop: '5px', marginBottom: '10px' }}
                    />
                </div>


                <div className="form-group" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', textAlign: 'left', marginBottom: '10px' }}>
                    <label htmlFor="deliveryDate" style={{ display: 'block', marginBottom: '5px' }}>Delivery Date</label>
                    <input
                        type="date"
                        id="deliveryDate"
                        value={deliveryDate}
                        min={getCurrentDate()} // Set the minimum allowed date to the current date
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        style={{
                            border: '2px solid #EFF3F7',
                            borderRadius: '4px',
                            height: '45px',
                            width: '100%',
                            padding: '10px',
                            boxSizing: 'border-box',
                            marginTop: '5px',
                            marginBottom: '10px',
                            fontFamily: 'Inter', // Set the font family to Inter
                            fontSize: '14px', // Optional: Set the font size if needed
                            fontWeight: '400' // Optional: Set the font weight if needed
                        }}
                    />
                </div>



                {!suggestedPrice && (
                    <div>
                        <button type="submit" onClick={handleCalculatePrice} className="register-btn" style={{ backgroundColor: '#2A73F0', fontFamily: 'Inter', fontWeight: '600', fontSize: '14px', color: 'white', height: '45px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            Calculate Price
                        </button>
                        {error && <div className="error" style={{ fontFamily: 'Inter', color: 'red' }}>{error}</div>}
                    </div>
                )}
                {suggestedPrice && (

                    <div className="form-group" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', textAlign: 'left', marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Suggested Price / Gallon</label>
                        <input
                            type="text"
                            id="suggestedPrice"
                            value={suggestedPrice}
                            readOnly
                            disabled
                            style={{
                                border: '2px solid #EFF3F7',
                                borderRadius: '4px',
                                height: '45px',
                                width: '100%',
                                padding: '10px',
                                boxSizing: 'border-box',
                                marginTop: '5px',
                                marginBottom: '10px',
                                backgroundColor: '#EFF3F7'
                            }}
                        />
                    </div>
                )}

                {totalPrice && (
                    <div className="form-group" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', textAlign: 'left', marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Total Price</label>
                        <input
                            type="text"
                            id="totalPrice"
                            value={totalPrice}
                            readOnly
                            disabled // This makes the field unclickable
                            style={{
                                border: '2px solid #EFF3F7',
                                borderRadius: '4px',
                                height: '45px',
                                width: '100%',
                                padding: '10px',
                                boxSizing: 'border-box',
                                marginTop: '5px',
                                marginBottom: '10px',
                                backgroundColor: '#EFF3F7' // This sets the background color to match the border
                            }}
                        />
                    </div>
                )}

                {suggestedPrice && (
                    <div>
                        <button onClick={handlePlaceOrder} type="submit" className="register-btn" style={{ backgroundColor: '#2A73F0', fontFamily: 'Inter', fontWeight: '600', fontSize: '14px', color: 'white', height: '45px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                            Place Order
                        </button>
                        {error && <div className="error" style={{ fontFamily: 'Inter', color: 'red' }}>{error}</div>}
                        {orderPlaced && !error && (
                            <div className="success" style={{ fontFamily: 'Inter', color: 'green' }}>
                                Order Placed!
                            </div>
                        )}
                    </div>
                )}



            </form>

        </div>
    );
};

export default NewQuoteForm;