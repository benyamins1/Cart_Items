import axios from 'axios';
class ProductDataService {
    login(data) {
        return axios.post("http://localhost:8000/token/", data);
    }

    signup(data) {
        return axios.post("http://localhost:8000/register/", data);
    }
    getAll() {
        // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.get('http://localhost:8000/products/');
    }
    getCart(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.get('http://localhost:8000/carts/');
    }
    async updateCartItem(id, data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.put(`http://localhost:8000/cartitems/${id}/`, data);
    }

     deleteCartItem(id, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.delete(`http://localhost:8000/cartitems/${id}/`);
    }

     createCartItem(data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        data.product_id = data.product.id
        return axios.post("http://localhost:8000/cartitems/", data);
    }
    async payCart(data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.patch(`http://localhost:8000/carts/`, data);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductDataService();