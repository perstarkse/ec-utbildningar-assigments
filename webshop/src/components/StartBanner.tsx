import ImgLeft from "../images/showcase-img-1.png"
import ImgRight from "../images/showcase-img-2.png"

import ThemeButton from './components/ThemeButton'


const StartBanner = () => {
    return (
        <section className="start-banner container-fluid">
            <div className="sale-banners container-fluid">
                <img src={ImgLeft} alt="" />
                <div className="center-text">
                    <div>
                        <div className="h1-holder">
                            <h1>SALE UP</h1>
                            <h1>To 50% Off</h1>
                        </div>
                        <p>Online shopping free home delivery over $100</p>
                    </div>
                    <ThemeButton input="SHOP NOW" />
                </div>
                <img src={ImgRight} alt="" />
            </div>
        </section>
    )
}

export default StartBanner