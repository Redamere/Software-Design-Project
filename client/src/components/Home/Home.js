import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import backgroundImage from "../Assets/oil_picture.jpg";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home">
                <div className="home-content">
                    <h1>Welcome to Fleet</h1>
                    <p>A professional team dedicated to precise fuel rate predictions tailored to your needs.</p>
                    {/* <Link to="/services">
                        <button>Learn More</button>
                    </Link> */}
                </div>
            </div>
            <div className="home-body">
                <h2>Our Services</h2>
                <p>Learn more about how we can help optimize your fleet's fuel consumption.</p>
            </div>
            <div className="home-features">
                <h2>Key Features</h2>
                <ul>
                    <li>Real-time fuel rate tracking</li>
                    <li>Predictive analysis for cost optimization</li>
                    <li>Customizable reporting and analytics</li>
                    <li>Integration with existing fleet management systems</li>
                </ul>
            </div>
            <div className="home-testimonials">
                <h2>What Our Customers Say</h2>
                <div className="testimonial">
                    <p>"Fleet's fuel rate predictions have helped us save thousands of dollars annually."</p>
                    <p>- John Smith, CEO</p>
                </div>
                <div className="testimonial">
                    <p>"The insights provided by Fleet have revolutionized our fleet management strategies."</p>
                    <p>- Jane Doe, CFO</p>
                </div>
            </div>
        </div>
    );
};

export default Home;