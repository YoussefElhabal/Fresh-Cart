import Loader from './../Loader/Loader';
import useAllCategories from './../../CustomHooks/useAllCategories';
import { Link } from 'react-router-dom';

export default function Categories() {
    const { isLoading, data } = useAllCategories();

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="container mx-auto my-10 px-5">
                <div className="m-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {data.data.data.map((category) => <div key={category._id} className="category p-2 rounded-md shadow-md">
                        <Link to={`/categoryDetails/${category._id}`}>
                            <img src={category.image} className="w-full sm:h-72" alt={category.name} />
                            <h6 className="text-center text-lg font-semibold my-2">{category.name}</h6>
                        </Link>
                    </div>)}
                </div>
            </div>
        </>
    )
}