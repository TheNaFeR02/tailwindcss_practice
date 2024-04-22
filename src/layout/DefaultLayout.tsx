import { ReactNode, useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
// import { AuthContext } from '../pages/Authentication/Login/AuthProvider';

interface DefaultLayoutProps {
  children: ReactNode;
  // pageName: string;
  newReception?: string;

}

interface User {
  username: string;
  role: string;
  first_name: string;
  last_name: string;
}

const DefaultLayout = ({ children, newReception }: DefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const authContext = useContext(AuthContext);
  const [pageName, setPageName] = useState<string>('');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      const userRole = parsedUser?.role;
      if (userRole !== undefined) setPageName(userRole);
    }
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Page Header Start ===== --> */}
          <PageHeader Pagename={pageName} newElement={newReception} />
          {/* <!-- ===== Page Header  End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
