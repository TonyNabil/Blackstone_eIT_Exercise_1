import mongoose from 'mongoose';
import request from 'supertest'
import app from "../app"
import Task from "../models/Task"

afterAll(function (done) {
    mongoose.connection.close(function () {
        done();
    });

});

beforeAll(async (done) => {
    mongoose.connection.dropDatabase();
    done()
});

describe('Task Operations', () => {

    it('should create Task', async () => {
        const res = await request(app)
            .post('/task')
            .send({
                "title": "Task 1",
                "description": "Task 1 description",
                "priority": "HIGH"
            })
        console.log(res.body)
        expect(res.status).toEqual(200)
        expect(res.body.result.title).toEqual("Task 1")
        expect(res.body.result.description).toEqual("Task 1 description")
        expect(res.body.result.priority).toEqual("HIGH")
    })

    it('should list all Tasks', async () => {
        let tasks = await Task.find({})

        const res = await request(app)
            .get('/task')

        expect(res.status).toEqual(200)
        expect(res.body.result.length).toEqual(tasks.length)
    })

    it('should get Task details', async () => {
        let task = await Task.findOne({})
        const res = await request(app)
            .get(`/task/${task._id}`)

        expect(res.status).toEqual(200)
        expect(res.body.result.title).toEqual(task.title)
        expect(res.body.result.description).toEqual(task.description)
        expect(res.body.result.priority).toEqual(task.priority)
    })

    it('should update Task', async () => {
        let task = await Task.findOne({})
        expect(task.priority).toEqual("HIGH")
        const res = await request(app)
            .put(`/task/${task._id}`)
            .send({
                "priority": "LOW"
            })

        let updatedTask = await Task.findById(task._id)
        expect(res.status).toEqual(200)
        expect(updatedTask.priority).toEqual("LOW")
    })

    it('should delete Task', async () => {
        let task = await Task.findOne({})
        const res = await request(app)
            .delete(`/task/${task._id}`)

        expect(res.status).toEqual(200)
        let deletedTask = await Task.findOne({ _id: task._id })
        expect(deletedTask).toBe(null)
    })
});
