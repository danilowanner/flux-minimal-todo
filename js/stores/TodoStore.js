/*
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

if( ! require('react/lib/ExecutionEnvironment').canUseDOM )
{
  _todos[1029847120983409] = {
    id: 1029847120983409,
    complete: false,
    text: "default item"
  };
}

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {

  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
  * Get the entire collection of TODOs.
  * @return {object}
  */
  getAll: function() {
    return _todos;
  },
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  /**
  * @param {function} callback
  */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  /**
  * @param {function} callback
  */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  dehydrate: function() {
    return {
      todos: _todos
    }
  },
  
  hydrate: function(state) {
    _todos = state.todos;
  },
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;
  
  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      TodoStore.emitChange();
      break;
     
    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;
      
    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;
    
    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;
    
    default:
      // no op
  }
});

module.exports = TodoStore;
