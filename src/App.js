import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    currentPizza: {    
    "id": null,
    "topping": "",
    "size": "Small",
    "vegetarian": true}
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas").then(resp=>resp.json()).then(content=>this.setState({pizzas: content}))
  }

  choosePizza = (pizza) => {
    this.setState({currentPizza: pizza})
  }

  handleOnSubmit = () => {
    let arr = this.state.pizzas.map(piz => {
        if(piz.id === this.state.currentPizza.id){
          return this.state.currentPizza
        }
        else {
          return piz
        }
        
      })

      this.setState({pizzas: arr})


      fetch(`http://localhost:3000/pizzas/${this.state.currentPizza.id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.currentPizza),
        })
    }
  

  handleOnChange = (e) => {
    if (e.target.name === "vegetarian"){
      this.setState({currentPizza:{...this.state.currentPizza, [e.target.name]: e.target.value==="true"? true : false}})
    }
    else{
      this.setState({currentPizza:{...this.state.currentPizza, [e.target.name]: e.target.value}})
    }
  }



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm currentPizza={this.state.currentPizza} handleOnSubmit={this.handleOnSubmit} handleOnChange={this.handleOnChange}/>
        <PizzaList pizzas={this.state.pizzas} choosePizza={this.choosePizza}/>
      </Fragment>
    );
  }
}

export default App;
