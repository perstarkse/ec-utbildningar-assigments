import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const NotFoundView = () => {
    window.top!.document.title = '404 | Fixxo.';
    return (
        <>
            <NavBar />
            <section className='NotFoundView container-fluid'>
                <div className='container'>
                    404 - Page Not Found
                </div >
            </section>
            <div style={{ position: "fixed", bottom: "0", width: "100%" }}><Footer /></div>
        </>
    )
}

export default NotFoundView