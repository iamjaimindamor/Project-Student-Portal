import useAuth from '../../hooks/useAuth.hooks';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import toast from 'react-hot-toast';

const Layout = () => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();

    console.log(pathname);

    const sideBarRenderer = () => {
        if (isAuthenticated && pathname.toLowerCase().startsWith('/dashboard')) {
            return <Sidebar />;
        }
        return null;
    };

    if (!isAuthenticated) {

        toast(
            "Username : NewUser \n Password : Test@123",
            {
                duration: 7200,
                position: "top-right", style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                },
                icon: '🎉'

            }
        )

        toast(
            "Username : Student \n Password : Test@123",
            {
                duration: 8000,
                position: "top-right", style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                },
                icon: '🎓'

            }
        )

        toast(
            "Username : Faculty \n Password : Test@123",
            {
                duration: 9000,
                position: "top-right", style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                },
                icon: '🧑‍🏫'

            }
        )

        toast(
            "Username : Admin \n Password : Test@123",
            {
                duration: 10000,
                position: "top-right", style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                },
                icon: '👨‍💼'

            }
        );
    }


  return (
    <div>
        <Header/>
        {/* Using Outlet, render all routes are inside this Layout */}
        <div className='flex'>
            {sideBarRenderer()}
            <Outlet/>
        </div>
    </div>
  );
};

export default Layout;