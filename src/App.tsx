import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/Login/SignIn';
import SignUp from './pages/Authentication/Login/SignUp';
import Reception from './pages/Receptions/Reception';
import CreateReception from './pages/Receptions/CreateReception';
import DefaultLayout from './layout/DefaultLayout';
// import { AuthProvider } from './pages/Authentication/Login/AuthProvider';
// import { Auth } from './pages/Authentication/Login/Auth';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    // <AuthProvider>
      <Routes>
        {/* -------------------------  Protected Routes ------------------------- */}
        {/* <Route element={<Auth allowedRoles={['Doctor','Patient','Company','Bacteriologist','Recepcionist','Brigade']}/>}>
            <Route path='/inicio' element={<DefaultLayout children={undefined} />}/>
        </Route> */}
        {/* --------------------------------------------------------------------- */}

        {/* ------------------------- Unprotected Routes ------------------------- */}
        <Route path="/inicio" element={<Reception />} />
        <Route path="/recepcion" element={<Reception />} />
        <Route path="/recepcion/nueva" element={<CreateReception />} />
        <Route path="/iniciar_sesion" element={<SignIn />} />
        <Route path="/registrarse" element={<SignUp />} />
        {/* --------------------------------------------------------------- */}
      </Routes>
    // </AuthProvider>
  );
}

export default App;
