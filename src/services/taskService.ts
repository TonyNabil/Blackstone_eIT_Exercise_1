import Task from '../models/Task'

export default class TaskService {

    async create(data) {
        const { title, description, priority } = data

        let existingTask: any = await Task.findOne({ title })
        if (existingTask)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "TASK_ALREADY_EXIST" }

        return new Task({
            title,
            description,
            priority
        }).save()
    }

    async update(id, data) {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { ...data },
            { new: true, omitUndefined: true }
        );
        if (!updatedTask)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "TASK_NOT_FOUND" }

        return updatedTask
    }

    async list() {

        let formattedTasks = []

        const tasks = await Task.find()

        if (tasks.length) {
            for (const task of tasks) {
                let response = this.formatTaskResponse(task)
                formattedTasks.push(response)
            }
        }

        return formattedTasks;
    }

    async details(id) {
        let task: any = await Task.findById(id)
        if (!task)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "TASK_NOT_FOUND" }

        return this.formatTaskResponse(task)
    }

    async delete(id) {
        let task: any = await Task.findByIdAndRemove(id)
        if (!task)
            throw { statusCode: 400, status: "BAD_REQUEST", message: "TASK_NOT_FOUND" }

        return task
    }

    formatTaskResponse(task) {
        let formattedTask = {
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority
        }
        return formattedTask;
    }
}