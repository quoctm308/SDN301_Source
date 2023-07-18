const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');

const Cakes = require('../models/cakes');

const cakeRouter = express.Router();

cakeRouter.use(bodyParser.json());

cakeRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        Cakes.find({})
            .then((cakes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cakes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cakes.create(req.body)
            .then((cake) => {
                console.log('Cake created ', cake);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cake);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /cakes');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cakes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

cakeRouter.route('/:cakeId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        Cakes.findById(req.params.cakeId)
            .then((cake) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cake);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /cakes/' + req.params.cakeId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cakes.findByIdAndUpdate(req.params.cakeId, {
            $set: req.body
        }, { new: true })
            .then((cake) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cake);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Cakes.findByIdAndRemove(req.params.cakeId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = cakeRouter;