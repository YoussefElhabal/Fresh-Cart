import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
    const { allProducts, totalCartPrice, numOfCartItems, updateProduct, deleteProduct, clearAllProducts } = useContext(cartContext);

    async function handleUpdateProduct(productId, newCount) {
        const resFlag = await updateProduct(productId, newCount);
        if (resFlag) {
            toast.success('Product Updated Successfully', {
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

    async function handleDeleteProduct(id) {
        const resFlag = await deleteProduct(id);
        if (resFlag) {
            toast.success('Product Deleted From Your Cart Successfully', {
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

    async function handleClearProducts() {
        const resFlag = await clearAllProducts();
        if (resFlag) {
            toast.success('Cart Cleared Successfully', {
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
                    <p className="text-2xl font-semibold mb-5">Shop Cart: </p>
                    {numOfCartItems == 0
                        ?
                        (
                            <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg shadow-md space-y-4">
                                <i className="fas fa-shopping-cart text-[#08AC0A] text-6xl"></i>
                                <p className="text-2xl font-semibold text-center">
                                    Your Cart is Empty
                                </p>
                                <p className="text-gray-500 text-center max-w-xs">
                                    {'Looks like you haven\'t added anything to your cart yet. Start exploring our products!'}
                                </p>
                                <Link to={'/products'}>
                                    <button className="border border-[#08AC0A] bg-[#08AC0A] text-white hover:text-[#08AC0A] hover:bg-white transition-all duration-300 rounded-lg py-2 px-8">
                                        Start Shopping
                                    </button>
                                </Link>
                            </div>
                        )
                        :
                        <div className="text-xl font-medium">
                            {numOfCartItems == 1
                                ?
                                <p>You have 1 item in your cart</p>
                                :
                                <p>You have {numOfCartItems} different items in your cart</p>
                            }
                            <p className="text-[#08AC0A]">Total Cart Price: {totalCartPrice} EGP</p>
                        </div>
                    }
                </div>
                <div className="relative overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full">
                        <tbody>
                            {allProducts?.map((product) => <tr key={product._id} className="flex justify-between max-sm:flex-col bg-white border hover:bg-gray-50">
                                <td className="p-2 flex items-center max-sm:flex-col max-sm:items-start">
                                    <div className="max-sm:w-full max-sm:flex max-sm:justify-center">
                                        <img src={product.product.imageCover} className="w-24 md:w-32" alt={product.product.title} />
                                    </div>
                                    <div className="p-4 max-sm:p-2 font-medium">
                                        <p className="mb-2">{product.product.title}</p>
                                        <p className="mb-2 text-[#08AC0A]">Price: {product.price} EGP</p>
                                        <div className="text-red-500">
                                            <i className="fa-solid fa-trash me-1"></i>
                                            <button onClick={() => handleDeleteProduct(product.product._id)} className="hover:underline">Remove</button>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 max-sm:p-2 flex justify-end items-center">
                                    <div className="flex items-center">
                                        <button disabled={product.count == 1} onClick={() => handleUpdateProduct(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <input type="number" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1 remove-arrow" placeholder={product.count} required />
                                        </div>
                                        <button onClick={() => handleUpdateProduct(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                {numOfCartItems == 0
                    ?
                    ''
                    :
                    <div className="my-5 flex justify-between items-center max-sm:flex-col max-sm:gap-3">
                        <button onClick={() => handleClearProducts()} className="bg-red-500 text-white rounded-lg font-medium py-2 px-6 max-sm:w-full">Clear Cart</button>
                        <Link to='/payment' className="max-sm:w-full">
                            <button className="bg-[#08AC0A] text-white rounded-lg font-medium py-2 px-6 max-sm:w-full"><i className="fa-solid fa-cart-shopping"></i> Buy Now</button>
                        </Link>
                    </div>
                }
            </div>
        </>
    )
}