import { useContext } from "react";
import { wishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function WishList() {
    const { wishListProducts, deleteFromWishList, numOfWishlistItems } = useContext(wishListContext);

    const { addProduct } = useContext(cartContext);

    async function handleAddToCart(id) {
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

    async function handleDeleteFromWishList(id) {
        const resFlag = await deleteFromWishList(id);
        if (resFlag) {
            toast.success('Product Deleted From Your Wish List Successfully', {
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

    return (
        <>
            <div className="container mx-auto my-10 px-5">
                <div className="mb-5">
                    <p className="text-2xl font-semibold mb-5">Wish List: </p>
                </div>
                {numOfWishlistItems === 0 ?
                    (
                        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg shadow-md space-y-4">
                            <i className="fas fa-heart text-[#08AC0A] text-6xl"></i>
                            <p className="text-2xl font-semibold text-center">
                                Your Wishlist is Empty
                            </p>
                            <p className="text-gray-500 text-center max-w-sm">
                                {'Looks like you haven\'t added any items to your wishlist yet. Start exploring your favorites!'}
                            </p>
                            <Link to={'/products'}>
                                <button className="border border-[#08AC0A] bg-[#08AC0A] text-white hover:text-[#08AC0A] hover:bg-white transition-all duration-300 rounded-lg py-2 px-8">
                                    Browse Products
                                </button>
                            </Link>
                        </div>
                    )
                    :
                    <div className="relative overflow-x-auto shadow-md rounded-lg">
                        <table className="w-full">
                            <tbody>
                                {wishListProducts?.map((product) => <tr key={product.id} className="flex justify-between max-sm:flex-col bg-white border hover:bg-gray-50">
                                    <td className="sm:w-[70%] p-2 flex items-center max-sm:flex-col max-sm:items-start">
                                        <div className="max-sm:w-full max-sm:flex max-sm:justify-center">
                                            <img src={product.imageCover} className="w-24 md:w-32" alt={product.title} />
                                        </div>
                                        <div className="p-4 max-sm:p-2 font-medium">
                                            <p className="mb-2">{product.title}</p>
                                            <p className="mb-2 text-[#08AC0A]">Price: {product.price} EGP</p>
                                            <div className="text-red-500">
                                                <i className="fa-solid fa-trash me-1"></i>
                                                <button onClick={() => handleDeleteFromWishList(product.id)} className="font-medium hover:underline">Remove</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 max-sm:p-2 flex items-center justify-end">
                                        <div>
                                            <button onClick={() => handleAddToCart(product._id)} className="w-full border border-[#08AC0A] rounded-lg bg-[#08AC0A] text-white hover:text-[#08AC0A] hover:bg-white transition-all duration-300 py-2 px-6">
                                                <i className="fa-solid fa-cart-plus"></i> Add
                                            </button>
                                        </div>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>}
            </div>
        </>
    )
}