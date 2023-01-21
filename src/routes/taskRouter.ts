import express from "express"
const router = express.Router()
import { taskController } from "../controller/taskController"
import { createValidator, updateValidator, detailsValidator, deleteValidator } from "../validations/taskValidations"

router.post('/', createValidator, taskController.create)
router.get('/', taskController.list)
router.get('/:id', detailsValidator, taskController.details)
router.put('/:id', updateValidator, taskController.update)
router.delete('/:id', deleteValidator, taskController.delete)

export default router