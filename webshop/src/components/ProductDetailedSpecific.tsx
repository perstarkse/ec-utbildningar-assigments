import React, { } from 'react'
import { NavLink } from 'react-router-dom'
import { ArticleProps } from '../interfaces/Interfaces';
import ExternalLinkIcon from './components/ExternalLinkIcon';
import ThemeButton from './components/ThemeButton';

const ProductDetailedSpecific: React.FC<ArticleProps> = ({ item }) => {
    return (
        <section className="product-detailed container">
            <div className="top-part">
                <div className="card">
                    <div className="product-images">
                        <div className="big-image">
                            <img src={item.imageName} alt="bigImg" />
                        </div>
                        <div className="small-images">
                            <div className="image-123">
                                <img src={item.imageName} alt="mini 1" />
                            </div>
                            <div className="image-123">
                                <img src={item.imageName} alt="mini 2" />
                            </div>
                            <div className="image-123">
                                <img src={item.imageName} alt="mini 3" />
                            </div>
                        </div>
                    </div>
                    <div className="text-holder">
                        <h1 className="title">{item.name}</h1>
                        <div className="sku-brand-holder">
                            <div className="sku">SKU: {item.articleNumber} </div>
                            <div className="brand">BRAND: The Northland</div>
                        </div>
                        <div className="rating">
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <i className="fa-sharp fa-solid fa-star"></i>
                        </div>
                        <div className="price">${item.price}</div>
                        <div className="description-text">{item.description}</div>
                        <form action="" className="product-detail-form">
                            <div className="row-descriptor">
                                <div className="descriptor">Size:</div>
                                <div className="size-inputs">
                                    <div className="square-radio">
                                        <label htmlFor="small">S</label>
                                        <input name="user-size" type="radio" id="small" value="s" />
                                    </div>
                                    <div className="square-radio">
                                        <label htmlFor="medium">M</label>
                                        <input name="user-size" type="radio" id="medium" value="m" />
                                    </div>
                                    <div className="square-radio">
                                        <label htmlFor="large">L</label>
                                        <input name="user-size" type="radio" id="large" value="l" />
                                    </div>
                                    <div className="square-radio">
                                        <label htmlFor="xl">X</label>
                                        <input name="user-size" type="radio" id="xl" value="x" />
                                    </div>
                                </div>
                            </div>
                            <div className="row-descriptor">
                                <div className="descriptor">Color:</div>
                                <select defaultValue={"default"} name="color" id="product-color" className="color-input">
                                    <option value="default" disabled >Choose an Option</option>
                                    <option value="black">Black</option>
                                    <option value="cyan">Cyan</option>
                                </select>
                            </div>
                            <div className="row-descriptor">
                                <div id="last-div" className="descriptor">Qty:</div>
                                <div className="qty">
                                    <div className="amount-button">
                                        <div className="less"><i className="fa-solid fa-minus"></i></div>
                                        <div className="number">1</div>
                                        <div className="more"><i className="fa-solid fa-plus"></i></div>
                                    </div>
                                    <ThemeButton input={"ADD TO CART"} />

                                </div>
                            </div>
                            <div className="row-descriptor">
                                <div className="descriptor">Share:</div>
                                <div className="share-links">
                                    <ExternalLinkIcon circle={true} icon={"fa-brands fa-facebook-f"} link={"https://facebook.com"} />
                                    <ExternalLinkIcon circle={true} icon={"fa-brands fa-instagram"} link={"https://instagram.com"} />
                                    <ExternalLinkIcon circle={true} icon={"fa-brands fa-twitter"} link={"https://twitter.com"} />
                                    <ExternalLinkIcon circle={true} icon={"fa-brands fa-google"} link={"https://google.com"} />
                                    <ExternalLinkIcon circle={true} icon={"fa-brands fa-linkedin"} link={"https://linkedin.com"} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            <div className="bottom-part">
                <div className="nav-links">
                    <NavLink to={"#"}>Description</NavLink>
                    <NavLink to={"#"}>Additional</NavLink>
                    <NavLink to={"#"}>Shopping & Returns</NavLink>
                    <NavLink to={"#"}>Reviews</NavLink>
                </div>
                <div className="text-holder">
                    <div className="top">Way extensive and dejection get delivered deficient sincerity gentleman age. Too end
                        instrument possession contrasted
                        motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy
                        northward sportsmen
                        education. Discovery incommode earnestly no he commanded if. Put still any about manor heard.</div>
                    <div className="bullet-points">* Village did removed enjoyed explain nor ham saw calling talking. <br></br>
                        * Securing as informed declared or margaret. <br></br>
                        * Joy horrible moreover man feelings own shy.
                    </div>
                    <div className="bottom">
                        On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why
                        sir
                        end believe
                        uncivil respect. Always get adieus nature day course for common. My little garret repair to desire
                        he
                        esteem.
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ProductDetailedSpecific