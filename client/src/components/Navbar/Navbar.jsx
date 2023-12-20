import React, { useState, useEffect } from 'react'
import Logo from '../../assets/LogoAO.png'
import SearchBar from '../SearchBar/SearchBar'
import { BsSuitHeart } from 'react-icons/bs'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, NavLink } from 'react-router-dom'
import FormFirebase from '../FormFirebase/FromFirebase'
import { useAuth } from '../../context/AuthContext';
import './Navbar.css'

const Navbar = () => {
    const [showLoginFrom, setShowLoginFrom] = useState(false)
    const { user, logout } = useAuth();
    const [userPhoto, setUserPhoto] = useState(null);
    const [userInitials, setUserInitials] = useState('');
    const [favorite, setFavorite] = useState([])


    const handleClose = () => {
        setShowLoginFrom(false);
        console.log('handleClose')
    };

    const handleClick = () => {
        setShowLoginFrom(!showLoginFrom)
        console.log('handleClick', showLoginFrom)
    }

    const toggleFavorite = (servicedId) => {
        const isFavorite = favorite.includes(servicedId)

        if (isFavorite) {
            setFavorite(favorite.filter(id => id !== servicedId))
        } else {
            setFavorite([...favorite, servicedId])
        }
    }

    useEffect(() => {
        if (user) {
            const isEmailAuthProvider = user.providerData.some((provider) => provider.providerId === 'password');

            if (isEmailAuthProvider) {
                if (user.email) {
                    const [firstInitial, secondInitial] = user.email.split('@')[0].split('');
                    setUserInitials(`${firstInitial.toUpperCase()}${secondInitial ? secondInitial.toUpperCase() : ''}`);
                    console.log('first', firstInitial, 'second', secondInitial)
                } else {
                    setUserInitials('');
                }
                const photoURL = user.providerData[0].photoURL;
                setUserPhoto(photoURL);
            } else {
                const googleProvider = 'google.com';
                const isGoogleAuthProvider = user.providerData.some((provider) => provider.providerId === googleProvider);

                if (isGoogleAuthProvider) {
                    const photoURL = user.providerData[0].photoURL;
                    setUserPhoto(photoURL);
                } else {
                    setUserPhoto(null);
                }
            }
        }
    }, [user]);


    return (
        <nav className='container-fluid'>

            <div className='container__box'>
                <Link to='/' className='link__logo' onClick={() => window.location.reload()}>
                    <img src={Logo} alt="Logo Academia Online" className='rounded-pill' />
                    <span className="navbar__text" >Academia OnLine</span>
                </Link>
                <div className='search__div'>
                    <SearchBar />
                </div>
                <NavLink to='/favorite' className='favorite__icon'>
                    <BsSuitHeart className={`icon ${favorite.length > 0 ? 'favorited' : ''}`} />
                </NavLink>
                <div className="button__icon" onClick={handleClick}>
                    {user ? (
                        userPhoto ? (
                            <img src={userPhoto} alt="User" className="button__icon" />
                        ) : (
                            <span className="icon__inicio">{userInitials}</span>
                        )
                    ) : (
                        <button className="button__icon">
                            <FaRegCircleUser className="icon__inicio" onClick={handleClick} />
                        </button>
                    )}
                </div>
            </div>
            <div className='display__login'>
                {showLoginFrom && <FormFirebase onClose={() => setShowLoginFrom(false)} onCloseForm={handleClose} />}
            </div>

        </nav >

    );
}

export default Navbar