import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="site-title">Site Name</a>
        <ul>
            <li><a href="/form">Quote Form</a></li>
            <li><a href="/history">Quote History</a></li>
            <li><a href="/profile">Profile</a></li>
        </ul>
    </nav>
}

