import React, { useContext, useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import TopAdBar from "../components/TopAdBar";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import ProductGrid from '../components/components/ProductGrid';
import { useProductContext } from '../contexts/ProductContext';


const ProductDetailsView = () => {
    const { products, getProducts, getAllProducts } = useProductContext();

    useEffect(() => {
        getProducts();
    }, [products, getProducts])

    window.top!.document.title = 'Product Details | Fixxo.';

    return (
        <>
            <NavBar />
            <TopAdBar />
            <TopNav subPage="Product Details" />
            {
                getAllProducts.loading ? (<><div className='d-flex justify-content-center align-items-center'>loading</div></>) : (<><ProductGrid title={"All Products"} items={products!} /></>)
            }
            <Footer />
        </>
    )
}

export default ProductDetailsView