var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

	/**
	 * @param  {string} text
	 */
	create: function(text) {
		AppDispatcher.dispatch({
		  actionType: TodoConstants.TODO_CREATE,
		  text: text
		});
	},
	
	/**
	* @param  {string} id
	*/
	destroy: function(id) {
		AppDispatcher.dispatch({
		  actionType: TodoConstants.TODO_DESTROY,
		  id: id
		});
	},
	
	/**
	 * Toggle whether a single ToDo is complete
	 * @param  {object} todo
	 */
	toggleComplete: function(todo) {
	  var id = todo.id;
	  if (todo.complete) {
	    AppDispatcher.dispatch({
	      actionType: TodoConstants.TODO_UNDO_COMPLETE,
	      id: id
	    });
	  } else {
	    AppDispatcher.dispatch({
	      actionType: TodoConstants.TODO_COMPLETE,
	      id: id
	    });
	  }
	},
	
	/**
	 * @param  {string} id The ID of the ToDo item
	 * @param  {string} text
	 */
	updateText: function(id, text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT,
			id: id,
			text: text
		});
	},

};

module.exports = TodoActions;
