import React, {Component} from 'react';
import { Card, CardImg, CardTitle, CardLink, CardText, Breadcrumb, BreadcrumbItem, Button, Modal,
            ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
// import CommentForm from './CommentFormComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    renderCommentForm(){
        return(
            <React.Fragment>
                <Button outline color="primary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit comment
                </Button>
                <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                            className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" name="name"
                                                    id="name"
                                                    placeholder="Your name"
                                                    className="form-control"
                                                    validators={{
                                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment"
                                                    id="comment"
                                                    placeholder="Comment"
                                                    className="form-control"
                                                    rows="6"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button name="submit" value="submit" id="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )

    }

    render(){
        return(
            <div className="comment-form">
                {this.renderCommentForm()}
            </div>
        );
    }
}

function RenderDishComments({ dishComments, postComment, dishId }){
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
                    <CommentForm dishId={dishId} postComment={postComment}/>
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
            <CardImg src={baseUrl + dish.image} alt={dish.name}/>
            <CardTitle className="dish-name">
                <CardLink href="#" target="_blank">{dish.name}</CardLink>
            </CardTitle>
            <CardText className="dish-description">
                {dish.description}
            </CardText>
        </Card>
    );
}

function RenderDish({dish, comments, postComment, dishId, isLoading, errMsg}){
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">    
                    <RenderDishDetails dish={dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderDishComments 
                        dishComments={comments} 
                        postComment={postComment} 
                        dishId={dishId}
                    />
                </div>
            </div>
        );
}

const DishDetail = (props) => {
    if(props.isLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <Loading/>
                </div>
            </div>
        )
    }else if(props.errMsg){
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        )
    }else if(props.dish!=null){
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
                    <RenderDish  dish={dish} 
                                 comments={comments} 
                                 postComment={props.postComment}
                                 dishId={dish.id} 
                                 isLoading={props.isLoading} 
                                 errMsg={props.errMsg}
                    />
                 </div>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}

export default DishDetail; 