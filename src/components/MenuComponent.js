import React, {Component} from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, CardLink, CardHeader} from 'reactstrap';

class Menu extends Component{

    renderSelectedDish(dish){
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
                <div key={dish.id} className="col-12 col-md-5 m-1"> 
                    <Card onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardTitle>
                            <CardLink href="#" target="_blank">{dish.name}</CardLink>
                        </CardTitle>
                    </Card>
                </div>
            );
        });
        
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;