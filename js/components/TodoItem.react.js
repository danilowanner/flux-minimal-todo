var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var cx = require('react/lib/cx');

var TodoItem = React.createClass({

  propTypes: {
    todo: ReactPropTypes.object.isRequired,
    color: ReactPropTypes.string
  },
  
  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var todo = this.props.todo;
    
    var input;
    if (this.state.isEditing) {
      input = <TodoTextInput className="edit" onSave={this._onSave} value={todo.text} />;
    }
    
    return (
      <li key={todo.id} style={ {color: this.props.color} }>
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.complete} onChange={this._onToggleComplete} />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} style={ {backgroundColor: this.props.color} }>{ "delete" }</button>
        </div>
        {input}
      </li>
    );
  },
  
  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.props.todo);
  },
  
  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },
  
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  },
  
  _onDestroyClick: function() {
    TodoActions.destroy(this.props.todo.id);
  }

});

module.exports = TodoItem;
