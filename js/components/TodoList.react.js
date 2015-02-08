var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');

var TodoList = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    color: ReactPropTypes.string
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} color={this.props.color}/>);
    }

    return (
      <ul className="todo">{todos}</ul>
    );
  },

});

module.exports = TodoList;
