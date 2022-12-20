"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdatedArticle {
    constructor(_id, articleNumber, name, description, category, price, rating, imageName) {
        this._id = _id;
        this.articleNumber = articleNumber;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.rating = rating;
        this.imageName = imageName;
    }
}
exports.default = UpdatedArticle;
