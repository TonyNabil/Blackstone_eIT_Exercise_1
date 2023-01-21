import { Response, Request } from "express";
import TaskService from "../services/taskService";
import { handleErrors } from "../util/utils"

class TaskController {

    private taskObject: TaskService;

    constructor() {
        this.taskObject = new TaskService();
    }

    create = async (req: Request, res: Response) => {
        try {

            let data = req.body
            let result = await this.taskObject.create(data);
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    update = async (req: Request, res: Response) => {
        try {

            let id = req.params.id
            let data = req.body
            let result = await this.taskObject.update(id, data);
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    list = async (req: Request, res: Response) => {
        try {

            let result = await this.taskObject.list();
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    details = async (req: Request, res: Response) => {
        try {

            let id = req.params.id
            let result = await this.taskObject.details(id);
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {

            let id = req.params.id
            let result = await this.taskObject.delete(id);
            return res.send({ status: "OK", message: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }


}

export const taskController = new TaskController();