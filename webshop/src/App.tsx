import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import ProductDetailsView from './views/AllProductsView';
import ContactsView from './views/ContactsView';
import NotFoundView from './views/NotFoundView';
import CompareView from './views/CompareView';
import FavoritesView from './views/FavoritesView';
import ProductDetailsViewSpecific from './views/ProductDetailsViewSpecific'
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import { ProductProvider } from './contexts/ProductContext';

import './sass/style.scss';
import AdminView from './views/AdminView';
import { UserProvider } from './contexts/UserContext';
import UserView from './views/UserView';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <UserProvider>
          <ProductProvider>
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/products" element={<ProductDetailsView />} />
              <Route path="/products/:articleNumber" element={<ProductDetailsViewSpecific />} />
              <Route path="/contacts" element={<ContactsView />} />
              <Route path="/compare" element={<CompareView />} />
              <Route path="/favorites" element={<FavoritesView />} />
              <Route path="/admin" element={<AdminView />} />
              <Route path='/user' element={<UserView />} />
              <Route path="*" element={<NotFoundView />} />
            </Routes>
          </ProductProvider>
        </UserProvider>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;

