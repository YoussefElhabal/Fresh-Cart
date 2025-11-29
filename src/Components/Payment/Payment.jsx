import { useFormik } from "formik";
import { useContext } from "react";
import { useState } from "react";
import * as yup from "yup";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Payment() {
    const { cartId, clearCartUI, clearAllProducts } = useContext(cartContext);

    const [isOnline, setIsOnline] = useState(false);

    let headers = {
        token: localStorage.getItem('tkn'),
    }
    function createCashOrder(values) {
        const backendBody = {
            shippingAddress: values,
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            backendBody,
            {
                headers,
            }
        )
            .then((res) => {
                console.log("Cash Order Response", res);
                toast.success("The payment request has been created successfully");
                PaymentFormik.resetForm();
                clearCartUI();
            })
            .catch((error) => {
                console.log("Cash Order Error", error);
                toast.error("Something's Wrong");
            })
    }

    function onlinePayment(values) {
        const backendBody = {
            shippingAddress: values,
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
            backendBody,
            {
                headers,
            },
            {
                params: {
                    url: 'http://localhost:5173',
                }
            }
        )
            .then((res) => {
                console.log("Online Payment Response", res);
                toast.success("The online payment request has been created successfully");
                PaymentFormik.resetForm();
                window.open(res.data.session.url, "_blank");
                clearAllProducts();
            })
            .catch((error) => {
                console.log("Online Payment Error", error);
                toast.error("Something's Wrong");
            })
    }

    function detectPayment(values) {
        if (isOnline) {
            onlinePayment(values);
        } else {
            createCashOrder(values);
        }
    }

    const PaymentFormik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: detectPayment,
        validationSchema: yup.object().shape({
            details: yup.string()
                .min(5, 'Details must be at least 5 characters long')
                .max(50, 'Details must be less than 50 characters long')
                .required('Details are required'),
            phone: yup.string().matches(/^(20)?01[0125][0-9]{8}$/).required("Phone is required"),
            city: yup.string()
                .min(5, 'City name must be at least 5 characters long')
                .max(50, 'City name must be less than 50 characters long')
                .required('City is required'),
        })
    })

    return (
        <div className="my-10 px-5">
            <h2 className="text-center text-2xl mb-5">Shipping Address</h2>

            <form className="max-w-md mx-auto" onSubmit={PaymentFormik.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-black">Details</label>
                    <input value={PaymentFormik.values.details} onChange={PaymentFormik.handleChange} onBlur={PaymentFormik.handleBlur} type="text" id="details" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {PaymentFormik.errors.details && PaymentFormik.touched.details ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {PaymentFormik.errors.details}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">Phone</label>
                    <input value={PaymentFormik.values.phone} onChange={PaymentFormik.handleChange} onBlur={PaymentFormik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {PaymentFormik.errors.phone}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-black">City</label>
                    <input value={PaymentFormik.values.city} onChange={PaymentFormik.handleChange} onBlur={PaymentFormik.handleBlur} type="text" id="city" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {PaymentFormik.errors.city && PaymentFormik.touched.city ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {PaymentFormik.errors.city}
                    </div> : ''}
                </div>
                <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3">
                    <button onClick={() => setIsOnline(false)} type="submit" className="border border-[#08AC0A] bg-[#08AC0A] text-white rounded-lg font-medium w-full sm:w-auto px-6 py-2 text-center">
                        Create Cash Order
                    </button>
                    <button onClick={() => setIsOnline(true)} type="submit" className="border border-[#08AC0A] bg-white text-[#08AC0A] rounded-lg font-medium w-full sm:w-auto px-6 py-2 text-center">
                        Online Payment
                    </button>
                </div>
            </form>
        </div>
    )
}