import React from 'react'

const SiteDisclaimerIconsFour = () => {
    return (
        <section className="site-disclaimer-icons-four container">

            <div className="icon-and-text-holder">
                <div className="shadowed-circle">
                    <img src={require("../images/site-disclaimer-service.svg").default} alt="" />
                </div>
                <h1>Customer Support</h1>
                <p>Village did removed enjoyed explain talking.</p>
            </div>
            <div className="icon-and-text-holder">
                <div className="shadowed-circle">
                    <img src={require("../images/site-disclaimer-payment.svg").default} alt="" />
                </div>
                <h1>Secured Payment</h1>
                <p>Village did removed enjoyed explain talking.</p>
            </div>
            <div className="icon-and-text-holder">
                <div className="shadowed-circle">
                    <img src={require("../images/site-disclaimer-truck.svg").default} alt="" />
                </div>
                <h1>Free Home Delivery</h1>
                <p>Village did removed enjoyed explain talking.</p>
            </div>
            <div className="icon-and-text-holder">
                <div className="shadowed-circle">
                    <img src={require("../images/site-disclaimer-truck.svg").default} alt="" />
                </div>
                <h1>30 Day Reuters</h1>
                <p>Village did removed enjoyed explain talking.</p>
            </div>
        </section>
    )
}

export default SiteDisclaimerIconsFour