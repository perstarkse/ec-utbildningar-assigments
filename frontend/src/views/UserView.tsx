import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SignIn from '../components/sections/user/Signin'
import Signup from '../components/sections/user/Signup'
import UserManagement from '../components/sections/user/UserManagement'
import { useUserContext } from '../contexts/UserContext'

const UserView = () => {
    const { getUser, user } = useUserContext();
    const [signInToggle, setSignInToggle] = useState(false);

    const loggedIn = () => {
        if (user._id.length > 0) {
            return true
        }
        else return false
    }

    useEffect(() => {
        if (loggedIn()) { getUser(); }

    }, [])

    const logOut = () => {
        localStorage.removeItem('accessToken');
        getUser();
    }

    const toggleSignIn = () => {
        if (signInToggle === true) { setSignInToggle(false) }
        else setSignInToggle(true);
    }
    return (<>
        <NavBar />
        <div className='userView container'>
            {
                loggedIn() ?
                    (<>
                        <div className='text-center'>
                            <h2>You are signed in</h2>
                            <p> Hello {user.emailAddress}</p>
                            <button className='logoutBtn btn-themed btn-red' onClick={logOut}>Log out</button>
                        </div>
                        {
                            user.isAdmin ?
                                (<>
                                    <h2>You are admin</h2>
                                    <NavLink to={"/admin"} className={'adminLink btn-themed btn-red'}>Click here to go to Article admin</NavLink>
                                    <UserManagement />
                                </>)
                                :
                                (<>
                                    <h2>Here are your previous orders:</h2>
                                </>)
                        }
                    </>)
                    :
                    (<>
                        {
                            signInToggle ? (<>
                                <button data-testid="SignUpSignInToggle" className="toggleLoginBtn btn-themed " onClick={toggleSignIn}>Press button if you already have an account</button>
                            </>)
                                :
                                (<>
                                    <button data-testid="SignUpSignInToggle" className="toggleLoginBtn btn-themed " onClick={toggleSignIn}>Press button if you need to register an account</button>
                                </>)
                        }

                        {
                            signInToggle ? (<><Signup /></>) : (<><SignIn /></>)
                        }
                    </>)
            }

        </div>
        <Footer />
    </>
    )
}

export default UserView
