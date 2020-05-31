import React, {Component} from 'react';
import {Media} from 'reactstrap';

class Menu extends Component{
    constructor(props){
        super(props);

        //state usually holds the property values that belongs to the component, change in state obj re-renders the component
        this.state = {
        };
    }

    //must present in component
    //target="_blank" opens link in new tab
    render(){
        const menu = this.props.dishes.map((dish) => {
            return(
                <div key={dish.id} className="col-12 mt-5"> 
                    <Media tag="li">
                        <Media left middle href="https://reactjs.org/docs/introducing-jsx.html" target="_blank">
                            <Media object src={dish.image} alt={dish.name}/>
                        </Media>
                        <Media body className="ml-5">
                            <Media heading>
                                {dish.name}
                            </Media>
                            <p>{dish.description}</p>
                        </Media>
                    </Media>
                </div>
            );
        });
        
        return(
             <div className="container">
                <div className="row">
                    <Media list>
                        {menu}
                    </Media>
                </div>
            </div>
        );
    }
}

export default Menu;