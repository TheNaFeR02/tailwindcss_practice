// import { useContext, useEffect, useMemo, useState } from "react";
// import { AuthContext } from './AuthProvider';
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// interface AuthProps {
//   allowedRoles: Array<string>;
// }

// interface User {
//   username: string;
//   role: string;
//   first_name: string;
//   last_name: string;
// }

// const Auth = ({ allowedRoles }: AuthProps) => {
//   const authContext = useContext(AuthContext);
//   const location = useLocation();
//   const [isAuthenticated, setIsAuthenticated]=  useState<boolean>(false);
  

//   useEffect(() => {
//     console.log('Entró a Auth');
//     console.log('HasRole', userHasRole);
//     console.log('Authenticated', isAuthenticated);
//   },[]);

  

//   // By using useMemo we are ensuring that the finding in the array roles 
//   // only happens when any of the two changes and not every time this component re-renders.
//   // When the role is ask, we do it for the authentication state too. That way when doing the return they both have the values they should have.
//   const userHasRole = useMemo(() => {
//     const savedUser = localStorage.getItem('currentUser');
//     const isAuthenticatedItem: string | null = localStorage.getItem('isAuthenticated');
//     if (isAuthenticatedItem === 'true'){
//       setIsAuthenticated(true);
//     }
    
//     // GET from Revalidate-user view.
//     if (savedUser) {
//       const parsedUser: User = JSON.parse(savedUser);
//       return allowedRoles.some((role: string) => parsedUser?.role.includes(role));
//     }

//   }
//     ,
//     [allowedRoles, isAuthenticated]
//   );
//   // const userHasRole = allowedRoles.some((role: string) => authContext.currentUser?.role.includes(role));
//   // console.log('isauthenticated', authContext.isAuthenticated);
//   // console.log('userhasrole', userHasRole);

//   if (!isAuthenticated || !userHasRole) {
//     return <Navigate to="/iniciar_sesion" state={{ from: location }} replace />;
//   }

//   return <Outlet />;
// }

// export { Auth };
