/*
 * Title: Routes
 * Description: Application Routes
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 *
 */

// dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandlers')
const {userHandler} = require('./handlers/routeHandlers/userHandler')

const Routes = {
    sample: sampleHandler,
    user: userHandler,
}

module.exports = Routes