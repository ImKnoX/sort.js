const SortJSFramework = require('./framework');
const app = new SortJSFramework();
const morgan = require('morgan')

app.app.use(morgan('dev'))

//similar to useState hook on React
app.setState('count', 2)

app.app.post('/update-count', (req, res) => {
    if (req.body.increment) {
      app.setState('count', app.getState('count') + 1);
    }
    res.redirect('/');
});

// Add routes
app.addRoute('/', 'index');
app.addRoute('/about', 'about');

// Start the server
app.start(3000, () => {
  console.log('Server is running on port 3000');
});