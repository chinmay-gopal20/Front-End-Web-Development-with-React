import React, {Component} from 'react';

import Home from './HomeComponent';

import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponenet';
import Contact from './ContactComponent';
import About from './AboutComponent';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

class Main extends Component {

    constructor(props){
      super(props);

    }

    render() {

      const HomePage = () => {
        return (
          <Home 
                dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        );
      }

      const ContactUsPage = () => {
        return <Contact />
      }

      const MenuPage = () => {
        return <Menu dishes={this.props.dishes} />
      }

      const DishPage = ({match}) => {
        return (
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          />
        )
      }

      const AboutUsPage= () => {
        return <About leaders={this.props.leaders}/>
      }

      return (
        <div>
          <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={MenuPage}/>
            <Route path="/menu/:dishId" component={DishPage}/>
            <Route path="/contactus" component={ContactUsPage}/>
            <Route path="/aboutus" component={AboutUsPage}/>
            <Redirect to="/home" />
          </Switch>
          <Footer/>
        </div>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps)(Main));