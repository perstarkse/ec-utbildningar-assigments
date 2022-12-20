import React from 'react'
import ExternalLinkIcon from './components/ExternalLinkIcon'

const Footer = () => {
    return (
        <footer className="footer container-fluid">
            <div className="icon-links">
                <ExternalLinkIcon link={"https://facebook.com"} icon={"fa - brands fa-facebook-f"} />
                <ExternalLinkIcon link={"https://instagram.com"} icon={"fa - brands fa-instagram"} />
                <ExternalLinkIcon link={"https://twitter.com"} icon={"fa - brands fa-twitter"} />
                <ExternalLinkIcon link={"https://google.com"} icon={"fa - brands fa-google"} />
                <ExternalLinkIcon link={"https://linkedin.com"} icon={"fa - brands fa-linkedin"} />
            </div>
            <div className="copyright">
                <p>© 2022 Fixxo. All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer