import { gql, OperationVariables, QueryResult, useMutation, useQuery } from "@apollo/client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { IArticle } from "../interfaces/Interfaces";

interface ProductProviderProps {
    children: ReactNode;
}
// LEGACY INTERFACE
// interface IProductContext {
//     articleRequest: IArticle;
//     product: IArticle;
//     products: IArticle[];
//     featuredProducts: IArticle[];
//     shirtProducts: IArticle[];
//     fourProducts: IArticle[];
//     tagProducts: IArticle[];
//     pantsProducts: IArticle[];
//     latestProducts: IArticle[];
//     mostExpensiveProducts: IArticle[];
//     getMostExpensiveProducts: (take: number) => void;
//     topReactedProducts: IArticle[];
//     getTopReactedProducts: (take: number) => void;
//     getLatestProducts: (take: number) => void;
//     getPantsProducts: (tag: string, take: number) => void;
//     getShirtProducts: (tag: string, take: number) => void;
//     getTagProducts: (tag: string, take: number) => void;
//     setArticleRequest: React.Dispatch<React.SetStateAction<IArticle>>;
//     setProduct: React.Dispatch<React.SetStateAction<IArticle>>;
//     getProduct: (articleNumber: string) => void;
//     getFeaturedProducts: (tag: string, take: number) => void;
//     getProducts: () => void;
//     getFourProducts: (take: number) => void;
//     createItem: (e: React.FormEvent) => void;
//     updateItem: (e: React.FormEvent) => void;
//     deleteItem: (articleNumber: string) => void;
//     getAllProducts: QueryResult<any, OperationVariables>;
//     setFeaturedProducts: React.Dispatch<React.SetStateAction<IArticle[]>>;
// }

interface IProductContext {
    articleRequest: IArticle;
    product: IArticle;
    products: IArticle[];
    setArticleRequest: React.Dispatch<React.SetStateAction<IArticle>>;
    setProduct: React.Dispatch<React.SetStateAction<IArticle>>;
    // getProduct: (articleNumber: string) => void;
    getProducts: () => void;
    createItem: (e: React.FormEvent) => void;
    updateItem: (e: React.FormEvent) => void;
    deleteItem: (articleNumber: string) => void;
    getAllProducts: QueryResult<any, OperationVariables>;
}

const ProductContext = createContext<IProductContext | null>(null);

export const useProductContext = () => {
    return React.useContext(ProductContext) as IProductContext;
}

const mockProduct = { "articleNumber": "", "tag": "", "name": "", "description": "", "category": "", "price": 0, "rating": 0, "imageName": "" };

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    // const url = 'https://win22-webapi.azurewebsites.net/api/products';
    const localUrl = 'http://localhost:8000/articles/'

    const [product, setProduct] = useState<IArticle>(mockProduct);
    const [products, setProducts] = useState<IArticle[]>([]);
    const [articleRequest, setArticleRequest] = useState<IArticle>(mockProduct);

    // const [featuredProducts, setFeaturedProducts] = useState<IArticle[]>([]);
    // const [fourProducts, setFourProducts] = useState<IArticle[]>([]);
    // const [tagProducts, setTagProducts] = useState<IArticle[]>([]);
    // const [shirtProducts, setShirtProducts] = useState<IArticle[]>([])
    // const [pantsProducts, setPantsProducts] = useState<IArticle[]>([])
    // const [latestProducts, setLatestProducts] = useState<IArticle[]>([])
    // const [mostExpensiveProducts, setMostExpensiveProducts] = useState<IArticle[]>([])
    // const [topReactedProducts, setTopReactedProducts] = useState<IArticle[]>([])

    // GRAPHQL 
    const getAllQuery = gql`{ articles { articleNumber, name, price, description, tag, category, price, rating, imageName }}`
    const getAllProducts = useQuery(getAllQuery)
    const getProducts = () => {
        if (getAllProducts.loading) return console.log("loading");
        if (getAllProducts.error) return console.log("error");
        else {
            setProducts(getAllProducts.data.articles);
        }
    }
    // const postQuery = gql`
    //     mutation 
    //     addArticle($articleNumber: String, $name: String, $price: Int, $description: String, $tag: String, $category: String, $rating: Int, $imageName: String) 
    //     {
    //             addArticle(articleNumber: $articleNumber, name: $name, price: $price, description: $description, tag: $tag, category: $category, rating: $rating, imageName: $imageName) 
    //                 {_id}
    //     } `
    // const [addProduct] = useMutation(postQuery)


    // LEGACY CODE

    // const getProducts = async () => {
    //     const res = await fetch(localUrl)
    //     setProducts(await res.json())
    // }

    // const getFeaturedProducts = async (tag: string, take = 8) => {
    //     const res = await fetch(localUrl + `tag=${tag}/${take}`)
    //     setFeaturedProducts(await res.json())
    // }

    // const getProduct = async (articleNumber: string) => {
    //     const res = await fetch(localUrl + `id=${articleNumber}`)
    //     setProduct(await res.json())
    // }

    // const getFourProducts = async (take = 4) => {
    //     const res = await fetch(localUrl + `take=${take}`)
    //     setFourProducts(await res.json())
    // }

    // const getTagProducts = async (tag: string, take = 4) => {
    //     const res = await fetch(localUrl + `tag=${tag}/${take}`)
    //     setTagProducts(await res.json())
    // }
    // const getTagProducts = async (tag: string, take = 4) => {
    //     if (getTaggedProducts.loading) return console.log("loading");
    //     if (getTaggedProducts.error) return console.log("error");
    //     else {
    //         setTagProducts(getTaggedProducts.data.articles);
    //     }
    // }

    // const getShirtProducts = async (tag: string, take = 4) => {
    //     const res = await fetch(localUrl + `cat=${tag}/${take}`)
    //     setShirtProducts(await res.json())
    // }
    // const getPantsProducts = async (tag: string, take = 4) => {
    //     const res = await fetch(localUrl + `cat=${tag}/${take}`)
    //     setPantsProducts(await res.json())
    // }

    // const getLatestProducts = async (take = 4) => {
    //     const res = await fetch(localUrl + `/latest/${take}`)
    //     setLatestProducts(await res.json())
    // }

    // const getMostExpensiveProducts = async (take = 4) => {
    //     const res = await fetch(localUrl + `/mostExpensive/${take}`)
    //     setMostExpensiveProducts(await res.json())
    // }
    // const getTopReactedProducts = async (take = 4) => {
    //     const res = await fetch(localUrl + `/topReacted/${take}`)
    //     setTopReactedProducts(await res.json())
    // }

    const createItem = async (e: React.FormEvent) => {
        e.preventDefault()

        //GRAPHQL IMPLEMENTATION
        // const result = await addProduct({ variables: articleRequest });
        // if (result) {
        //     setArticleRequest(mockProduct);
        //     getAllProducts.refetch();
        // }

        // EXPRESSJS IMPLEMENTATION
        const result = await fetch(localUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(articleRequest)
        })

        if (result.status === 201) {
            setArticleRequest(mockProduct);
            getAllProducts.refetch()
            return true;
        }
        else if (result.status === 400) {
            return false;
        }
    }

    const updateItem = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await fetch(localUrl + `id=${product.articleNumber}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })

        if (result.status === 200) {
            setProduct(mockProduct);
            getAllProducts.refetch();
        }
    }

    const deleteItem = async (articleNumber: string) => {
        const result = await fetch(localUrl + `id=${articleNumber}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })

        if (result.status === 200) {
            getProducts();
            getAllProducts.refetch();
        }
    }
    return <ProductContext.Provider value={{ getAllProducts, product, products, articleRequest, setProduct, getProducts, createItem, updateItem, deleteItem, setArticleRequest }}>
        {children}
    </ProductContext.Provider>
}

