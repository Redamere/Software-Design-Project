// ClientProfileManagement.js

import React, { useState, useEffect } from 'react';
import './ClientProfileManagement.css';

const ClientProfileManagement = () => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState(null);
  const [recentProfile, setRecentProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/profile')
      const json = await response.json()

      if (response.ok) {
        console.log('Profiles fetched successfully', json)

        if (json.length > 0) {
          setRecentProfile(json[json.length - 1])
        }
      }
    }

    fetchProfiles()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profile = { fullName, address1, address2, city, state, zipcode }

    const response = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setFullName('')
      setAddress1('')
      setAddress2('')
      setCity('')
      setState('')
      setZipcode('')
      setError(null)
      console.log('Profile created successfully', json)
    }
  };

  return (
    <div className="sign-in-container">
      <h1>Signup Successful! 🎉</h1>
      <h2>Let us learn more about you.</h2>

      <div className="signup-container">
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address 1</label>
          <input
            type="text"
            id="address1"
            placeholder="Enter your address"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Address 2 (optional)</label>
          <input
            type="text"
            id="address2"
            placeholder="Enter your address"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            >
            <option value="">Select State</option>
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

        <div className="form-group">
          <label>Zipcode</label>
          <input
            type="text"
            id="zipcode"
            placeholder="Enter your zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>

        <button type="submit" className="register-btn">
          Save Information
        </button>
        {error && <div className="error">{error}</div>}
      </form>

    {recentProfile && (
      <div>
        <h2>Recent Profile</h2>
        <p>Full Name: {recentProfile.fullName}</p>
        <p>Address 1: {recentProfile.address1}</p>
        <p>Address 2: {recentProfile.address2}</p>
        <p>City: {recentProfile.city}</p>
        <p>State: {recentProfile.state}</p>
        <p>Zipcode: {recentProfile.zipcode}</p>
      </div>
    )}
    </div>
  );
};

export default ClientProfileManagement;
