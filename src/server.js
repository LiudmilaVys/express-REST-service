const { PORT } = require('./common/config');
const { initApp } = require('./app');

initApp().then(app => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
