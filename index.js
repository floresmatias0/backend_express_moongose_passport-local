const server = require('./src/app.js');
const { connect } = require('./src/db.js');

connect();

server.listen(process.env.PORT, () => {
  console.log('Listening at ' + process.env.PORT);
});