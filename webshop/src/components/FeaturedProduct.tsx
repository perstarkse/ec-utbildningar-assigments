import TagArticles from "./components/TagArticles"

const FeaturedProduct = ({ title, tag }: any) => {

    return (
        <section className="featured-product container">
            <div className="title">
                <h2>{title}</h2>
            </div>
            <div className="product-grid">
                <TagArticles tag={tag} take={8} />
            </div>
        </section>
    )
}

export default FeaturedProduct