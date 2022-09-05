import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import AllAdsScreen from './screens/allAdsScreen';
import AdScreen from './screens/adScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import MyAdsScreen from './screens/myAdsScreen';
import EditAdScreen from './screens/editAdScreen';

function App() {
  return (
    <Router>
      <div className='flex flex-col h-screen justify-between bg-gray-50'>
        <Header />
        <main className='mb-auto'>
          <Routes>
            <Route path='/' element={<AllAdsScreen />} />
            <Route path='/:slug' element={<AdScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/my/*' element={<MyAdsScreen />} />
            <Route path='/my/:slug/edit' element={<EditAdScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
