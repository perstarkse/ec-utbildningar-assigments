import { gql, useQuery } from "@apollo/client"
import { IArticle } from "../../interfaces/Interfaces"
import ProductCard from "./ProductCard"

interface IUseArticleQuery {
    topReacted: IArticle[]
}
interface IArticles {
    take: number
}
const TopReactedArticles = ({ take }: IArticles) => {
    const getQuery = gql` query topReacted($take: Int){topReacted(take: $take){articleNumber, name, price, description, tag, category, price, rating, imageName}}`
    const { loading, error, data } = useQuery<IUseArticleQuery>(getQuery, { variables: { take: take } })

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return <>{data!.topReacted?.map(product => <ProductCard item={product} key={product.articleNumber} />)}</>
}

export default TopReactedArticles