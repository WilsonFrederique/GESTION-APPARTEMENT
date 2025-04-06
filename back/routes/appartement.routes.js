import express from "express";

import appartementController from "../controllers/appartement.controller.js";

const router = express.Router();

router.get("/", appartementController.getAll);
router.post("/", appartementController.create);
router.put("/:id", appartementController.updateOne);
router.delete("/:id", appartementController.deleteOne);

export default router;
