import React, {useRef, useState, useEffect } from react ;
import { useHistory } from 'react-router-dom';
 import { ChatEngine } from 'react-chat-engine'; 
import { auth } from '../firebase';
import { useAuth} from '.../contexts/AuthContext';
 const Chats = () =>{
    const history = useHistory();
    const{ user} = useAuth();
    const[loading, setLoadding] = usestate(true);
    console.log(user);


    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    useEffect(()=> {
        if (!user){
            history.push('/');
            return;

        }
        const getfile =async(url)=> {
            const response = await fetch(url);
            const data = await response.blob();
            return new File([data]," userPhoto.jpg", { type: 'image/jpeg'})
        }
        axios.get('https://api.chatengine.io/user/me',{
            headers:{
           "project-id":process.env. REACT_APP_CHAT_ENGINE_ID,
           "user-name": user.email,
           "user-secret": user.uid,
        
            }
        })
        .then(()=> {
            setLoading (false);
        })
        .catch(()=> {
            let formdata =new FormData();
          formdata.append('email',user.eamil);
          formdata.append('username',user.displayName);
          formdata.append('secret',user.uid);
          getfile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name );
                axios.post('https://api.chatengine.io/user',
                formdata,
                {headers: {"private=-key" :process.env. REACT_APP_CHAT_ENGINE_KEY}}
                
                )
                .then(()=> setLoading(false))
                .catch((error)=> console.loge(error))

            })
        })
    }, [user,history]);
    if( !user|| losding )return 'Loading...';
return ( 
<div className=" chats-page"> 
<div className="nav-bar">
<div className="logo-tab">
Unichat
</div>
<div className="logout-tab" >
Logout 
</div>

</div>
<ChatEngine
 height= "calc(100vh - 66px)"
 projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
 userName="{user.email}"
 userSecret="{user.uid}"
/>
</div>
);
}
export default Chats;
