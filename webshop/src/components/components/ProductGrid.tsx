import React from 'react'
import { ProductGridProps } from '../../interfaces/Interfaces'
import ProductCard from './ProductCard'


const ProductGrid: React.FC<ProductGridProps> = ({ title, items }) => {

    return (
        <section className="grid-section container">
            <div className="title">
                <h2>{title}</h2>
            </div>
            <div className="product-grid">
                {
                    items?.map(product => <ProductCard item={product} key={product.articleNumber} />)
                }
            </div>
        </section>
    )
}

export default ProductGrid