import React, { useContext } from 'react';
import { auth } from '../Fire';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function SignUp(){
    return auth.signInWithPopup()
}

export function AuthProvider() {

    const [currentUser, setCurrentUser] = useState();

    const value = {
        currentUser
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}