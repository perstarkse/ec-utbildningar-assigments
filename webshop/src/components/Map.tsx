const Map = () => {
    return (
        <section className="map container-fluid">
            <iframe className="google-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51709.87427028132!2d18.02259938251004!3d59.31710947905947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d86c5590a35%3A0xac5dd727a529fe56!2sEC%20Utbildning!5e0!3m2!1ssv!2sse!4v1665653730446!5m2!1ssv!2sse"
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='map'></iframe>
        </section>
    )
}

export default Map