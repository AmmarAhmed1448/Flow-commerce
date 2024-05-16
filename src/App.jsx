import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ProductState from './Contexts/ProductsState';


function App() {

  return (
    <ProductState>
    <Router>
      <Routes>
      <Route exact path="/category/:categoryName" element={<Homepage />} />
      <Route exact path="/" element={<Homepage />} />
      </Routes>
    </Router>
    </ProductState>
    
  )
}

export default App;
