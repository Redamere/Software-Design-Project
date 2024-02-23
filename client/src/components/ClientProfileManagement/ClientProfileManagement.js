// ClientProfileManagement.js

import React, { useState } from 'react';
import './ClientProfileManagement.css';

const ClientProfileManagement = () => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (fullName.length > 50) {
      newErrors.fullName = 'Full Name should be at most 50 characters';
    }

    if (!address1.trim()) {
      newErrors.address1 = 'Address 1 is required';
    } else if (address1.length > 100) {
      newErrors.address1 = 'Address 1 should be at most 100 characters';
    }

    if (city.trim().length === 0) {
      newErrors.city = 'City is required';
    } else if (city.length > 100) {
      newErrors.city = 'City should be at most 100 characters';
    }

    if (state.trim().length === 0) {
      newErrors.state = 'State is required';
    }

    if (!zipcode.trim()) {
      newErrors.zipcode = 'Zipcode is required';
    } else if (zipcode.length < 5 || zipcode.length > 9) {
      newErrors.zipcode = 'Zipcode should be between 5 and 9 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform the form submission or other actions here
      console.log('Form is valid, submit the data:', {
        fullName,
        address1,
        address2,
        city,
        state,
        zipcode,
      });
    } else {
      console.log('Form is invalid');
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
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
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
          {errors.address1 && <p className="error-text">{errors.address1}</p>}
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
          {errors.city && <p className="error-text">{errors.city}</p>}
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
          {errors.state && <p className="error-text">{errors.state}</p>}
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
          {errors.zipcode && <p className="error-text">{errors.zipcode}</p>}
        </div>

        <button type="submit" className="register-btn">
          Save Information
        </button>
      </form>
    </div>
  );
};

export default ClientProfileManagement;
