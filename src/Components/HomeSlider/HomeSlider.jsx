import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImage1 from '../../assets/images/slide-1.jpg';
import sliderImage2 from '../../assets/images/slide-2.jpg';
import sliderImage3 from '../../assets/images/slide-3.jpg';

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        pauseOnHover: true
    };

    return (
        <Slider {...settings}>
            <div>
                <img src={sliderImage1} className="w-full" alt="Fresh Cart" />
            </div>
            <div>
                <img src={sliderImage2} className="w-full" alt="Fresh Cart" />
            </div>
            <div>
                <img src={sliderImage3} className="w-full" alt="Fresh Cart" />
            </div>
        </Slider>
    );
}