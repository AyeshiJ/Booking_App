import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";

export default function AccountPage() {
    const {redirect,setRedirect} = useState(null);
    const {ready,user,setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if (!ready) {
        return 'Loading...';
      }

    if(ready && !user && !redirect) {
        return <Navigate to ={'/login'}/>
    }

   
  
    function linkClases (type=null){
        let clases =  'py-2 px-6';
        if (type === subpage){
            clases += 'bg-primary text-white rounded-full';
        }
        return clases;
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
                <Link className={linkClases('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClases('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClases('places')} to={'/account/places'}>My accommodations</Link>

            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}