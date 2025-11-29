import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function BrandDetails() {
    const { id } = useParams();

    function getBrandDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    }

    const result = useQuery({
        queryKey: ['brandDetails', id],
        queryFn: getBrandDetails,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <Loader />
    }

    const brandDetailsObject = result.data.data.data;

    return (
        <div className="container mx-auto my-10 px-5 flex flex-col items-center">
            <img src={brandDetailsObject.image} alt={brandDetailsObject.name} />
            <h2 className="text-lg font-semibold my-2">{brandDetailsObject.name}</h2>
        </div>
    )
}