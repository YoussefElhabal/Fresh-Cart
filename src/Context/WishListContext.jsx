import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState, createContext, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const wishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const [wishListProducts, setWishListProducts] = useState(null);

    const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);

    function getAuthHeaders() {
        return { token: localStorage.getItem('tkn') };
    }

    async function addToWishList(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                "productId": productId,
            },
            {
                headers: getAuthHeaders(),
            })
            .then(() => {
                getWishList();
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }

    const getWishList = useCallback(async () => {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: getAuthHeaders(),
        })
            .then((res) => {
                setWishListProducts(res.data.data);
                setNumOfWishlistItems(res.data.count);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('tkn');
        if (token) {
            getWishList();
        }
    }, [getWishList]);

    async function deleteFromWishList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {
                headers: getAuthHeaders(),
            }
        )
            .then(() => {
                getWishList();
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            })
    }

    return <wishListContext.Provider value={{
        addToWishList,
        wishListProducts,
        getWishList,
        deleteFromWishList,
        numOfWishlistItems
    }}>
        {children}
    </wishListContext.Provider>
}

WishListContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};