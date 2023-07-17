const express = require('express');
const dotenv = require('dotenv');

const chats = require('./data/data');

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const path = require('path');
let cors = require('cors');
const connectdb = require('./config/db');

const app = express();

app.use(cors());

dotenv.config();


//connect to databse
connectdb();

// take json data from front end

const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.get("/",(req, res)=>{
//     res.send("api called");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//
// 
   app.use(express.static(path.join(__dirname, "/frontend/dist")));

   app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
   })

   app.get('/', (req, res)=>{
    res.send("API is running successfully");
   });



// app.get("/api/chat", (req, res)=>{
//     res.send(chats);
// })

// app.get("/api/chat/:id",(req, res)=>{
//     const singleChat = chats.find((c)=>c._id === req.params.id);
//     res.send(singleChat);
// })

const server = app.listen(PORT, console.log("server run on port 5500")); 

const io = require("socket.io")(server, {
    pingTimeout : 60000,
    cors:{
        origin:"https://localhost:5000/"
    }
})

io.on("connection", (socket)=>{
   console.log("connected to socket.io");

   socket.on("setup",(userData)=>{
    socket.join(userData._id);
    socket.emit("connected");
   })

   socket.on("join chat", (room)=>{
     socket.join(room);
     console.log("user joined room: ", room);
   })

   socket.on("typing", (room)=>socket.in(room).emit("typing"));
   socket.on("stop typing", (room)=>socket.in(room).emit("stop typing"));

   socket.on("new message", (newMessageReceived)=>{
     let chat = newMessageReceived.chat;

     if(!chat.users) return console.log("Chat.users not defined");

     chat.users.forEach((user) => {
        if(user._id === newMessageReceived.sender._id) return;

        socket.in(user._id).emit("message received", newMessageReceived);
     });
   })

   socket.off("setup", ()=>{
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
   })
})