import { render } from '@testing-library/react';
import React, { Component } from 'react';

import Todo from './todo';
import AddTodo from './addtodo';

class Todos extends Component {
    state = {
        addTodoValue: "",
        todos: []
    }

//Local helper method to get date
getTime() {
  let d = new Date();
  var n = d.getTime();
  return n;
}

//method called from Todo components
handleDelete = todo => {
      const todos =     this.state.todos.filter((t) => {
        return t.id !== todo
      });
      this.setState({ todos });
}

handleDone = todo => {
      const todos = [...this.state.todos];
      todos.map((t) => {
         if (t.id === todo.id) {
             t.isDone = !t.isDone;
         }
         return t;
      });
      this.setState({ todos });
}

//method called from AddTodo components
addNewTodo = value => {
    if (value) {
      const todos = [...this.state.todos];
      todos.push(
        {
          id: this.getTime(),
          value: value,
          isDone: false
        }
      );
      this.setState({ addToValue: "", todos })
    }
    else {
      console.log("Please Add Todo Text");
    }
}

render() {
    return (
         <table className="table">
             <tbody>
                  <tr>
                      <td colSpan="4" className="text-center">
                          <AddTodo fooAddTodo={this.addNewTodo} addtodoValue={this.state.addTodoValue} />
                      </td>
                  </tr>
                  {this.state.todos.map((todo, index) =>(
                       <tr key={todo.id}>
                           <Todo index={index+1} todo={todo} fooDelete={this.handleDelete} fooDoneDone={this.handleDone} />
                       </tr>
                  ))}
             </tbody>
          </table>
          );
}
}

export default Todos;
