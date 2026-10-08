import "../styles/navbar.css";

function Navbar({ onReset }) {
    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <span className="navbar-logo-destaque">Flow</span>
                <span>Board</span>
            </div>

            <button
                className="botao-resetar"
                onClick={onReset}
            >
                🗑️ Resetar quadro
            </button>

        </nav>
    );
}

export default Navbar;