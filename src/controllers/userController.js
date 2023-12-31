import userService from "../services/userService"
let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
            users: []
        })

    }
    let users = await userService.getAllUsers(id)
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}
let handleCreateNewUsers = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    console.log(message)
    return res.status(200).json(message)
}
let handleEditUsers = async (req, res) => {
    let data = req.body
    let message = await userService.ediUser(data)
    return res.status(200).json(message)
}
let handleDeleteUsers = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parametes!',
        })
    }
    let message = await userService.deleteUser(req.body.id)

    return res.status(200).json(message)

}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUsers: handleCreateNewUsers,
    handleEditUsers: handleEditUsers,
    handleDeleteUsers: handleDeleteUsers,
}