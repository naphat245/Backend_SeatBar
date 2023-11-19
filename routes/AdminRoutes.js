const adminRoute = require('express').Router()
const DrinkController = require('../controllers/DrinkControllers')
const DrinkTypesController = require('../controllers/DrinkTypesController')
const ReserveControllers = require('../controllers/ReserveControllers')
//drinks
adminRoute.post('/drinks',DrinkController.createDrink)
adminRoute.put('/drinks/:id',DrinkController.updateDrink)
adminRoute.delete('/drinks/:id',DrinkController.deleteDrink)
adminRoute.get('/drinks/:id',DrinkController.getByIdDrink)
adminRoute.get('/drinks',DrinkController.getDrink)

//drink_types

//food
adminRoute.post('/foods',FoodController.createFood)
adminRoute.put('/foods/:id',FoodController.updateFood)
adminRoute.delete('/foods/:id',FoodController.deleteFood)
adminRoute.get('/foods/:id',FoodController.getByIdFood)
adminRoute.get('/foods',FoodController.getFood)
//adminRoute.post('/drinks',DrinkTypesController.createDrinkTypes)

//reserve
adminRoute.post('/reserve',ReserveControllers.createReserve)
adminRoute.put('/reserve/:id',ReserveControllers.updateReserve)
adminRoute.delete('/reserve/:id',ReserveControllers.deleteReserve)
adminRoute.get('/reserve/:id',ReserveControllers.getByIdReserve)
adminRoute.get('/reserve',ReserveControllers.getReserve)


module.exports = adminRoute