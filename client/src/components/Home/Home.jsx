import React from 'react'
import Cards from '../Cards/Cards'
import { Link } from 'react-router-dom'
import { BsInstagram } from 'react-icons/bs'
import { ImFacebook2 } from 'react-icons/im'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from 'react-helmet-async'
// import { Seo } from '../Seo/Seo'
import { getAllServices, getServicesByCategory, getServicesByName } from '../../Redux/actions'
import './Home.css'

const Home = () => {

    const dispatch = useDispatch()

    const [activeCategory, setActiveCategory] = useState(null);


    const allServices = useSelector(state => state.allServices)

    const servicesByName = useSelector(state => state.servicesByName)

    const servicesByCategory = useSelector(state => state.servicesByCategory)



    const [currentPage, setCurrentPage] = useState(1)


    const getDisplayedServices = () => {
        if (servicesByName.length) {
            return servicesByName;
        } else if (servicesByCategory.length) {
            return servicesByCategory;
        } else {
            return allServices;
        }
    };

    const displayedServices = getDisplayedServices()
    const cardsPerPage = 20
    const totalPages = Math.ceil(displayedServices.length / cardsPerPage);

    const startIndex = (currentPage - 1) * cardsPerPage

    const endIndex = startIndex + cardsPerPage




    const currentServices = displayedServices.slice(startIndex, endIndex)


    const handleByCategory = (category) => {
        dispatch(getServicesByCategory(category));
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(getAllServices());
    }, [dispatch]);


    return (
        <div className='container-fluid'>
            <div className='container__box__home'>
                <button className={`btn__item ${activeCategory === 'Finanzas' ? 'active' : ''}`} onClick={() => handleByCategory('Finanzas')}>Finanzas</button>
                <button className='btn__item' onClick={() => handleByCategory('Salud')}>Salud</button>
                <button className='btn__item' onClick={() => handleByCategory('Informatica')}>Informática</button>
                <button className='btn__item' onClick={() => handleByCategory('Deporte')}>Deporte</button>
                <button className='btn__item' onClick={() => handleByCategory('Espiritualidad')}>Espiritualidad</button>
                <button className='btn__item' onClick={() => handleByCategory('Educacion')}>Educación</button>
                <button className='btn__item' onClick={() => handleByCategory('Arte')}>Arte</button>
                <button className='btn__item' onClick={() => handleByCategory('Ciencia')}>Ciencia</button>
                <button className='btn__item' onClick={() => handleByCategory('Redes')}>Redes</button>
                <button className='btn__item' onClick={() => handleByCategory('Juegos')}>Juegos</button>
                <button className='btn__item' onClick={() => handleByCategory('Oficios')}>Oficios</button>
                <button className='btn__item' onClick={() => handleByCategory('EBooks')}>EBooks</button>

            </div>
            {/* example */}
            {/* <Seo
                title={'Learning React Helmet!'}
                description={'Beginner friendly page for learning React Helmet.'}
                name={'Company name.'}
                type={article} /> */}
            <Helmet>
                <title className='title'>Enseñanza Online</title>
                <meta name="description" content="Descubre cursos online certificados en Academia Online. Variedad de categorías y temáticas." />
            </Helmet>


            <div className='container__h1'>
                <h1 className='title'>Cursos Online certificados!!!</h1>
            </div>
            <div className="cards__container">

                {[...Array(totalPages).keys()].map((pageIndex) => (
                    <div key={pageIndex} className='card__row'>
                        {currentServices
                            .slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage)
                            .map((service) => (
                                <Cards key={service.id} service={service} />
                            ))}
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className='btn__pagination' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>{currentPage}</span>
                <button className='btn__pagination' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>

            <div className='container__footer'>
                <div className='footer'>
                    <Link className='icons__logo' to='https://www.instagram.com/academiaonlineglobal/' target='_blanck'>
                        <BsInstagram />
                    </Link>
                    <Link className='icons__logo' to='https://www.facebook.com/profile.php?id=61552849997287&locale=es_LA' target='_blanck'>
                        <ImFacebook2 />
                    </Link>
                </div>
                <div>
                    <span className='span__copy'>@copyright 2023</span>
                </div>
            </div>

        </div>
    )
}

export default Home



