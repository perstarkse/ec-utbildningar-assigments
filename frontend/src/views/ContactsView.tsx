import React from 'react'
import NavBar from "../components/NavBar";
import TopAdBar from "../components/TopAdBar";
import TopNav from "../components/TopNav";
import Map from "../components/Map";
import Footer from "../components/Footer";
import ContactUsForm from "../components/ContactUsForm";

const ContactsView = () => {
    window.top!.document.title = 'Contact | Fixxo.';
    return (
        <>
            <NavBar />
            <TopAdBar />
            <TopNav subPage="Contact" />
            <Map />
            <ContactUsForm />
            <Footer />
        </>
    )
}

export default ContactsView