import axios from 'axios';
class ProductDataService {
    
        axe="https://django1-txc8.onrender.com"
    
    login(data) {
        return axios.post(`${this.axe}/token/`, data);
    }

    signup(data) {
        return axios.post(`${this.axe}/register/`, data);
    }
    getAll() {
        // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        console.log(`${this.axe}/products/`)
        return axios.get(`${this.axe}/products/`);
    }
    getCart(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.get(`${this.axe}/carts/`);
    }
    async updateCartItem(id, data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.put(`${this.axe}/cartitems/${id}/`, data);
    }

     deleteCartItem(id, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.delete(`${URL}/cartitems/${id}/`);
    }

     createCartItem(data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        data.product_id = data.product.id
        return axios.post(`${this.axe}/cartitems/`, data);
    }
    async payCart(data, token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        return axios.patch(`${this.axe}/carts/`, data);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductDataService();