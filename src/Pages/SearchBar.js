import { useNavigate, NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import '../styles/App.css'

export default function Search() {
    const navigate = useNavigate();
    const submit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const input = Object.fromEntries(formData.entries()).search.trim();

        console.log(input);

        const address = new RegExp('0x[0-9a-fA-F]{40}');
        const block = new RegExp('^[0-9]{1,9999}$');
        const tx = new RegExp('0x[0-9a-fA-F]{64}');

        if (input.match(tx)) return navigate(`/Transaction/${input}`);
        if (input.match(address)) return navigate(`/Address/${input}`);
        if (input.match(block)) return navigate(`/Block/0x${Number(input).toString(16)}`);
        if (input === "") return navigate('/');
        return navigate('/404');
    }

    return (
        <>
            <Navbar className="navbar">
                <div className="navDiv">
                    <Nav className="navigation">
                        <ul>
                            <li>
                                <Link to="/" class="homeLink">Etherscan</Link>
                            </li>
                        </ul>
                    </Nav>
                </div>
                <div class="searchBarDiv">
                    <form className="searchBar" onSubmit={submit}>
                        <input className="searchBarInput" type="search" name="search" id="search" placeholder="Enter a valid address, transaction hash, or block" />
                        <button type="submit" className='searchButton'>&#9906;</button>
                    </form>
                </div>
            </Navbar>
        </>
    )
}