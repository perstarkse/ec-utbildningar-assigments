import React, { useEffect } from 'react'
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import ArticleList from '../components/sections/admin/ArticleList';
import CreateArticle from '../components/sections/admin/CreateArticle';
import TestSection from '../components/sections/admin/TestSection';
import { useProductContext } from '../contexts/ProductContext';
import { useUserContext } from '../contexts/UserContext';



const AdminView = () => {
    // const { getProducts } = useProductContext()
    const { user } = useUserContext()
    window.top!.document.title = 'Admin page';


    // useEffect(() => {
    //     getProducts();
    // }, [])



    return (
        <>
            <NavBar />
            <div className='container'>
                {
                    user.isAdmin ?
                        (<>
                            <CreateArticle />
                            <p className='text-center'>You are currently logged in as user: {user.emailAddress} whis is admin</p>
                            <ArticleList />

                        </>)
                        :
                        (<>
                            <div className='d-flex vh-100 d-inline-block justify-content-center align-items-center'>
                                <h2 >You are not signed in or admin</h2>
                                <TestSection />
                            </div>
                        </>)
                }
            </div>
            <Footer />
        </>
    )
}

export default AdminView