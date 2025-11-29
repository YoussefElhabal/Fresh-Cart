import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { authContext } from '../../Context/AuthContext';
import brand from '../../assets/images/freshcart-logo.svg';

export default function Navbar() {
    const { token, setToken } = useContext(authContext);

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('tkn');
        setToken(null);
        navigate('login');
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleMobileLinkClick() {
        setIsMenuOpen(false);
    }

    return (
        <nav className="bg-gray-50 shadow-sm">
            <div className="container mx-auto flex flex-wrap justify-between items-center p-4">
                <Link to='/home'>
                    <img src={brand} alt="Fresh Cart" />
                </Link>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                {/* Desktop View */}
                <div className="hidden w-full lg:block lg:w-auto" id="navbar-default">
                    <ul className="flex flex-row space-x-8 font-medium">
                        {token ? (
                            <>
                                <NavLink to='/home' className="text-black hover:text-[#08AC0A]">Home</NavLink>
                                <NavLink to='/products' className="text-black hover:text-[#08AC0A]">Products</NavLink>
                                <NavLink to='/categories' className="text-black hover:text-[#08AC0A]">Categories</NavLink>
                                <NavLink to='/brands' className="text-black hover:text-[#08AC0A]">Brands</NavLink>
                                <NavLink to='/cart' className="text-black hover:text-[#08AC0A]">Cart</NavLink>
                                <NavLink to='/wishlist' className="text-black hover:text-[#08AC0A]">WishList</NavLink>
                                <NavLink to='/profile' className="text-black hover:text-[#08AC0A]">Profile</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to='/register' className="text-black hover:text-[#08AC0A]">Register</NavLink>
                                <NavLink to='/login' className="text-black hover:text-[#08AC0A]">Login</NavLink>
                            </>
                        )}
                    </ul>
                </div>
                {token ?
                    <div className="hidden w-full lg:block lg:w-auto" id="navbar-default">
                        <span onClick={handleLogout} className="text-black font-medium cursor-pointer">Logout</span>
                    </div>
                    : ''}

                {/* Mobile View */}
                <div className={`w-full lg:hidden mt-2 overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <ul className="font-medium flex flex-col p-4 border border-gray-100 rounded-lg bg-gray-50">
                        {token ? (
                            <>
                                <NavLink to='/home' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Home</NavLink>
                                <NavLink to='/products' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Products</NavLink>
                                <NavLink to='/categories' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Categories</NavLink>
                                <NavLink to='/brands' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Brands</NavLink>
                                <NavLink to='/cart' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Cart</NavLink>
                                <NavLink to='/wishlist' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">WishList</NavLink>
                                <NavLink to='/profile' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Profile</NavLink>
                                <span
                                    onClick={() => { handleLogout(); handleMobileLinkClick(); }}
                                    className="block py-2 px-3 text-black rounded hover:bg-gray-100 cursor-pointer"
                                >
                                    Logout
                                </span>
                            </>
                        ) : (
                            <>
                                <NavLink to='/register' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Register</NavLink>
                                <NavLink to='/login' onClick={handleMobileLinkClick} className="block py-2 px-3 text-black rounded hover:bg-gray-100 hover:text-[#08AC0A]">Login</NavLink>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}