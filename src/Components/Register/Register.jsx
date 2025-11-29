import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
    const navigate = useNavigate()

    const [isError, setIsError] = useState(null);

    const [isSuccess, setIsSuccess] = useState(false);

    const [isClicked, setisClicked] = useState(false);

    const user = {
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
    }

    function registerUser(values) {
        setisClicked(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            .then(function (response) {
                console.log('response', response);
                setIsSuccess(true);
                setisClicked(false);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch(function (error) {
                console.log('error', error.response.data.message);
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
            toast.success("Congratulation", {
                position: "top-center",
                duration: 3000
            });
        }
    }, [isSuccess]);

    const registerFormik = useFormik({
        initialValues: user,
        onSubmit: registerUser,
        validationSchema: yup.object().shape({
            name: yup.string().min(3, "Name must be 3 characters at least").max(12, "Name must not exceed 12 characters").required("Name is required"),
            email: yup.string().email("Invalid email").required("Email is required"),
            phone: yup.string().matches(/^(20)?01[0125][0-9]{8}$/).required("Phone is required"),
            password: yup.string().min(6, "Password must be 6 digits at least").max(12, "Password must not exceed 12 digits").required("Password is required"),
            rePassword: yup.string().oneOf([yup.ref("password")], "Confirm password doesn't match").required("Confirm password is required"),
        })
    })

    return (
        <div className="my-10 px-5">
            <h2 className="text-center text-2xl mb-5">Register Now</h2>
            <form className="max-w-md mx-auto" onSubmit={registerFormik.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
                    <input value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" id="name" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {registerFormik.errors.name && registerFormik.touched.name ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {registerFormik.errors.name}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                    <input value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="email" id="email" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {registerFormik.errors.email && registerFormik.touched.email ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {registerFormik.errors.email}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">Phone</label>
                    <input value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {registerFormik.errors.phone && registerFormik.touched.phone ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {registerFormik.errors.phone}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                    <input value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" id="password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {registerFormik.errors.password && registerFormik.touched.password ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {registerFormik.errors.password}
                    </div> : ''}
                </div>
                <div className="mb-5">
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-black">Confirm Password</label>
                    <input value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5" required />
                    {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className="p-4 my-4 text-sm text-red-500 rounded-lg bg-red-50" role="alert">
                        {registerFormik.errors.rePassword}
                    </div> : ''}
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="flex justify-center text-white bg-[#08AC0A] outline-none rounded-lg font-medium w-full sm:w-auto px-6 py-2">
                        {!isClicked
                            ? 'Register'
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