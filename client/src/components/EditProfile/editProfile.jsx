import React, { useState, useEffect } from 'react';

const EditProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
    });

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
            });
    }, []);

    // Function to handle form input changes
    const handleChange = (e) => {
        console.log('Handling change:', e.target.name, e.target.value);
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get the user ID from the cookie
        const userId = getUserIdFromCookie();

        // Create the payload with the updated user details
        const payload = {
            user_id: userId,
            fullName: userDetails.fullName,
            address1: userDetails.address1,
            address2: userDetails.address2,
            city: userDetails.city,
            state: userDetails.state,
            zipcode: userDetails.zipcode
        };
        console.log(payload)

        // Send the PATCH request to update the user profile
        fetch(`/api/profile`, {
            method: 'PATCH', // Use PATCH method
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Profile updated successfully');
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
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
                Welcome, {userDetails.fullName.split(' ')[0]}! 👋
            </h1>


            <form onSubmit={handleSubmit}>

                <div className="form-group" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name here"
                        value={userDetails.fullName}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        disabled={!isEditing}
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Address</label>
                    <input
                        type="text"
                        name="address1"
                        placeholder="Enter your address"
                        value={userDetails.address1}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        disabled={!isEditing}
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>Address 2 (optional)</label>
                    <input
                        type="text"
                        name="address2"
                        placeholder="Enter your address"
                        value={userDetails.address2}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        disabled={!isEditing}
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>City</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        value={userDetails.city}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        disabled={!isEditing}
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
                    <label style={{ display: 'block', marginBottom: '5px' }}>State</label>
                    <select
                        type="text"
                        name="state"
                        value={userDetails.state}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        disabled={!isEditing}
                        style={{
                            border: '2px solid #EFF3F7',
                            borderRadius: '4px',
                            height: '45px',
                            width: '100%',
                            padding: '10px',
                            boxSizing: 'border-box',
                            marginTop: '5px',
                            marginBottom: '10px',
                            color: 'black', // This sets the text color to black
                            backgroundColor: isEditing ? '' : '#FAFAFA'
                        }}
                    >
                        {!isEditing && <option value="">{userDetails.state || "Select State"}</option>}
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>

                    </select>
                </div>



                <div className="form-group" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '400', textAlign: 'left', marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Zipcode</label>
                    <input
                        type="text"
                        name="zipcode"
                        placeholder="Enter your zipcode"
                        value={userDetails.zipcode}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        disabled={!isEditing}
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
                {!isEditing && (
                    <button type="button" className="register-btn" style={{ backgroundColor: '#2A73F0', fontFamily: 'Inter', fontWeight: '600', fontSize: '14px', color: 'white', height: '45px', border: 'none', cursor: 'pointer', borderRadius: '4px' }} onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                )}
                {isEditing && (
                    <button type="submit" className="register-btn" style={{ backgroundColor: '#58B839', fontFamily: 'Inter', fontWeight: '600', fontSize: '14px', color: 'white', height: '45px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                        Save Changes
                    </button>
                )}

            </form>
        </div>
    );
};

export default EditProfile;