import { products as initialProducts } from './mocks/products.json'
import { NavBar } from './components/NavBar.jsx'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { useFilters } from './hooks/useFilters.js'
import { CartProvider } from './context/cart.jsx'

function App() {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <div>
        <NavBar />
        <Header />
        <Products products={filteredProducts} />
      </div>
    </CartProvider>
  )
}

export default App
