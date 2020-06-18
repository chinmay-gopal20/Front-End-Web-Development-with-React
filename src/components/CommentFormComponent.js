import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isModalOpen: false,
            name: '',
            comment: '',
            rating: '',
            touched: {
                name: false,
                rating: false,
                comment: false,
            }
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleModal(){
        this.setState({
          isModalOpen: !this.state.isModalOpen
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        })
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        this.toggleModal()
        alert("Rating : " + this.state.rating + ", Name :  " + this.state.name + ", Comment : " + this.state.comment)
        event.preventDefault()  
    }

    validate(name){
        const errors = {
            name: '',
        }    

        if(this.state.touched.name && name=='' && !name.length){
            errors.name = 'Required'
        }
        if(name.length<3 && this.state.touched.name){
            errors.name='Must be greater than 2 characters';
        }
        if(name.length>15 && this.state.touched.name ){
            errors.name='Must be less than 15 characters';
        }

        return errors;
    }

    renderCommentForm(){
        const errors = this.validate(this.state.name);
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="select" name="rating" id="rating"
                                    value={this.state.rating} 
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleBlur('rating')}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Your Name" 
                                    value={this.state.name}
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleBlur('name')}
                                />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" name="comment" id="comment" rows="6" 
                                        value={this.state.comment} 
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('comment')}
                                />
                            </FormGroup>
                            <Button color="primary" type="submit" value="submit" name="submit">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

    render(){
        return(
            <div className="comment-form">
                {this.renderCommentForm()}
            </div>
        );
    }
}

export default CommentForm;