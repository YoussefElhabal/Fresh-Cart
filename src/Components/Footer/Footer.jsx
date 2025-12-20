import { Link } from 'react-router-dom';
import brand from '../../assets/images/freshcart-logo.svg';
import MasterCard from '../../assets/images/master-card.png';
import Paypal from '../../assets/images/paypal.png';
import Visa from '../../assets/images/visa.png';
import Stripe from '../../assets/images/stripe.png';

export default function Footer() {
    return (
        <footer className="bg-gray-50 shadow-sm border-t border-gray-200">
            <div className="container mx-auto w-full max-w-screen-xl px-4 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-start">
                    <div>
                        <Link to='/home'>
                            <img src={brand} alt="Fresh Cart" className='mx-auto lg:mx-0' />
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed mt-4">
                            Fresh Cart brings you the freshest products with fast delivery,
                            secure checkout, and a smooth shopping experience. Your trusted
                            online marketplace for everyday essentials.
                        </p>

                        <div className="flex space-x-4 mt-5 justify-center lg:justify-start">
                            <a className="text-gray-500">
                                <i className="fab fa-facebook text-xl"></i>
                            </a>
                            <a className="text-gray-500">
                                <i className="fab fa-github text-xl"></i>
                            </a>
                            <a className="text-gray-500">
                                <i className="fab fa-linkedin text-xl"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase">Quick Links</h2>
                        <ul className="space-y-4 text-gray-600 font-medium">
                            <li><Link to="/home" className="hover:text-[#08AC0A] transition">Home</Link></li>
                            <li><Link to="/products" className="hover:text-[#08AC0A] transition">Products</Link></li>
                            <li><Link to="/categories" className="hover:text-[#08AC0A] transition">Categories</Link></li>
                            <li><Link to="/brands" className="hover:text-[#08AC0A] transition">Brands</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase">Company</h2>
                        <ul className="space-y-4 text-gray-600 font-medium">
                            <li>About Us</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Shipping Info</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase">Contact</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Have questions or need support? Our team is always here to help.
                        </p>
                        <div className="mt-4 space-y-2 text-gray-600 text-sm">
                            <p><i className="fas fa-envelope mr-2"></i> support@freshcart.com</p>
                            <p><i className="fas fa-phone mr-2"></i> +20 12 3456 7890</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between border-t">
                <span className="text-sm text-gray-600">
                    © 2025 Fresh Cart. All Rights Reserved.
                </span>

                <div className="flex mt-4 md:mt-0 space-x-5">
                    <img src={MasterCard} className="h-6" alt="MasterCard" />
                    <img src={Paypal} className="h-6" alt="Paypal" />
                    <img src={Visa} className="h-6" alt="Visa" />
                    <img src={Stripe} className="h-6" alt="Stripe" />
                </div>
            </div>
        </footer>
    );
}