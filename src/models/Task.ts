import mongoose, { Schema, Document, model } from 'mongoose';

export enum StatusEnum {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    INPROGRESS = "INPROGRESS",
    MISSED = "MISSED"
}

export enum PriorityEnum {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        enum: [
            StatusEnum.COMPLETED,
            StatusEnum.INPROGRESS,
            StatusEnum.MISSED,
            StatusEnum.PENDING
        ],
        default: StatusEnum.PENDING
    },
    priority: {
        type: String,
        enum: [
            PriorityEnum.HIGH,
            PriorityEnum.MEDIUM,
            PriorityEnum.LOW
        ],
        required: true
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    modificationDate: {
        type: Date,
        default: new Date()
    }
}, {
    versionKey: false
})

export default model('Task', TaskSchema);
