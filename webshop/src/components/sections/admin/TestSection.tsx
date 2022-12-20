import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { IArticle } from '../../../interfaces/Interfaces';

const get_article_query = gql`{articles {name}}`;

const TestSection = () => {
    const [products, setProducts] = useState<IArticle[]>([]);
    const articles = useQuery(get_article_query);

    const populateArticles = () => {
        if (articles.loading) return console.log("loading");
        if (articles.error) return console.log("error");
        else {
            console.log(articles.data.articles);
            setProducts(articles.data.articles);
            console.log(products);
        }
    }

    useEffect(() => {
        populateArticles();
    }, [])

    return (
        <>
            <button onClick={() => populateArticles()}>Populate</button>
            {/* <div>{products[0].name}</div> */}
        </>
    )
}

export default TestSection