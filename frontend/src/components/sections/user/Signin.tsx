import React from 'react'
import { useUserContext } from '../../../contexts/UserContext'

const SignIn = () => {

    const { userRequest, signInUser, setUserRequest } = useUserContext()

    const handleSignup = (e: React.FormEvent<HTMLFormElement>,) => {
        signInUser(e)
    }

    return (
        <form onSubmit={(e) => handleSignup(e)}>
            <h2 className='text-center'>Sign in</h2>
            <input value={userRequest.emailAddress} onChange={(e) => setUserRequest({ ...userRequest, emailAddress: e.target.value })} type="text" className="form-control mb-3 mt-3" placeholder='Enter email address' required />
            <input value={userRequest.password} onChange={(e) => setUserRequest({ ...userRequest, password: e.target.value })} type="password" className="form-control mb-3" placeholder='Enter password' required />
            <button type='submit' className='btn-themed btn-red'>Sign in</button>
        </form>
    )
}

export default SignIn