import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { List } from 'react-bootstrap-icons'

const Navigation = ({ user, logout }) => {
    return (
        <Navbar collapseOnSelect expand='sm' className='p-3' bg='info' data-bs-theme="dark">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand className='fw-bold col-sm-3 col-md-4'>BlogsApp</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' ><List color='white' size={24} /></Navbar.Toggle>
                <Navbar.Collapse id='responsive-navbar-nav' className='col-sm-8'>
                    <Nav className='justify-content-center text-center w- mx-auto mx-sm-0'>
                        <LinkContainer to='/'>
                            <Nav.Link>blogs</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/users'>
                            <Nav.Link >users</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <hr className='border border-light d-sm-none'></hr>
                    <div className='d-flex align-items-center g-2 justify-content-center flex-column flex-sm-row ms-sm-auto'>
                        <Navbar.Text className='me-2 text-light'><b>{user.name}</b> logged in</Navbar.Text>
                        <Button variant='outline-light py-1' onClick={logout} className=''>Log out</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigation