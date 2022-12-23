import { gql, useQuery } from "@apollo/client"
import { IArticle } from "../../interfaces/Interfaces"
import ProductCard from "./ProductCard"

interface IUseArticleQuery {
    tagArticles: IArticle[]
}

interface ITagArticles {
    tag: string,
    take: number
}

const TagArticles = ({ tag, take }: ITagArticles) => {
    const getTagQuery = gql` query tagArticles($tag: String, $take: Int){tagArticles(tag: $tag, take: $take){articleNumber, name, price, description, tag, category, price, rating, imageName}}`
    const { loading, error, data } = useQuery<IUseArticleQuery>(getTagQuery, { variables: { tag: tag, take: take } })

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return <>{data!.tagArticles!.map(product => <ProductCard item={product} key={product.articleNumber} />)}</>
}

export default TagArticles