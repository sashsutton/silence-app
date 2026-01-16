import {connectDB} from "./src/config/database.ts";
import app from "./src/app.ts";

const port = process.env.PORT || 3000;


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});

