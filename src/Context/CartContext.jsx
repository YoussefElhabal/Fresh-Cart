import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();

export default function CartContextProvider({ children }) {
    const [allProducts, setAllProducts] = useState(null);

    const [totalCartPrice, setTotalCartPrice] = useState(0);

    const [numOfCartItems, setNumOfCartItems] = useState(0);

    const [cartId, setCartId] = useState(null);

    const [userId, setUserId] = useState(null);

    function getAuthHeaders() {
        return { token: localStorage.getItem('tkn') };
    }

    async function addProduct(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                "productId": productId
            },
            {
                headers: getAuthHeaders(),
            })
            .then(() => {
                getUserCart();
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }

    const getUserCart = useCallback(() => {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: getAuthHeaders(),
        })
            .then((res) => {
                setNumOfCartItems(res.data.numOfCartItems);
                setAllProducts(res.data.data.products);
                setTotalCartPrice(res.data.data.totalCartPrice);
                setCartId(res.data.data._id);
                setUserId(res.data.data.cartOwner);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('tkn');
        if (token) {
            getUserCart();
        }
    }, [getUserCart]);

    async function updateProduct(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                "count": newCount
            },
            {
                headers: getAuthHeaders()
            })
            .then((res) => {
                setNumOfCartItems(res.data.numOfCartItems);
                setAllProducts(res.data.data.products);
                setTotalCartPrice(res.data.data.totalCartPrice);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }

    async function deleteProduct(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: getAuthHeaders(),
            })
            .then((res) => {
                setNumOfCartItems(res.data.numOfCartItems);
                setAllProducts(res.data.data.products);
                setTotalCartPrice(res.data.data.totalCartPrice);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }

    async function clearAllProducts() {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers: getAuthHeaders(),
            })
            .then(() => {
                setNumOfCartItems(0);
                setAllProducts(null);
                setTotalCartPrice(0);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }

    function clearCartUI() {
        setAllProducts(null);
        setTotalCartPrice(0);
        setNumOfCartItems(0);
        setCartId(null);
    }

    return <cartContext.Provider value={
        {
            addProduct,
            allProducts,
            totalCartPrice,
            numOfCartItems,
            getUserCart,
            updateProduct,
            deleteProduct,
            clearAllProducts,
            cartId,
            clearCartUI,
            userId,
        }}>
        {children}
    </cartContext.Provider>
}

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};