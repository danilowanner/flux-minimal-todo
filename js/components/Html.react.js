var React = require('react');

/**
 * React class to handle the rendering of the HTML head section
 *
 * @class Head
 * @constructor
 */
var Html = React.createClass({
    
  render: function() {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="public/app.css" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script src='public/app.js' />
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script dangerouslySetInnerHTML={{__html:'Application.start()'}}/>
      </html>
    );
  }
});

module.exports = Html;