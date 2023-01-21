const joi = require('joi');
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);
import { PriorityEnum, StatusEnum } from "../models/Task"

export const createValidator = function (req, res, next) {
    try {

        const body = joi.object().keys({
            title: joi.string().required(),
            description: joi.string().required(),
            priority: joi.string().required().valid([PriorityEnum.HIGH, PriorityEnum.MEDIUM, PriorityEnum.LOW])
        })

        const bodyValidation = joi.validate(req.body, body, { allowUnknown: false })
        const validationError = bodyValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.message
            });
        }
        return next()
    } catch (error) {
        console.error('validators --> createValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};

export const updateValidator = function (req, res, next) {
    try {
        const params = joi.object().keys({
            id: ObjectId().required()
        })

        const body = joi.object().keys({
            title: joi.string().optional(),
            description: joi.string().optional(),
            priority: joi.string().optional().valid([PriorityEnum.HIGH, PriorityEnum.MEDIUM, PriorityEnum.LOW]),
            status: joi.string().optional().valid([
                StatusEnum.COMPLETED,
                StatusEnum.PENDING,
                StatusEnum.INPROGRESS,
                StatusEnum.MISSED]),
        })

        const bodyValidation = joi.validate(req.body, body, { allowUnknown: false })
        const paramsValidation = joi.validate(req.params, params, { allowUnknown: false })
        const validationError = bodyValidation.error || paramsValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.message
            });
        }
        return next()
    } catch (error) {
        console.error('validators --> updateValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};

export const detailsValidator = function (req, res, next) {
    try {
        const params = joi.object().keys({
            id: ObjectId().required()
        })

        const paramsValidation = joi.validate(req.params, params, { allowUnknown: false })
        const validationError =  paramsValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.message
            });
        }
        return next()
    } catch (error) {
        console.error('validators --> detailsValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};

export const deleteValidator = function (req, res, next) {
    try {
        const params = joi.object().keys({
            id: ObjectId().required()
        })

        const paramsValidation = joi.validate(req.params, params, { allowUnknown: false })
        const validationError =  paramsValidation.error

        if (validationError) {
            return res.status(400).send({
                status: 'BAD_REQUEST',
                message: validationError.message
            });
        }
        return next()
    } catch (error) {
        console.error('validators --> deleteValidator.ts ', error);
        return res.status(400).json({
            status: 'SERVER_ERROR',
            message: 'Internal Server Error!'
        });
    }
};
