// import { createContext, ReactNode, useState, useEffect } from 'react';

// interface User {
//   username: string;
//   role: string;
//   first_name: string;
//   last_name: string;
// }

// interface AuthContextProps {
//   isAuthenticated: boolean;
//   currentUser: User | null;
//   authenticate: (user: User) => void;
//   signout: () => void;
// }

// const AuthContext = createContext<AuthContextProps>({
//   isAuthenticated: false,
//   currentUser: null,
//   authenticate: () => { },
//   signout: () => { },
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
//     // Check local storage upon component mount to see if a user is authenticated
//     const savedUser = localStorage.getItem('currentUser');
//     if (savedUser) {
//       const parsedUser: User = JSON.parse(savedUser);
//       setCurrentUser(parsedUser);
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const authenticate = (user: User) => {
//     setCurrentUser(user);
//     setIsAuthenticated(true);
//     localStorage.setItem('currentUser', JSON.stringify(user)); // Save user to localStorage
//     localStorage.setItem('isAuthenticated', 'true')
//   };

//   const signout = () => {
//     setCurrentUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('currentUser'); // Remove user from localStorage
//     localStorage.removeItem('isAuthenticated')
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, currentUser, authenticate, signout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export { AuthProvider, AuthContext };