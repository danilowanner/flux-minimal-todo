var React = require('react');

var HtmlComponent = require('./components/Html.react');
var TodoApp = require('./components/TodoApp.react');
var TodoStore = require('./stores/TodoStore');

var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

module.exports = {

  start: function(state) {
    if (ExecutionEnvironment.canUseDOM) {
      var state = window.AppState;
      this.hydrateStores(window.AppState)
      
      React.render(<TodoApp />, document.getElementById('app'));
    } else {
      //return '<!DOCTYPE html>' + React.renderToString(<TodoApp state={state} />);
      
      var html = React.renderToStaticMarkup(
        <HtmlComponent
          state={ state }
          app={ React.renderToString( <TodoApp /> ) }
          title="Danilo’s Flux Todo Demo Application" />
            );
            return '<!DOCTYPE html>' + html;
    }
  },

  dehydrateStores: function() {
    var states = {
      TodoStore: TodoStore.dehydrate()
    };
    return states;
  },
  
  hydrateStores: function(states) {
    TodoStore.hydrate( states.TodoStore );
  }
}
