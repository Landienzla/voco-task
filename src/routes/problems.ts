import { Router } from "express";
import catchFunction from "../utils/catchFunction";
import {
  Problem2,
  CreateProblem2TestData,
  Problem3,
  Problem4,
  Problem5,
  Problem6,
} from "../controllers/problems";
const router = Router();

router.get("/2", catchFunction(Problem2));
router.post("/2", catchFunction(CreateProblem2TestData));
router.get("/3", catchFunction(Problem3));
router.get("/4", catchFunction(Problem4));
router.get("/5", catchFunction(Problem5));
router.get("/6", catchFunction(Problem6));

export default router;
