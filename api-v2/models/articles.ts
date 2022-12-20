export default class Article {
    constructor(
        public articleNumber: string,
        public tag: string,
        public name: string,
        public description: string,
        public category: string,
        public price: number,
        public rating: number,
        public imageName: string,
    ) { }
}