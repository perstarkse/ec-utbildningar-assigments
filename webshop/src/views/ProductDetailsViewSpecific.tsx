import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "../components/NavBar";
import TopAdBar from "../components/TopAdBar";
import TopNav from "../components/TopNav";
import ProductDetailedSpecific from "../components/ProductDetailedSpecific";
import RelatedProductsSpecific from "../components/RelatedProductsSpecific";
import Footer from "../components/Footer";
import { IArticle } from '../interfaces/Interfaces';
import { gql, useQuery } from '@apollo/client';

interface IUseArticleQuery {
    article: IArticle
}

const ProductDetailsViewSpecific: React.FC = () => {
    window.top!.document.title = 'Product Details | Fixxo.';

    const params = useParams() as { articleNumber: string };
    const getQuery = gql` query article($articleNumber: String){article(articleNumber: $articleNumber){articleNumber, name, price, description, tag, category, price, rating, imageName}}`
    const { loading, error, data } = useQuery<IUseArticleQuery>(getQuery, { variables: { articleNumber: params.articleNumber } })

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <NavBar />
            <TopAdBar />
            <TopNav subPage="Product Details" />
            <ProductDetailedSpecific item={data!.article} />
            <RelatedProductsSpecific title="Related Products" category={data!.article.category} />
            <Footer />
        </>
    )
}

export default ProductDetailsViewSpecific