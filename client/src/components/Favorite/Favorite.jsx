import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const Favorite = () => {
    const { user } = useAuth()
    const [favoriteServices, setFavoriteServices] = useState([])

    useEffect(() => {
        if (user) {
            setFavoriteServices('mostrar los servicios')
        }
    })
    return (
        <div>
            <h2>Tus servicios favoritos</h2>
            {/* Mostrar la lista de servicios favoritos */}
            {favoriteServices.map(service => (
                // Renderizar cada servicio en la lista
                <div key={service.id}>
                    {/* Detalles del servicio */}
                </div>
            ))}
        </div>
    )
}

export default Favorite
