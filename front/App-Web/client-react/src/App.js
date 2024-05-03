import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DescriptionCryptoMonnaie from './pages/descriptionCryptoMonnaie';
import Login from './pages/login';
import Register from './pages/register';
import "./css/style.css";
import MonCompte from './pages/monCompte';
import MailResetPassword from './pages/mailResetPassword';
import ResetPassword from './pages/resetPassword';
import Articles from './pages/articles/articles';
import Article from './pages/articles/article';
import Home from './pages/home';
import Topics from './pages/topics/topics';
import Topic from './pages/topics/topic';
import CryptoMonnaiesAdmin from './pages/admin/cryptoMonnaiesAdmin';
import HomeAdmin from './pages/admin/homeAdmin';
import UtilisateursAdmin from './pages/admin/utilisateursAdmin';
import CryptoUser from './pages/cryptoUser';
import CheckSite from './pages/checkSite';
import BandeauAdmin from './pages/admin/bandeauAdmin';
import CheckSiteAdmin from './pages/admin/checkSiteAdmin';
import Footer from './components/general/footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/check-site-admin" element={<CheckSiteAdmin />} /> 
          <Route path="/admin/bandeau" element={<BandeauAdmin />} />
          <Route path="/admin/utilisateurs" element={<UtilisateursAdmin />} />
          <Route path="/admin/cryptoMonnaies" element={<CryptoMonnaiesAdmin />} />
          <Route path="/admin/homeAdmin" element={<HomeAdmin />} />


          <Route path="/articles" element={<Articles />}  />
          <Route path="/article" element={<Article />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/check-site" element={<CheckSite />} />
          <Route path="/vos-cryptos" element={<CryptoUser />} />
          <Route path="/changement-du-mot-de-passe/:token" element={<ResetPassword />} />
          <Route path="/mot-de-passe-oubliee" element={<MailResetPassword />} />
          <Route path="/cryptoMonnaies" element={<DescriptionCryptoMonnaie />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/mon-compte" element={<MonCompte />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
