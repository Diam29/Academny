import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar';
import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';


function App() {

  const helmetContext = {};
  console.log('helmet', helmetContext)
  return (
    <>
      <HelmetProvider context={helmetContext}>
        {/* <HelmetProvider> */}
        <Toaster position='bottom-right'
          toastOptions={{
            style: {
              background: 'linear-gradient(#FF6464, #FFAA64)'
            }
          }}
        />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

        </Routes>
      </HelmetProvider>
    </>
  )
}

export default App
