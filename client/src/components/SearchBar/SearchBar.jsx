import React from 'react';
import { useDispatch } from 'react-redux';
import './SearchBar.css';
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { getServicesByName } from '../../Redux/actions';
import { useState } from 'react';

const SearchBar = () => {
    const dispatch = useDispatch()

    const [serviceByName, setServiceByName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getServicesByName(serviceByName))
        setServiceByName('')
    }

    const handleChange = (event) => {
        setServiceByName(event.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="searchBox">

                <input
                    id='searchServices'
                    className="searchInput"
                    type="search"
                    placeholder="Busca tu curso"
                    value={serviceByName}
                    onChange={handleChange}
                />
                <button className="searchButton"
                    type='submit'
                    onClick={handleSubmit}
                >
                    <FaMagnifyingGlass />
                </button>

            </div>
        </form>

    )
}

export default SearchBar




