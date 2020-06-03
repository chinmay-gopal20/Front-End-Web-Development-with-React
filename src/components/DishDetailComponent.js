import React from 'react';
import { Card, CardImg, CardTitle, CardLink, CardText } from 'reactstrap';

function RenderDishComments({ dishComments }){
    const comments = dishComments.map((comment_element) => {
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
    if(dishComments){
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

function RenderDishDetails({ dish }){
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

function RenderDish({ dish }){
    if(dish){
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">    
                    <RenderDishDetails dish={dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderDishComments dishComments={dish.comments}/>
                </div>
            </div>
        );
    }
    return(
        <div></div>
    );
}

const DishDetail = (props) => {
    const dish = props.dish;
        return (
            <div className="container">
                 <RenderDish  dish={dish}/>
            </div>
        );
}

export default DishDetail;