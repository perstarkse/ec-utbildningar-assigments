import React from 'react'
import ThemeButton from './components/ThemeButton'

const ClearanceNewArrivals: React.FC = () => {
    return (
        <section className="clearance-new-arrivals container">
            <div className="winter-clearance">
                <div className="text-holder">
                    <h1>Winter Clearance </h1>
                    <h1>Up to 70% Off!</h1>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem apriam eaque
                        ipsa quae ab illo inventore.</p>
                </div>
                <ThemeButton input={"FLASH SALE"} />
            </div>
            <div className="new-arrivals">
                <div className="text-holder">
                    <h1>New</h1>
                    <h1>Arrivals</h1>
                </div>
                <ThemeButton input={"FLASH SALE"} />
            </div>
        </section>
    )
}

export default ClearanceNewArrivals