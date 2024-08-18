import express from 'express';
import { addStock, getAllStocks, removeStock, updateStock } from '../controllers/stock.controller';

const router = express.Router();

router.route('/').get(getAllStocks);
router.route('/add').post(addStock);
router.route('/remove').post(removeStock);
router.route('/update').post(updateStock);

export default router;