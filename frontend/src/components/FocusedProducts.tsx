import React from 'react';
import ThemeButton from './components/ThemeButton'

const FocusedProducts = () => {
    return (
        <section className="focused-products container">
            <div className="pamela-top-picks">
                <div className="title">
                    <h1>Pamela Reif's</h1>
                    <h1>Top Picks</h1>
                </div>
                <ThemeButton input={"FLASH SALE"} />
            </div>
            <div className="lets-be-conscious">
                <div className="title">
                    <h1>Let's Be</h1>
                    <h1>Conscious</h1>
                </div>
                <ThemeButton input={"FLASH SALE"} modclassName="btn-theme-dark" />
            </div>
        </section>
    )
}

export default FocusedProducts