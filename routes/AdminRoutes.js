const adminRoute = require('express').Router()
const DrinkController = require('../controllers/DrinkControllers')
const DrinkTypesController = require('../controllers/DrinkTypesController')
const FoodController = require('../controllers/FoodControllers')
const FoodTypesController = require('../controllers/FoodTypesController')
const ReserveControllers = require('../controllers/ReserveControllers')
const Stage_showController = require('../controllers/Stage_showControllers')


//drinks
adminRoute.post('/drinks',DrinkController.createDrink)
adminRoute.put('/drinks/:id',DrinkController.updateDrink)
adminRoute.delete('/drinks/:id',DrinkController.deleteDrink)
adminRoute.get('/drinks/:id',DrinkController.getByIdDrink)
adminRoute.get('/drinks',DrinkController.getDrink)
adminRoute.get('/drinks/type/:name', DrinkController.getDrinkByType); // can use but no data
//drink_types
//adminRoute.post('/drinks',DrinkTypesController.createDrinkTypes)

//food
adminRoute.post('/foods',FoodController.createFood)
adminRoute.put('/foods/:id',FoodController.updateFood)
adminRoute.delete('/foods/:id',FoodController.deleteFood)
adminRoute.get('/foods/:id',FoodController.getByIdFood)
adminRoute.get('/foods',FoodController.getFood)
//food_types
//adminRoute.post('/foods',FoodTypesController.createFoodTypes)

//promotion
// adminRoute.post('/promotions',PromotionController.createPromotion)
// adminRoute.put('/promotions/:id',PromotionController.updatePromotion)
// adminRoute.delete('/promotions/:id',PromotionController.deletePromotion)
// adminRoute.get('/promotions/:id',PromotionController.getByIdPromotion)
// adminRoute.get('/promotions',PromotionController.getPromotion)

//stage_show
adminRoute.post('/stage',Stage_showController.createStage)
adminRoute.put('/stage/:id',Stage_showController.updateStage)
adminRoute.delete('/stage/:id',Stage_showController.deleteStage)
adminRoute.get('/stage/:id',Stage_showController.getByIdStage)
adminRoute.get('/stage',Stage_showController.getStage)

//reserve
adminRoute.post('/reserve',ReserveControllers.createReserve)
adminRoute.put('/reserve/:id',ReserveControllers.updateReserve)
adminRoute.delete('/reserve/:id',ReserveControllers.deleteReserve)
adminRoute.get('/reserve/:id',ReserveControllers.getByIdReserve)
adminRoute.get('/reserve',ReserveControllers.getReserve)


module.exports = adminRoute