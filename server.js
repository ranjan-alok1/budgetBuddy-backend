const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
// const { connect } = require("http2");
const connectDb = require("./config/connectDb");

//config dot env file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// app.get("*", function (req, res) {
//   res.json({
//     success: true
//   })
// });

//routes
// user routes
app.use('/api/v1/users', require('./routes/userRoute'));

// transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoute'))

//static files
// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })


//ports
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
