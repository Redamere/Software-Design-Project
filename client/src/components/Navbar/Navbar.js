import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="container">
                <Link to="/form">
                    <h1>Quote Form</h1>
                </Link>
            </div>

        </header>

    )
}

export default Navbar