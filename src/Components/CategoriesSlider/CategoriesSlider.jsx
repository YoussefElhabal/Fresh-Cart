import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FallingLines } from "react-loader-spinner";
import useAllCategories from "../../CustomHooks/useAllCategories";

export default function CategoriesSlider() {
    const { isLoading, data } = useAllCategories();

    if (isLoading) {
        return <div className="flex justify-center">
            <FallingLines
                color="#000"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading" />
        </div>
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        arrows: false,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    return (
        <>
            {<Slider {...settings}>
                {data.data.data.map((category) => <div key={category._id} className="px-1">
                    <img src={category.image} className="w-full rounded-md max-[375px]:h-28 min-[375px]:h-32 min-[450px]:h-36 lg:h-40" alt={category.name} />
                    <h6 className="text-center">{category.name}</h6>
                </div>)}
            </Slider>}
        </>
    );
}