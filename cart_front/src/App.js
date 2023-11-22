import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import Navb from "./components/Navb";
import Products from "./components/Products";
import { ShoppingCart } from "./components/ShoppingCart";
import Signup from "./components/Signup";
import productServices from "./services/product-services";

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
      <Navb user={user} logout={logout} cartItemCount={cartItemCount} handleSearch={handleSearch}
      searchTerm={searchTerm} setSearchTerm={setSearchTerm} setIsOpen={setIsOpen}/>
   
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
