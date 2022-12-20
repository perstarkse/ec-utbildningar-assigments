import { useEffect } from 'react'
import { useUserContext } from '../../../contexts/UserContext'

const UserManagement = () => {

    const { users, getUsers } = useUserContext()

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <h2>Userlist</h2>
            {
                users.map(user => <div className='' key={user.emailAddress}>
                    <p>{user.emailAddress}</p>
                </div>)
            }
        </>
    )
}

export default UserManagement