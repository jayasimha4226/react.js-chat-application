import React,{ useContext,useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import{ auth} from '../firebase';

const AuthContext =React.creatContext();
export const useAuth =()=>useContext(AuthContext);
 
export const AuthProvider = ({childern})=>{
    const [loading, setLoding] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();
    useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
        setUser(user);
        setLoading(false);
       if (user) history.push('/chats');

    })

},[user, history]);
const value ={user};

return(
    <AuthContext.Provider value={value}>
        {!loading && childern}

    </AuthContext.Provider>
);
}
