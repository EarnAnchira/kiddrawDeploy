import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Header = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href='/storyform'>StoryForm</Nav.Link>
                    <Nav.Link href='/poseanimator'>PoseAnimator</Nav.Link>
                    <Nav.Link href='/canvas'>Canvas</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}
export default Header