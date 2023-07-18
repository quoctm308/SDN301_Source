const express = require('express');
const Youtube = require('../models/youtubes');

const youtubeRouter = express.Router();

youtubeRouter.route('/')
    .get((req, res, next) => {
        Youtube.find({})
            .then((youtubes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(youtubes);
            })
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Youtube.create(req.body)
            .then((youtube) => {
                console.log('Youtube created:', youtube);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(youtube);
            })
            .catch((err) => next(err));
    });

youtubeRouter.route('/:youtubesId').get((req, res, next) => {
    Youtube.find({})
        .then((youtubes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(youtubes);
        })
        .catch((err) => next(err));
})
    .put((req, res, next) => {
        Youtube.findByIdAndUpdate(req.params.youtubesId, {
            $set: req.body
        }, { new: true })
            .then((youtube) => {
                if (youtube) {
                    console.log('Youtube updated:', youtube);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(youtube);
                } else {
                    const err = new Error(`Youtube ${req.params.youtubesId} not found`); err.status = 404; return next(err);
                }
            }).catch((err) => next(err));
    }).delete((req, res, next) => {
        Youtube.findByIdAndDelete(req.params.youtubesId).then((response) => {
            if (response) { console.log('Youtube deleted:', response); res.statusCode = 200; res.setHeader('Content-Type', 'application/json'); res.json(response); } else {
                const err = new Error(`Youtube ${req.params.youtubesId} not found`);
                err.status = 404;
                return next(err);
            }
        })
            .catch((err) => next(err));
    });

module.exports = youtubeRouter;