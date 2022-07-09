import { Router } from 'express';

const purchasesRouter = Router();

purchasesRouter.post('/purchases'); // Create a new purchase

export default purchasesRouter;