import express from "express";
import cors from "cors";
import { ProductRouter } from "./route/products.js";

const PORT = 3000;

const app = express();

//app.use(cors()); // Enable CORS(cross-origin-resource-sharing) for all routes

//app.use("/api", appRoute);

app.use(express.static("public")); // Serve static files from the "public" directory
app.use("/api/products", ProductRouter); // Use the ProductRouter for routes starting with /api/products

// Handle undefined routes
app.get((req, res) => {
  res.status(404).json({
    message: "Endpoint not found. Please check the API documentation.",
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
