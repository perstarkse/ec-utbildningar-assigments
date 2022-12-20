import React, { useState } from 'react'
import { useProductContext } from '../../../contexts/ProductContext'
import { IArticle } from '../../../interfaces/Interfaces'
import { ArticleValidation } from '../../../scripts/articleManagementValidation'

const CreateArticle: React.FC = () => {

    const { createItem, articleRequest, setArticleRequest } = useProductContext()

    const [creating, setCreating] = useState(false)
    const [createdItem, setCreatedItem] = useState(false)
    const [creatingError, setCreatingError] = useState(false)

    const getToCreating = () => {
        if (creating === true) {
            setCreating(false)
        }
        else {
            setCreating(true);
            setCreatedItem(false);
        }
    }

    const submitArticle = (e: React.FormEvent<HTMLFormElement>, article: IArticle) => {
        if (ArticleValidation(article) === true) {
            createItem(e);
            setCreating(false);
            setCreatedItem(true);
            setCreatingError(false)
        }
        else {
            e.preventDefault()
            setCreatingError(true)
        }
    }

    return (
        <div className='d-grid mt-5 adminCreateItem'>
            {
                creating ? (
                    <form className="createForm d-grid" onSubmit={(e) => { submitArticle(e, articleRequest) }} >
                        <h2 className='text-center'>Create a new item</h2>
                        <label htmlFor="articleNumber">ArticleNumber:</label>
                        <input value={articleRequest.articleNumber} required onChange={(e) => setArticleRequest({ ...articleRequest, articleNumber: e.target.value })}
                            type="text" placeholder='articlenumber' name='articleNumber' />
                        <label htmlFor="name">Name:</label>
                        <input value={articleRequest.name} onChange={(e) => setArticleRequest({ ...articleRequest, name: e.target.value })} type="text" placeholder='name' name='name' />
                        <label htmlFor="category">Category:</label>
                        <input value={articleRequest.category} onChange={(e) => setArticleRequest({ ...articleRequest, category: e.target.value })} type="text" placeholder='category' name='category' />
                        <label htmlFor="tag">Tag</label>
                        <input value={articleRequest.tag} onChange={(e) => setArticleRequest({ ...articleRequest, tag: e.target.value })} type="text" placeholder='tag' name='tag' />
                        <label htmlFor="description">Description</label>
                        <input value={articleRequest.description} onChange={(e) => setArticleRequest({ ...articleRequest, description: e.target.value })} type="text" placeholder='description' name='description' />
                        <label htmlFor="imageName">Image URL:</label>
                        <input value={articleRequest.imageName} onChange={(e) => setArticleRequest({ ...articleRequest, imageName: e.target.value })} type="text" placeholder='imagename' name='imagename' />
                        <label htmlFor="price">Price:</label>
                        <input value={articleRequest.price} onChange={(e) => setArticleRequest({ ...articleRequest, price: parseInt(e.target.value) })} type="number" placeholder='price' name='price' />
                        <label htmlFor="rating">Rating:</label>
                        <input value={articleRequest.rating} onChange={(e) => setArticleRequest({ ...articleRequest, rating: parseInt(e.target.value) })} type="number" placeholder='rating' name='rating' />
                        <button className='btn-themed'>Submit new item</button>
                        {
                            creatingError ? (<><h2>Failed validation, check your inputs, articlenumber cannot be blank, rating is 0-5.</h2></>) : (<></>)
                        }
                    </form>) : (<></>)
            }
            {
                creating ? (< button className='btn-themed mt-2' onClick={getToCreating}>Cancel creating </button>) : (<button className='btn-themed' onClick={getToCreating}>Create new item</button>)
            }
            {
                createdItem ? (<div data-testid="createdItem" className='alert alert-success text-center mt-2' role="alert"><h2>You created a new item.</h2></div>)
                    : (<></>)
            }

        </div>
    )
}

export default CreateArticle