import express from 'express';

const app = express();

const port = process.env.POR || 3000;


app.listen(port, () => {
     console.log(`Server running on port: ${port}`);
});

app.get("/health", (req, res) => {
     res.json({ status: "ok", message: "Server is running"});
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", userRoutes)
app.use("/api/users", userRoutes);


export default app;