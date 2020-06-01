import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, CardLink, CardHeader, CardFooter} from 'reactstrap';

class Menu extends Component{
    constructor(props){
        super(props);

        //state usually holds the property values that belongs to the component, change in state obj re-renders the component
        this.state = {
            selectedDish: null
        };
    }

    onDishSelect(dish){
        this.setState({selectedDish: dish});
    }

    renderSelectedDish(dish){
        console.log(dish)
        if(dish){
            return (
                <div  className="col-12 col-md-5 m-1">
                    <Card>
                        <CardHeader>Dish</CardHeader>
                        <CardImg src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                                <blockquote>
                                    <cite>
                                        <CardText>{dish.comments[0].comment}</CardText>
                                    </cite>
                                    <footer className="blockquote-footer">
                                        {dish.comments[0].author}
                                    </footer>
                                </blockquote>
                            </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    //must present in component
    //target="_blank" opens link in new tab
    render(){
        const menu = this.props.dishes.map((dish) => {
            return(
                <div className="col-12 col-md-5 m-1"> 
                    <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardLink href="#" target="_blank">
                                <CardTitle>{dish.name}</CardTitle>
                            </CardLink>
                        </CardBody>
                    </Card>
                </div>
            );
        });
        
        return(
             <div className="container">
                <div className="row">
                    {menu}
                    {this.renderSelectedDish(this.state.selectedDish)}
                </div>
            </div>
        );
    }
}

export default Menu;