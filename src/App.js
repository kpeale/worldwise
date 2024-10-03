import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Homepage />}
        />
        <Route
          path='product'
          element={<Product />}
        />
        <Route
          path='pricing'
          element={<Pricing />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='app'
          element={<AppLayout />}
        >
          <Route
            index
            element={<p>list of cities</p>}
          />

          <Route
            path='cities'
            element={<p>list of cities</p>}
          />

          <Route
            path='countries'
            element={<p>list of countries</p>}
          />

          <Route
            path='form'
            element={<p>form</p>}
          />
        </Route>
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
