import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? 'Yes' : 'No'}</td>
      <td><button onClick={props.grabPizza} type="button" className="btn btn-primary" id={props.id}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza


// { "id": 1,
//       "topping": "Plain",
//       "size": "Small",
//       "vegetarian": true
//     }