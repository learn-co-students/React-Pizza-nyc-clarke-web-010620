import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

let API = 'http://localhost:3000/pizzas'

class App extends Component {

  state = {
    pizzas: [],
    foundPizza: {}
  }

  componentDidMount(prevState, prevProps) {
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({pizzas: data}))
  }


  grabPizza = (event) => {
    let idx = parseInt(event.target.id) - 1
    let pizza = this.state.pizzas[idx]
    this.setState({foundPizza: pizza})
  }

  handleChange = (event) => {
    let changedPizza = {...this.state.foundPizza}
    changedPizza[event.target.name] = event.target.value
    this.setState({foundPizza: changedPizza})
    
  }

  handleSubmit = (event) => {
    
    event.preventDefault();
    
    let id = this.state.foundPizza.id

    // debugger
    fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify(this.state.foundPizza)
    }
    ).then(resp => resp.json())
     .then(body => {
       let pizzas2 = [...this.state.pizzas]
       let idx = pizzas2.findIndex(pizza => pizza.id === id)
       pizzas2[idx] = body
       this.setState({pizzas: pizzas2})
     })








    // .then(body=> {
    //   let pizzas2 = [...this.state.pizzas]
    //   let pizzaIndx = pizzas2.findIndex(pizza => pizza.id === id)
    //   pizzas2[pizzaIndx] = body
    //   this.setState({pizzas: pizzas2})
    // })

    // let pizzasCopy = [...this.state.pizzas]
    // let editedPizza = pizzasCopy[this.state.foundPizza.id]
    // editedPizza.object.Assign({}, this.state.foundPizza)
    // this.setState({pizzas: pizzasCopy})
    
    // pizzasCopy.indexOf(this.state.foundPizza.id + 1).remove
  }


  render() {    
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.foundPizza} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} grabPizza={this.grabPizza}/>
      </Fragment>
    );
  }
}

export default App;
