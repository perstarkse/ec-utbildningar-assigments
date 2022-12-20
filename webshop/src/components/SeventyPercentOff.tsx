import ThemeButton from './components/ThemeButton'

const SeventyPercentOff = () => {
    return (
        <section className="seventy-percent-off container">
            <div className="text-holder">
                <h1>Up to 70% off*</h1>
                <p>Women's, Men's & Kids' Winter Fashion</p>
            </div>
            <ThemeButton input={"FLASH SALE"} modclassName="btn-theme-dark" />
        </section>
    )
}

export default SeventyPercentOff