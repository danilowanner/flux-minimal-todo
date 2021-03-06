/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var TodoList = require('./TodoList.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAppState() {
  return {
    allTodos: TodoStore.getAll(),
    mainColor: "rgb(100,120,200)"
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getAppState();
  },
  
  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
  * @return {object}
  */
  render: function() {
    return (
      <div>
        <Header color={this.state.mainColor} />
        <TodoList
          allTodos={this.state.allTodos} color={this.state.mainColor} />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },
  
  /**
  * Event handler for 'change' events coming from the TodoStore
  */
  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = TodoApp;
