const express = require("express");
const router = express.Router();

const LedgerController = require("#controllers/ledger");

router.post("/", LedgerController.create);
router.get("/", LedgerController.list);
router.get("/:ledgerId", LedgerController.findById);
router.patch("/:ledgerId", LedgerController.update);
router.delete("/:ledgerId", LedgerController.delete);

module.exports = router;
