import React from 'react'
import { Helmet } from 'react-helmet-async'
import './Cards.css'

const Cards = ({ service }) => {
    const { title, image, smallDescription, price, link } = service

    return (
        <div className='container__card'>
            <Helmet>
                <title>Cursos online</title>
            </Helmet>
            <div className="card__container">
                <div className="content">
                    <div className='container__foto'>
                        <img className="foto__service" src={image[0]} alt="Cursos" loading='lazy' />
                    </div>

                    <h1 className="heading">{title}
                    </h1>
                    <p className="para">
                        {smallDescription}
                    </p>
                    <p className='para__price'>u$s {price}</p>
                    <a className="btn__read" target='_blank' href={link}>Mas info</a>

                </div>

            </div>
        </div >
    )

}

export default Cards

{/* <div className='container__footer'>
                <div className='footer'>
                    <Link className='icons__logo' href='https://www.instagram.com/academiaonlineglobal/' target='_blanck'>
                        <BsInstagram />
                    </Link>
                    <Link className='icons__logo' href='https://www.facebook.com/profile.php?id=61552849997287&locale=es_LA' target='_blanck'>
                        <ImFacebook2 />
                    </Link>
                </div>
                <div>
                    <span className='span__copy'>@copyright 2023</span>
                </div>
            </div> */}

{/* <div className='container__card'>
<div className="card__container">
    <div className="content">
        <img className="foto__service" src={Uñas} alt="Portada Uñas" />
        <h1 className="heading">Manicuras
        </h1>
        <p className="para">
            Pack para manicuras
        </p>
        <button className="btn__read">Mas info</button>
    </div>
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
</div> */}