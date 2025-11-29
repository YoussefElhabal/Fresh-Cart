import axios from 'axios';
import profileImage from '../../assets/images/profile.jpg';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from 'react-query';
import Loader from './../Loader/Loader';

export default function Profile() {
    const userData = jwtDecode(localStorage.getItem('tkn'));

    function getUserOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
    }

    const result = useQuery({
        queryKey: 'userOrders',
        queryFn: getUserOrders,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="container mx-auto my-10 px-5 flex flex-col items-center">
                <p className='text-2xl font-medium'>My Profile</p>
                <div className='my-5 flex flex-col items-center'>
                    <img src={profileImage} className='w-36 h-w-36' alt="Profile" />
                    <h1 className='text-xl font-medium'>{userData.name}</h1>
                </div>
                <p className='font-medium my-8'>Orders History</p>
                {result.data.data.map((order) => <div key={order.id} className="relative overflow-x-auto shadow-md rounded-lg w-full mb-10">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className='flex justify-between'>
                                <th className="px-3 py-3 text-[#08AC0A]">
                                    Order #{order.id}
                                </th>
                                <th className="px-3 py-3 text-gray-500">
                                    {new Date(order.createdAt).toISOString().split('T')[0]}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.cartItems.map((item) => <tr key={item.product._id} className="flex justify-between max-sm:flex-col bg-white border hover:bg-gray-50">
                                <td className="p-2 flex items-center max-sm:flex-col max-sm:items-start">
                                    <div className="max-sm:w-full max-sm:flex max-sm:justify-center">
                                        <img src={item.product.imageCover} className="w-24 md:w-32" />
                                    </div>
                                    <div className="p-4 max-sm:p-2 font-medium">
                                        <p className="mb-2">{item.product.title}</p>
                                        <p className="mb-2 text-[#08AC0A]">Price: {item.price} EGP</p>
                                        <p>Quantity: {item.count}</p>
                                    </div>
                                </td>
                            </tr>)}
                            <tr className='flex justify-between hover:bg-gray-50 max-sm:flex-col'>
                                <td className='p-2 max-sm:pb-0 font-medium text-gray-500'>Payment Method Type: {order.paymentMethodType}</td>
                                <td className='p-2 font-medium text-[#08AC0A]'>Total Order Price: {order.totalOrderPrice} EGP</td>
                            </tr>
                        </tbody>
                    </table>
                </div>)}
            </div>
        </>
    )
}