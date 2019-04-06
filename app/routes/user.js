module.exports = (app) => {
    let userController = require('../controllers/UserController');

    /**
     * User registration
     */
    app.post('/user/register', userController.register);

    app.post('/user/forgot-password', userController.forgot_password);

};