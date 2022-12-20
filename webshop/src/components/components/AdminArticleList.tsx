import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useProductContext } from '../../contexts/ProductContext'
import { ArticleProps, IArticle } from '../../interfaces/Interfaces'
import { ArticleValidation } from '../../scripts/articleManagementValidation'

interface IUseArticleQuery {
    article: IArticle
}

const ArticleList: React.FC<ArticleProps> = ({ item }) => {

    const getQuery = gql` query article($articleNumber: String){article(articleNumber: $articleNumber){articleNumber, name, price, description, tag, category, price, rating, imageName}}`
    const { loading, error, data } = useQuery<IUseArticleQuery>(getQuery, { variables: { articleNumber: item.articleNumber } })

    const { deleteItem, setProduct, updateItem, product } = useProductContext()

    const [editing, setEditing] = useState(false)
    const [editError, setEditError] = useState(false)

    const getToEditing = () => {
        if (editing === true) {
            setEditing(false)
        }
        else {
            setEditing(true);
            setProduct(data!.article)
        }
    }

    const submitEdits = (e: React.FormEvent<HTMLFormElement>, article: IArticle) => {
        if (ArticleValidation(article) === true) {
            updateItem(e);
            setEditing(false)
        }
        else {
            e.preventDefault()
            setEditError(true)
        }
    }

    return (
        <>
            <div className='adminArticleList'>
                {
                    editing ? (<div data-testid="edit-view" className='editArticle text-center'>
                        <img className="mt-3 mb-3" src={item.imageName} alt="productImage" />
                        <form onSubmit={(e) => { submitEdits(e, product) }} >
                            <input hidden value={product.articleNumber} onChange={(e) => setProduct({ ...product, articleNumber: e.target.value })}
                                type="text" placeholder='articlenumber' name='articleNumber' />
                            <label htmlFor="name">Name:</label>
                            <input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} type="text" placeholder='name' name='name' />
                            <label htmlFor="category">Category:</label>
                            <input value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} type="text" placeholder='category' name='category' />
                            <label htmlFor="tag">Tag</label>
                            <input value={product.tag} onChange={(e) => setProduct({ ...product, tag: e.target.value })} type="text" placeholder='tag' name='tag' />
                            <label htmlFor="description">Description</label>
                            <input value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} type="text" placeholder='description' name='description' />
                            <label htmlFor="imageName">Image URL:</label>
                            <input value={product.imageName} onChange={(e) => setProduct({ ...product, imageName: e.target.value })} type="text" placeholder='imagename' name='imagename' />
                            <label htmlFor="price">Price:</label>
                            <input value={product.price} onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })} type="number" placeholder='price' name='price' />
                            <label htmlFor="rating">Rating:</label>
                            <input value={product.rating} onChange={(e) => setProduct({ ...product, rating: parseInt(e.target.value) })} type="number" placeholder='rating' name='rating' />
                            <button className="btn-themed" type='submit'>Update article</button>
                            <button className="btn-themed" onClick={getToEditing}>Cancel</button>
                            {
                                editError ? (<><h2>Failed validation, check your inputs, articlenumber cannot be blank</h2></>) : (<></>)
                            }
                        </form></div>)
                        : (<>
                            <div className='d-flex justify-content-center'>
                                <li className='articleList' >
                                    <ul><img src={item.imageName} alt="productImage" /></ul>
                                    <ul>{item.name}</ul>
                                    <ul>{item.category}</ul>
                                    <ul>{item.tag}</ul>
                                    <ul>{item.description}</ul>
                                    <ul>{item.price}</ul>
                                    <ul>{item.rating}</ul>
                                    <ul className='buttonGroup'>
                                        <button onClick={() => getToEditing()}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button onClick={() => deleteItem(item.articleNumber)} className='me-1'><i className="fa-solid fa-trash"></i></button>
                                    </ul>
                                </li>
                            </div>
                        </>)
                }

            </div>
        </>
    )
}

export default ArticleList