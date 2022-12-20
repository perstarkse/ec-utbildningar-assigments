import React, { useState } from 'react'
import { useUserContext } from '../../../contexts/UserContext'

const SignUp = () => {

    const { userRequest, registerUser, setUserRequest } = useUserContext()
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const [registrationError, setRegistrationError] = useState(false)

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>,) => {
        if (await registerUser(e) === true) {
            setRegistrationSuccess(true)
        }
        setRegistrationError(true)
    }

    return (<>
        {registrationSuccess ? (<><div data-testid="success" className='alert alert-success text-center mt-2' role="alert"><h2>Success! Press button above to login.</h2></div></>) : (<> <form onSubmit={(e) => handleSignup(e)}>
            <h2 className='text-center'>Sign up</h2>
            <input required value={userRequest.emailAddress} onChange={(e) => setUserRequest({ ...userRequest, emailAddress: e.target.value })} type="text" className="form-control mb-3 mt-3" placeholder='Enter email address' />
            <input required value={userRequest.password} onChange={(e) => setUserRequest({ ...userRequest, password: e.target.value })} type="password" className="form-control mb-3" placeholder='Enter password' />
            <button type='submit' className='btn-themed btn-red'>Register</button>
        </form></>)}
        {registrationError ? (<><p className='mt-3' data-testid="error" >Something went wrong, check inputs, email must be unique</p></>) : (<></>)}
    </>
    )
}

export default SignUp