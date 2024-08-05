const express = require('express');
const path = require('path');


class SortFramework {
  constructor() {
    this.app = express();
    this.viewsDir = path.join(__dirname, 'views');
    this.staticDir = path.join(__dirname, 'public');
    this.app.set('views', this.viewsDir);
    this.app.set('view engine', 'ejs');
    this.app.use(express.static(this.staticDir));
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // Initialize state management
    this.state = {};
    this.updateCallbacks = {};
  }

  // Method to set initial state
  setState(key, value) {
    this.state[key] = value;
    this.triggerUpdateCallbacks(key);
  }

  // Method to get state
  getState(key) {
    return this.state[key];
  }

  // Method to register callbacks for state updates
  onStateUpdate(key, callback) {
    if (!this.updateCallbacks[key]) {
      this.updateCallbacks[key] = [];
    }
    this.updateCallbacks[key].push(callback);
  }

  // Method to trigger callbacks when state changes
  triggerUpdateCallbacks(key) {
    if (this.updateCallbacks[key]) {
      this.updateCallbacks[key].forEach(callback => callback(this.state[key]));
    }
  }

  addRoute(route, viewName) {
    this.app.get(route, (req, res) => {
      res.render(viewName, { state: this.state });
    });
  }

  start(port, callback) {
    this.app.listen(port, callback);
  }
}
module.exports = SortFramework;