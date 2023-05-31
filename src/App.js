import Header from './components/HeaderComponent/Header/Header';
import Footer from './components/FooterComponent/Footer/Footer';
import Main from './components/MainComponent/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import { useEffect, useState } from 'react';
import HomePage from './components/MainComponent/HomePage/HomePage';
import Signup from './components/signup/signup';
import ProductPage from './components/MainComponent/ProductPage/ProductPage';
import EditProfile from './components/User-info/EditProfile';
import ShoppingCart from './components/MainComponent/ShoppingCart/ShoppingCart';
import './App.css';
import { CartContext } from './context/cartContext';
import ProductDetailPage from './components/MainComponent/ProductDetailPage/ProductDetailPage';
import UserData from './components/User-info/UserInfo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import OrderList from './components/MainComponent/OrderPage/OrderList';
import ChangePassword from './components/User-info/ChangePassword';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [p, setP] = useState('')
  useEffect(() => {

    localStorage.getItem("isAuthenticated") == null ? setIsAuthenticated(false) : setIsAuthenticated(true);
    console.log(localStorage.getItem("isAuthenticated"))
  })
  return (
    <div className="App">

      {/* <SignInOutContainer /> */}
      {/* <Login></Login> */}
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route exact path='/products' Component={ProductPage} element={<ProductPage />}></Route>
        <Route path='/products/:page?/:perPage?/:keyword?' Component={ProductPage} element={<ProductPage />}></Route>
        <Route path="/cart" element={
          <CartContext.Provider value={[p, setP]
          }>  <ShoppingCart /></CartContext.Provider>
        }></Route>
        <Route path='/userdata/editprofile' element=<EditProfile></EditProfile> ></Route>
        <Route path='/page' element={<h1>iafjdsf</h1>}></Route>
        <Route path="/shop" element={<ProductPage></ProductPage>} >
        </Route>

        <Route path='/userdata/changepassword' element={<ChangePassword></ChangePassword>}></Route>
        <Route path="/userdata" element={<UserData></UserData>} >
        </Route>
        <Route path="/order_list" element={<OrderList></OrderList>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/product/:id" Component={ProductDetailPage} element={<ProductDetailPage></ProductDetailPage>}></Route>
        <Route exact path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='*' element={<h1>404 not found</h1>}></Route>
      </Routes>

      <Main></Main>
      <Footer></Footer>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}
export default App;