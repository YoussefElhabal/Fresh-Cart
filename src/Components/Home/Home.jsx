import axios from "axios";
import HomeSlider from "./../HomeSlider/HomeSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query";
import Loader from './../Loader/Loader';
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { useContext } from 'react';
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext";

export default function Home() {
    const { addProduct } = useContext(cartContext);

    const { addToWishList } = useContext(wishListContext);

    const navigate = useNavigate();

    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }
    const result = useQuery({
        queryKey: "allProducts",
        queryFn: getAllProducts,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    if (result.isLoading) {
        return <Loader />
    }

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

    function handleNavigation() {
        navigate('/products');
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className="container mx-auto my-10 px-5">
                <div>
                    <HomeSlider />
                </div>
                <div className="my-20">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl text-black font-bold mb-2 max-[350px]:text-3xl">Our Categories</h2>
                        <p className="text-sm text-gray-400">Explore Our Categories</p>
                    </div>
                    <CategoriesSlider />
                </div>
                <div>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl text-black font-bold mb-2 max-[350px]:text-3xl">Our Products</h2>
                        <p className="text-sm text-gray-400">Explore Our Products</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {result.data.data.data.slice(25, 37).map((product) => <div key={product._id} className="product p-2 rounded-md shadow-md">
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
                        </div>)}
                    </div>
                    <div className="mt-10 text-center">
                        <button onClick={handleNavigation} className="border border-[#08AC0A] rounded-lg bg-white text-[#08AC0A] hover:text-white hover:bg-[#08AC0A] transition-all duration-300 py-2 px-8">
                            View More
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}