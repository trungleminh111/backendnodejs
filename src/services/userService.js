import bcrypt from "bcryptjs"
import db from "../models"

const salt = bcrypt.genSaltSync(10)
let hashUserPassword = (password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleid'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'ok'
                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3
                        userData.errMessage = 'wrong password'
                    }
                }
                else {
                    userData.errCode = 2
                    userData.errMessage = `User's not found`
                }


            }
            else {
                userData.errCode = 1
                userData.errMessage = `Your's email isn't exist is your system. Plz try other email`

            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })

}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },

                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },

                })
            }

            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'You email is already in used,Plz try another email!'
                })
            }
            let hashPasswordFromcrypt = await hashUserPassword(data.password)
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPasswordFromcrypt,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleid: data.roleid,
                phoneNumber: data.phoneNumber,

            })
            resolve({
                errCode: 0,
                message: 'ok'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `the user ins't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            errMessage: `the user is delete`
        })
    })
}
let ediUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {

                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save()


                resolve({
                    errCode: 0,
                    message: 'Update the user succeedes!'
                })

            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `user's not found!`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    ediUser: ediUser
}