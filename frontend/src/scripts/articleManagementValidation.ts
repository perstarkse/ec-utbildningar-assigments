import { IArticle } from "../interfaces/Interfaces"

// SIMPLE ARTICLE VALIDATION CLIENTSIDE

export const ArticleValidation = (articleSuggestion: IArticle) => {
    // const baseErrors = { articleNumberError: "", ratingError: "" }
    // const [errors, setErrors] = useState<Ierrors>(baseErrors)

    if (articleSuggestion.articleNumber.length < 1) {
        // setErrors({ articleNumberError: "articleNumber cannot be null" })
        return false
    }
    else if (articleSuggestion.rating < 0) {
        // setErrors({ ratingError: "rating cannot be less than 0" })
        return false
    }
    else if (articleSuggestion.rating > 5) {
        return false
    }
    else { return true }
} 