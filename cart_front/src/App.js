import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import productServices from "./services/product-services";
import { Button, Form } from "react-bootstrap";
import React from "react";
import { ShoppingCart } from "./components/ShoppingCart";
import {FcSearch} from 'react-icons/fc'
import {BsCartFill} from 'react-icons/bs';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() { 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const closeCart = () => setIsOpen(false)
  const [cartItems, setCartItems] = useState([])
  const cartItemCount = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
  const [cartId, setCartId] = useState()
  useEffect(() => {
    const fetchData = async () => {
      await retrieveProducts();
      if (token)
      await retrieveCartItems();
  };
    // if (token)
    fetchData();
  }, [token]);
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setUser(localStorage.getItem('user'));
}, [])
  const retrieveProducts = async () => {
    try {
      const response = await productServices.getAll();
      setProducts(response.data);
      setOriginalProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const retrieveCartItems = async () => {
    try {
        const response = await productServices.getCart(token);
        setCartItems(response.data.items);
        setCartId(response.data.id)
    } catch (e) {
        console.log(e);
    }
};
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
        setProducts(originalProducts);
    } else {
        const filteredProducts = originalProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
    }
};
  async function signupapp(user = null) {
    // default user to null
    productServices
      .signup(user)
      .then((response) => {
        setToken(response.data.access_token);
        setUser(user.username);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", user.username);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function loginapp(user = null) {
    // default user to null
    productServices
      .login(user)
      .then((response) => {
        setToken(response.data.access);
        setUser(user.username);
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("user", user.username);
        toast.success(
          <div>
            hello {user.username} !
          </div>,
          {
              position: "top-center",
              style: {
                  width: "120%",                                        }
          }
  
      );
      })
      .catch((e) => {
        // console.log("login", e);
        toast.error(
          <div>
              password or username is not correct
          </div>,
          {
              position: "top-center",
              style: {
                  width: "120%",                                        }
          }

      );
      });
  }

  async function logout() {
    setToken("");
    setUser("");
    setCartItems([])
    setCartId()
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  }
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">CartWeb</Navbar.Brand>
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
      </Navbar>
      <ShoppingCart isOpen={isOpen} closeCart={closeCart} cartItems={cartItems} setCartItems={setCartItems} token={token} />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Products products={products} cartItems={cartItems} 
          setCartItems={setCartItems} token={token} cartId={cartId}/>}></Route>
          <Route path="/login" element={<Login loginapp={loginapp} />}></Route>
          <Route
            path="/signup"
            element={<Signup signupapp={signupapp} />}
          ></Route>
        </Routes>
        <ToastContainer theme="colored"/>
      </Container>
    </div>
  );
}

export default App;
