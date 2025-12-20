import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function CategoryDetails() {
    const { id } = useParams();

    function getCategoyDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    }

    const result = useQuery({
        queryKey: ['categoryDetails', id],
        queryFn: getCategoyDetails,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <Loader />
    }

    const categoryDetailsObject = result.data.data.data;

    return (
        <div className="container mx-auto my-10 px-5 flex flex-col items-center">
            <img src={categoryDetailsObject.image} className="w-80" alt={categoryDetailsObject.name} />
            <h2 className="text-lg font-semibold my-2">{categoryDetailsObject.name}</h2>
        </div>
    )
}