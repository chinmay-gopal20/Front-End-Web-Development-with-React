import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardLink, CardText } from 'reactstrap';

class DishDetail extends Component{

    renderDishComments(comments_arr){
        const comments = comments_arr.map((comment_element) => {
            return(
                <div key={comment_element.id} className="comment-element">
                    <div className="comment">
                        <p>{comment_element.comment}</p>
                    </div>
                    <div className="author">
                        <p>--   {comment_element.author}, 
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                                                                .format(new Date(Date.parse(comment_element.date)))}
                        </p>
                    </div>
                </div>
            );
        })
        if(comments_arr){
            return(
                <Card className="dish-comments">
                    <div className="comments">
                        <div className="comment-title">
                            <h4>
                                <b>Comments</b>
                            </h4>
                        </div>
                        {comments}
                    </div>
                </Card>
            );
        }
        return(
            <div></div>
        );
    }

    renderDishDetails(dish){
        return(
            <Card className="dish-detail" key={dish.id}>
                <CardImg src={dish.image} alt={dish.name}/>
                <CardTitle className="dish-name">
                    <CardLink href="#" target="_blank">{dish.name}</CardLink>
                </CardTitle>
                <CardText className="dish-description">
                    {dish.description}
                </CardText>
            </Card>
        );
    }

    renderDish(dish){
        if(dish){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">    
                        {this.renderDishDetails(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDishComments(dish.comments)}
                    </div>
                </div>
            );
        }
        return(
            <div></div>
        );
    }

    render(){
        const dish = this.props.dish;
        return (
            <div className="container">
                        {this.renderDish(dish)}
            </div>
        );
    }
}

export default DishDetail;