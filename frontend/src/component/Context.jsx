import { createContext, useState }  from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfolms')) || null;
      console.log(userInfo);
    const [user, setUser] = useState(userInfo);
    const login = (userData) => {
    localStorage.setItem('userInfolms', JSON.stringify(userData)); 
    setUser(userData);
}
    const logout = () => {
        localStorage.removeItem('userInfolms');
        setUser(null)
    }
    return <AuthContext.Provider value={{ 
        user,login,logout
     }}>
        {children}
        </AuthContext.Provider>


}