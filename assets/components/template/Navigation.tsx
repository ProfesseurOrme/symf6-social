import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {MdOutlineMonochromePhotos} from "react-icons/md";
import {BiLogIn, BiLogOut, BiSpreadsheet} from "react-icons/bi";
import {GiHamburgerMenu} from "react-icons/gi";
import {LinkContainer} from "react-router-bootstrap";


const Navigation : React.FunctionComponent= () => {
    return (
        <Navbar collapseOnSelect sticky={"top"} expand="lg" style={{backgroundColor: "none"}}>
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <GiHamburgerMenu size={23} color={"white"}/>
                </Navbar.Toggle>
                <LinkContainer to={"/"}>
                    <Navbar.Brand>
                        <MdOutlineMonochromePhotos />
                        Social
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Collapse id="responsive-navbar-nav" className={"justify-content-end"}>
                    <Nav
                        className="my-2 my-lg-0 ml-auto"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1"><BiLogIn /> Log in</Nav.Link>
                        <Nav.Link href="#action2"><BiLogOut /> Log out</Nav.Link>
                        <Nav.Link href="#action1"><BiSpreadsheet /> Sign in</Nav.Link>
                        {/*
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                        */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;