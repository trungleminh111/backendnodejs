import express from "express"
import homcontroller from "../controllers/homcontroller";
import userController from "../controllers/userController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homcontroller.getHomePage);
    router.get('/about', homcontroller.getAboutPage);
    router.get('/crud', homcontroller.getCRUD);
    router.post('/post-crud', homcontroller.postCRUD);
    router.get('/get-crud', homcontroller.displayGetCRUD);
    router.get('/edit-crud', homcontroller.getEditCRUD);
    router.post('/put-crud', homcontroller.putCRUD);
    router.get('/delete-crud', homcontroller.deleteCRUD);
    //api
    router.post('/api/login', userController.handleLogin);
    return app.use("/", router)
}
module.exports = initWebRoutes;