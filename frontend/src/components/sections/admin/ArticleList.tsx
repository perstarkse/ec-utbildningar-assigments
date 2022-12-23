import { gql, useQuery } from '@apollo/client'
import { IArticle } from '../../../interfaces/Interfaces'
import AdminArticleList from '../../components/AdminArticleList'

interface IUseArticleQuery {
    articles: IArticle[]
}

const ArticleList = () => {
    const getAllQuery = gql`{ articles { articleNumber, name, price, description, tag, category, price, rating, imageName }}`
    const { loading, error, data } = useQuery<IUseArticleQuery>(getAllQuery)

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className='mt-5'>
            <div>
                <h2 className='text-center'>Articles:</h2>
            </div>
            {
                data!.articles.map(product => <AdminArticleList item={product} key={product.articleNumber} />)
            }
        </div>
    )
}

export default ArticleList