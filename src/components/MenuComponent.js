import React from 'react';
import { Card, CardImg, CardTitle, CardLink} from 'reactstrap';


function RenderMenuItem({ dish, onClick }){
    return(
        <Card onClick={() => onClick(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardTitle>
                <CardLink href="#" target="_blank">{dish.name}</CardLink>
            </CardTitle>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.dishes.map((dish) => {
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1"> 
                <RenderMenuItem dish={dish} onClick={props.onClick} />
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

export default Menu;