import express from "express";
import multer from "multer";
import { Client } from "@gradio/client";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadImage = (req, res, next) => {
    upload.single("image")(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
            return res.status(status).json({ error: "Image upload is invalid or too large" });
        }
        if (error) {
            return res.status(400).json({ error: "Image upload failed" });
        }
        return next();
    });
};

router.post("/predict-disease", uploadImage, async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
    }
    if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({ error: "Please upload an image file" });
    }

    try {
        const imageBlob = new Blob([req.file.buffer], { type: req.file.mimetype });

        const client = await Client.connect("akhaliq/Plant-Disease-Classifier");

        const result = await client.predict("/predict", {
            input_image: imageBlob,
        });

        const prediction = result?.data?.[0]?.label || "No prediction";
        return res.json({ prediction });

    } catch (err) {
        console.error("❌ Disease prediction error:", err);
        return res.status(500).json({ error: "Prediction failed" });
    }
});

export default router;
