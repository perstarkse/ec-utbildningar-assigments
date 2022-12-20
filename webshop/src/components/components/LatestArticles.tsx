import { gql, useQuery } from "@apollo/client"
import { IArticle } from "../../interfaces/Interfaces"
import ProductCard from "./ProductCard"

interface IUseArticleQuery {
    latestArticles: IArticle[]
}
interface ILatestArticles {
    take: number
}
const LatestArticles = ({ take }: ILatestArticles) => {
    const getTagQuery = gql` query latestArticles($take: Int){latestArticles(take: $take){articleNumber, name, price, description, tag, category, price, rating, imageName}}`
    const { loading, error, data } = useQuery<IUseArticleQuery>(getTagQuery, { variables: { take: take } })

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return <>{data!.latestArticles!.map(product => <ProductCard item={product} key={product.articleNumber} />)}</>
}

export default LatestArticles