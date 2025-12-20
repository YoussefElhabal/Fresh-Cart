import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { useContext, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";
import Loader from './../Loader/Loader';

export default function Products() {
    const { addProduct } = useContext(cartContext);

    const { addToWishList } = useContext(wishListContext);

    const [searchTerm, setSearchTerm] = useState('');

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    async function fetchProducts() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            setProducts(response.data.data);
        } catch (error) {
            console.error("Fetching Products Error: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredProducts(products);
        } else {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filtered = products.filter(product =>
                product.title && product.title.toLowerCase().includes(lowercasedFilter)
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    async function handleAddProduct(id) {
        const resFlag = await addProduct(id);
        if (resFlag) {
            toast.success('Product Added To Your Cart Successfully', {
                position: "top-right",
                duration: 3000,
            });
        } else {
            toast.error('Something\'s Wrong', {
                position: "top-right",
                duration: 3000,
            });
        }
    }

    async function handleAddToWishList(id) {
        const resFlag = await addToWishList(id);
        if (resFlag) {
            toast.success('Product Added To Your Wish List Successfully', {
                position: "top-right",
                duration: 3000,
            });
        } else {
            toast.error('Something\'s Wrong', {
                position: "top-right",
                duration: 3000,
            });
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="container mx-auto my-10 px-5">
                <div className="mb-10">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-full p-3 ps-10 rounded-lg outline-none border border-gray-300 bg-gray-50"
                            placeholder="Search Products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredProducts.length > 0 ? filteredProducts.map((product) => <div key={product._id} className="product p-2 rounded-md shadow-md">
                        <div className="relative overflow-hidden group">
                            <button onClick={() => handleAddToWishList(product._id)} className="absolute bottom-28 right-2 text-[#08AC0A] text-2xl translate-x-[200%] group-hover:translate-x-0 transition-all duration-300">
                                <i className="fa-regular fa-heart"></i>
                            </button>
                            <Link to={`/productDetails/${product._id}`}>
                                <img src={product.imageCover} className="w-full" alt={product.title} />
                                <h6 className="text-[#08AC0A]">{product.category.name}</h6>
                                <h2 className="text-xl">{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                <div className="flex justify-between items-center mt-4">
                                    <p>
                                        <span className={product.priceAfterDiscount ? "line-through text-red-500 me-2" : ""}>
                                            {product.price}
                                        </span>
                                        <span>{product.priceAfterDiscount}</span>
                                        <span> EGP</span>
                                    </p>
                                    <p><i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}</p>
                                </div>
                            </Link>
                            <button onClick={() => handleAddProduct(product._id)} className="w-full border border-[#08AC0A] rounded-lg bg-[#08AC0A] text-white hover:text-[#08AC0A] hover:bg-white transition-all duration-300 p-2 my-2">
                                <i className="fa-solid fa-cart-plus"></i> Add To Cart
                            </button>
                        </div>
                    </div>) : <p>No results found</p>}
                </div>
            </div>
        </>
    )
}