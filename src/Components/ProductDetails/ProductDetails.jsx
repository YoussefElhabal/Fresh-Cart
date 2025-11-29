import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { wishListContext } from './../../Context/WishListContext';

export default function ProductDetails() {
    const navigate = useNavigate();

    const { id } = useParams();

    const { addProduct } = useContext(cartContext);

    const { addToWishList } = useContext(wishListContext);

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const result = useQuery({
        queryKey: ['productDetails', id],
        queryFn: getProductDetails,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <Loader />
    }

    const productDetailsObject = result.data.data.data;

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

    function closePage() {
        navigate('/products');
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <>
            <div className="container mx-auto my-10 px-5 flex flex-col items-center lg:flex-row lg:justify-between relative">
                <div className="w-1/4 max-lg:w-1/2 max-lg:mb-5">
                    <i className="fa-solid fa-xmark cursor-pointer fa-2xl absolute right-5" onClick={closePage}></i>
                    {productDetailsObject.images.length > 1
                        ? <Slider {...settings}>
                            {productDetailsObject.images.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={productDetailsObject.title} className="w-full" />
                                </div>
                            ))}
                        </Slider>
                        : <img src={productDetailsObject.imageCover} className="w-full" alt={productDetailsObject.title} />}
                </div>
                <div className="w-[70%] mt-5 lg:mt-0">
                    <h2 className="text-xl font-semibold">{productDetailsObject.title}</h2>
                    <p className="mb-4 text-gray-500">{productDetailsObject.description}</p>
                    <h6 className="text-[#08AC0A]">{productDetailsObject.category.name}</h6>
                    <div className="flex justify-between items-center">
                        <p>{productDetailsObject.price} EGP</p>
                        <p><i className="fa-solid fa-star text-yellow-500"></i> {productDetailsObject.ratingsAverage}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                        <button onClick={() => handleAddProduct(id)} className="w-full lg:w-[45%] border border-[#08AC0A] bg-[#08AC0A] text-white hover:text-[#08AC0A] hover:bg-white transition-all duration-300 rounded-lg text-xl p-2 my-2">
                            <i className="fa-solid fa-cart-plus"></i> Add To Cart
                        </button>
                        <button onClick={() => handleAddToWishList(id)} className="w-full lg:w-[45%] border border-[#08AC0A] bg-white text-[#08AC0A] hover:text-white hover:bg-[#08AC0A] transition-all duration-300 rounded-lg text-xl p-2 my-2">
                            <i className="fa-regular fa-heart"></i> Add To WishList
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}