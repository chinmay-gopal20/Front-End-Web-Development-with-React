import React from 'react';
import { Card, CardImg, CardTitle, CardLink, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom'

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

function RenderDish({dish, comments}){
    if(dish){
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">    
                    <RenderDishDetails dish={dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderDishComments dishComments={comments}/>
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
    const comments = props.comments;
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={`menu/${dish.id}`}>{dish.name}</Link></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>
                        {dish.name}
                    </h3>
                    <hr />
                </div>  
                 <div className="row">
                    <RenderDish  dish={dish} comments={comments}/>
                 </div>
            </div>
        );
}

export default DishDetail;