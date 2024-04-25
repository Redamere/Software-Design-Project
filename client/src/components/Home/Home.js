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
                </div>
            </div>
            <div className="home-body">
                <h2>Our Services</h2>
                <p>Learn more about how we can help optimize your fleet's fuel consumption.</p>
            </div>
        </div>
    );
};

export default Home;