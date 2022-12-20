import { IArticle } from '../interfaces/Interfaces';
import CategoryArticles from './components/CategoryArticles';
import ProductCard from './components/ProductCard'
import TagArticles from './components/TagArticles';
import ThemeButton from './components/ThemeButton'
export interface OneBigAndGridProps {
    direction: string;
    titleBig: string;
    category: string;
    take: number;
}

const BigLeft = ({ direction, titleBig, category, take }: OneBigAndGridProps) => {
    return (
        <section className={`${direction} container`}>
            <div className="big">
                <div className="title">
                    <h1>{titleBig}</h1>
                </div>
                <ThemeButton input={"FLASH SALE"} modclassName="btn-theme-dark" />
            </div>
            <div className="product-grid" >
                <CategoryArticles category={category} take={take} />
            </div>
        </section>
    )
}

export default BigLeft