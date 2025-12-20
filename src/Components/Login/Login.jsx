import axios from "axios";
import { useFormik } from "formik";
import { useState, useContext, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from './../../Context/AuthContext';
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from './../../Context/WishListContext';
import toast from "react-hot-toast";

export default function Login() {
    const { setToken } = useContext(authContext);

    const { getUserCart } = useContext(cartContext);

    const { getWishList } = useContext(wishListContext);

    const navigate = useNavigate();

    const [isError, setIsError] = useState(null);

    const [isSuccess, setIsSuccess] = useState(false);

    const [isClicked, setisClicked] = useState(false);

    const user = {
        email: '',
        password: '',
    }

    function loginUser(values) {
        setisClicked(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .then(function (response) {
                localStorage.setItem('tkn', response.data.token);
                setToken(response.data.token);
                getUserCart();
                getWishList();
                setIsSuccess(true);
                setisClicked(false);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            })
            .catch(function (error) {
                setIsError(error.response.data.message);
                setisClicked(false);
                setTimeout(() => {
                    setIsError(null);
                }, 2000);
            })
    }

    useEffect(() => {
        if (isError) {
            toast.error(isError, {
                position: "top-center",
                duration: 3000
            });
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Welcome Back", {
                position: "top-center",
                duration: 3000
            });
        }
    }, [isSuccess]);

    const registerFormik = useFormik({
        initialValues: user,
        onSubmit: loginUser,
        validationSchema: yup.object().shape({
            email: yup.string().email("Invalid email").required("Email is required"),
            password: yup.string().min(6, "Password must be 6 digits at least").max(12, "Password must not exceed 12 digits").required("Password is required"),
        })
    })

    return (
        <div className="my-10 px-5">
            <h2 className="text-center text-2xl mb-5">Login Now</h2>
            <form className="max-w-md mx-auto" onSubmit={registerFormik.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                    <input value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="email" id="email" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {registerFormik.errors.email && registerFormik.touched.email ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {registerFormik.errors.email}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                    <input value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" id="password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {registerFormik.errors.password && registerFormik.touched.password ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {registerFormik.errors.password}
                    </div> : ''}
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="flex justify-center text-white bg-[#08AC0A] outline-none rounded-lg font-medium w-full sm:w-auto px-6 py-2">
                        {!isClicked
                            ? 'Login'
                            : <ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />}
                    </button>
                </div>
            </form>
        </div>
    );
}