import CategoryArticles from './components/CategoryArticles';

export interface RelatedProductProps {
    title: string;
    category: string,
}

const RelatedProducts = ({ title, category }: RelatedProductProps) => {
    return (
        <section className="related-products container">
            <div className="title">
                <h1>{title}</h1>
            </div>
            <div className="navigation"><a className="circle" href=""><i className="fa-solid fa-chevron-left"></i></a>
                <a className="circle" href=""><i className="fa-solid fa-chevron-right"></i></a>
            </div>
            <div className="horizontal-card-view">
                <CategoryArticles category={category} take={4} />
            </div>
        </section>
    )
}

export default RelatedProducts