import { useState, useEffect, useId } from 'react';
import { products } from '../mocks/products.json';
import { useFilters } from '../hooks/useFilters';

import './Filters.css';

export function Filters( ) {
    const { filters, setFilters } = useFilters();

    const maxPriceFilterId = useId();
    const categoryFilterId = useId();
    const [categories, setCategories] = useState([]);
   

    const handleMaxPriceChange = (event) => {
        setFilters( prevState => ({
            ...prevState,
            maxPrice: event.target.value
        })
        )
    };

    const handleCategoryChange = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    useEffect(() => {
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        setCategories(uniqueCategories);
    }, []);

    return (
        <section className="filters">
            <div>
                <label htmlFor={maxPriceFilterId}>Precio Máximo: </label>
                <input 
                    type="range"
                    id= {maxPriceFilterId}
                    min="0"
                    max="2000"
                    onChange={handleMaxPriceChange}
                    value={filters.maxPrice}
                />
                <span>${filters.maxPrice}</span>
            </div>
            
            <div>
                <label htmlFor={categoryFilterId}>Categoría: </label>
                <select id={categoryFilterId} onChange={handleCategoryChange}>
                    <option value="all">Seleccionar</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}

                </select>
            </div>
        </section>
    );
}