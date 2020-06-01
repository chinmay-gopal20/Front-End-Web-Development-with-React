import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardLink, CardText, CardGroup } from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props);
    }


    renderDishComments(comments_arr){
        const comments = comments_arr.map((comment_element) => {
            return(
                <div key={comment_element.id} className="comment-element">
                    <div className="comment">
                        <p>{comment_element.comment}</p>
                    </div>
                    <div className="author">
                        <p>-- {comment_element.author}, {new Date(comment_element.date).toDateString()}</p>
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
                <CardGroup className="selected-dish">
                    <div className="col-12 col-md-5 m-1">    
                        {this.renderDishDetails(dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDishComments(dish.comments)}
                    </div>
                </CardGroup>
            );
        }
        return(
            <div></div>
        );
    }

    render(){
        const dish = this.props.dish;
        return (
            <div className="row">
                    {this.renderDish(dish)}
            </div>
        );
    }
}

export default DishDetail;