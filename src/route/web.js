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
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUsers);
    router.put('/api/edit-user', userController.handleEditUsers);
    router.delete('/api/delete-user', userController.handleDeleteUsers);
    return app.use("/", router)
}
module.exports = initWebRoutes;