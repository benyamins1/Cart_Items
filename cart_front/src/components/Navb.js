import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Form } from "react-bootstrap";
import { BsCartFill } from 'react-icons/bs';
import { FcSearch } from 'react-icons/fc';
import { NavLink } from "react-router-dom";


function Navb({user,logout,cartItemCount,handleSearch,setIsOpen,searchTerm,setSearchTerm}){
  
return (
<Navbar bg="dark" data-bs-theme="dark">
<Container>
  <Navbar.Brand href="/">CartWeb</Navbar.Brand>
  <Nav className="me-auto">
    <Nav.Link to="/" as={NavLink}>
      {" "}
      Products
    </Nav.Link>
    {user ? (
      <Nav.Link to="" onClick={logout} as={NavLink}>
        logout ({user})
      </Nav.Link>
    ) : (
      <>
        <Nav.Link to="/login" as={NavLink}>
          Login
        </Nav.Link>
        <Nav.Link to="/signup" as={NavLink}>
          Signup
        </Nav.Link>
      </>
    )}
  </Nav>
  <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search products"
                    className="me-2 rounded-pill"
                    style={{border: '2px solid #ccc'}}
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // Prevent default behavior
                            handleSearch(); // Manually trigger search
                        }
                    }}

                />
                <Button className="rounded-pill me-3" variant="outline-primary" onClick={handleSearch}>
                 <FcSearch style={{ fontSize: '1.5em' }}/>
                </Button>
            </Form>
            <Button variant='outline-primary' className='rounded-circle' onClick={() => setIsOpen(true)}
                    style={{
                        width: '3rem',
                        height: '3rem',
                        position: 'relative',
                        // color: 'yellow',
                        // backgroundColor: 'transparent', // Set background color to transparent
                        // zIndex: 1, // Set a higher z-index
                    }}>
            <BsCartFill style={{ fontSize: '1.5em' }}/>
                <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                     style={{
                         color: 'white',
                         width: '1.5rem',
                         height: '1.5rem',
                         position: 'absolute',
                         bottom: 0,
                         right: 0,
                         transform: "translate(25%,25%)"
                     }}>{cartItemCount}
                </div>
            </Button>
</Container>
</Navbar>)
}

export default Navb