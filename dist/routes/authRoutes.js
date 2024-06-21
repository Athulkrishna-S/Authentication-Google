import express from 'express';
const router = express.Router();
router.get('/google', (req, res) => {
    console.log("Hello");
});
export default router;
