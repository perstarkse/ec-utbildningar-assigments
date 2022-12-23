export interface ExternalLinkIconProps {
    link: string;
    icon: string;
    circle?: boolean;
}

export interface IacceessToken {
    id: string,
    iat: number,
    exp: number
}
export interface MenuIconProps {
    link: string;
    icon: string;
    quantity?: number | string;
    hideOnMobile: boolean;
}

export interface ArticleProps {
    item: IArticle;
}

export interface ProductGridProps {
    title: string;
    items: IArticle[];
}

export interface ShoppingCartItemProps {
    item: ICartItem;
}

export interface ThemeButtonProps {
    input: string;
    modclassName?: string;
}

export interface IShoppingCart {
    cartItems: ICartItem[];
}
export interface TopNavProps {
    subPage: string;
}

export interface IProductList {
    items: IArticle[];
}

export interface IArticle {
    articleNumber: string;
    tag: string;
    name: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    imageName: string;
}

export interface ICartItem {
    articleNumber: string;
    product: IArticle;
    quantity: number;
}