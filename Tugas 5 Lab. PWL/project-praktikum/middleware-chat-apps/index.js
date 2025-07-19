require("dotenv").config();
const cors = require('cors');
const express = require('express')
const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = process.env.API_PORT;

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(PORT, (req, res) => {
    console.log(`Server app listening on http://localhost:${PORT}`);
});

const db_mysql = require("./models");
db_mysql.sequelize.sync();
const MessageRoutes = require("./routes/MessageRoute");
const userRoute = require("./routes/UserRoute");
app.use('/api/messages', MessageRoutes);
app.use("/api/users", userRoute);


// Routing untuk metode POST
// app.post('/login', (req, res) => {
//     res.send(' telah berhasil masuk!');
//     });
//     // Routing untuk metode PUT
//     app.put('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(` telah mengubah data user dengan ID ${userId}`);
//     });
//     // Routing untuk metode DELETE
//     app.delete('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(` telah menghapus data user dengan ID ${userId}`);
// });