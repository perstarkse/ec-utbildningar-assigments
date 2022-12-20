import LatestArticles from './components/LatestArticles'
import MostExpensiveArticles from './components/MostExpensiveArticles'
import TopReactedArticles from './components/TopReactedArticles'

const ProductOverviewGrid = () => {
    return (
        <section className="product-overview-grid container">
            <div className="latest-products">
                <div className="title">Latest Product</div>
                <div className="product-grid">
                    <LatestArticles take={3} />
                </div>
            </div>
            <div className="best-selling-products">
                <div className="title">Best Selling Product</div>
                <div className="product-grid">
                    <MostExpensiveArticles take={3} />
                </div>
            </div>
            <div className="top-reacted-product">
                <div className="title">Top Reacted Product</div>
                <div className="product-grid">
                    <TopReactedArticles take={3} />
                </div>
            </div>
        </section>
    )
}

export default ProductOverviewGrid