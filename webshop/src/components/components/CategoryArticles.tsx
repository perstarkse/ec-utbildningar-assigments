import { gql, useQuery } from "@apollo/client"
import { IArticle } from "../../interfaces/Interfaces"
import ProductCard from "./ProductCard"

interface IUseArticleQuery {
    categoryArticles: IArticle[]
}

interface ICategoryArticles {
    category: string,
    take: number
}

const CategoryArticles = ({ category, take }: ICategoryArticles) => {
    const getTagQuery = gql` query categoryArticles($category: String, $take: Int){categoryArticles(category: $category, take: $take){articleNumber, name, price, description, tag, category, price, rating, imageName}}`
    const { loading, error, data } = useQuery<IUseArticleQuery>(getTagQuery, { variables: { category: category, take: take } })

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return <>{data!.categoryArticles!.map(product => <ProductCard item={product} key={product.articleNumber} />)}</>
}

export default CategoryArticles