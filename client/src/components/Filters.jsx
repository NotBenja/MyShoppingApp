import { useState, useEffect, useId } from 'react';
import { products } from '../mocks/products.json';

import './Filters.css';

export function Filters( { onChange }) {
    const [maxPrice, setMaxPrice] = useState(1000);
    const maxPriceFilterId = useId();


    const [categories, setCategories] = useState([]);
    const categoryFilterId = useId();

    const handlePriceChange = (event) => {
        setMaxPrice(event.target.value)
        onChange( prevState => ({
            ...prevState,
            maxPrice: event.target.value
        })
        )
    };

    const handleCategoryChange = (event) => {
        onChange(prevState => ({
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
                <label htmlFor="price">Precio Máximo: </label>
                <input 
                    type="range"
                    id= {maxPriceFilterId}
                    min="0"
                    max="1000"
                    onChange={handlePriceChange}
                />
                <span>${maxPrice}</span>
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