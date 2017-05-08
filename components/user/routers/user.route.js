let router = require('express').Router(),
    controller = require('./controller');

router.route('/')
        .get(controller.get.bind(controller))