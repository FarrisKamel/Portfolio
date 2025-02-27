import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

export const NavBar = () => {
    return (
        <Navbar expand="lg" className="navbar fixed-top"> {/* Apply the custom class */}
            <Container>
                <Navbar.Brand href="/">Hello</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/projects">Projects</Nav.Link>
                        <Nav.Link href="/experience">Experience</Nav.Link>
                        <Nav.Item className="nav-item-green">
                            <Nav.Link href="mailto:alqalam.farris@columbia.edu">Contact</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav.Link href="https://www.linkedin.com/in/farris-alqalam" target="_blank" rel="noopener noreferrer">
                            <img src={"/assets/business.png"} alt="LinkedIn" className="linkedin-icon" style={{ width: '22px', height: '22px' }}/>
                        </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

