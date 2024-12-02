import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useState } from 'react'
import { Header } from './components/Header.jsx'

function useFilters() {
  const [filters, setFilters] = useState({
    category: 'all',
   maxPrice: 1000,
  })

  const filterProducts = (products) => {
    return products.filter(product => {
      return product.price <= filters.maxPrice
      &&
      (filters.category === 'all' || 
        product.category === filters.category)
    }
    )
  }
  return { filterProducts, setFilters }
}




function App() {
  const [products] = useState(initialProducts)
  const { filterProducts, setFilters } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
    <Header changeFilters = { setFilters }/>
    <Products products={ filteredProducts }/>    
    </>
  )
}

export default App
