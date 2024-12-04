import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'
import { Toaster } from 'react-hot-toast';
const MainLayout = () => {
  return (
    <div>
    <Toaster
        position="top-center"
        toastOptions={{
          style: {
            padding: '16px',
            color: '#333',
          },
        }}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="">
            <Outlet/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout