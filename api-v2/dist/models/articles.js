"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Article {
    constructor(articleNumber, tag, name, description, category, price, rating, imageName) {
        this.articleNumber = articleNumber;
        this.tag = tag;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.rating = rating;
        this.imageName = imageName;
    }
}
exports.default = Article;
