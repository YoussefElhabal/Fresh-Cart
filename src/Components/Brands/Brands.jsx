import axios from "axios";
import { useQuery } from "react-query";
import Loader from './../Loader/Loader';
import { Link } from 'react-router-dom';

export default function Brands() {
    function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    const result = useQuery({
        queryKey: "allBrands",
        queryFn: getAllBrands,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    if (result.isLoading) {
        return <Loader />
    }

    const brandsObject = result.data.data.data;

    return (
        <>
            <div className="container mx-auto my-10 px-5">
                <div className="m-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {brandsObject.map((brand) => <div key={brand._id} className="brand p-2 rounded-md shadow-md">
                        <Link to={`/brandDetails/${brand._id}`}>
                            <img src={brand.image} className="w-full" alt={brand.name} />
                            <h2 className="text-center text-lg font-semibold my-2">{brand.name}</h2>
                        </Link>
                    </div>)}
                </div>
            </div>
        </>
    )
}