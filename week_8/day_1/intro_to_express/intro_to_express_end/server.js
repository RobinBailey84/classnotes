const express = require('express');
const app = express();

app.use(express.static('client/public'));

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
// }); HAPPENS BY DEFAULT

app.listen(3000, () => {
  console.log('App running on port 3000');
});
