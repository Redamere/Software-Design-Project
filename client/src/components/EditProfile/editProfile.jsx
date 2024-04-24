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
        <div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="fullName"
                            value={userDetails.fullName}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Address 1:
                        <input
                            type="text"
                            name="address1"
                            value={userDetails.address1}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Address 2:
                        <input
                            type="text"
                            name="address2"
                            value={userDetails.address2}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={userDetails.city}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={userDetails.state}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Zipcode:
                        <input
                            type="text"
                            name="zipcode"
                            value={userDetails.zipcode}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div>
                    <p>Full Name: {userDetails.fullName}</p>
                    <p>Address 1: {userDetails.address1}</p>
                    <p>Address 2: {userDetails.address2}</p>
                    <p>City: {userDetails.city}</p>
                    <p>State: {userDetails.state}</p>
                    <p>Zipcode: {userDetails.zipcode}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default EditProfile;