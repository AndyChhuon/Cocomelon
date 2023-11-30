class Review{
    constructor(id, rating, comment){
        this._id = id;
        this._rating = rating;
        this._comment = comment;
    }
    getID(){
        return this.id;
    }
    getRating(){
        return this._rating;
    }
    getComment(){
        return this._comment;
    }
    setRating(rating){
        this._rating = rating;
    }
    setComment(comment){
        this._comment = comment;
    }

    serialize() {
        return JSON.stringify({
            id: this._id,
            rating: this._rating,
            comment: this._comment,
        })
    }

    static deserialize(jsonString){
        const data = JSON.parse(jsonString);
        const review = new Review(data.id, data.rating, data.comment);
        return review;
    }
}

module.exports = Review;