/*
 * Title: Routes
 * Description: Application Routes
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 *
 */

// dependencies
const {sampleHandler} = require('./handlers/sampleHandlers')
const {userHandler} = require('./handlers/userHandler')
const {tokenHandler} = require('./handlers/tokenHandler')

const Routes = {
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
}

module.exports = Routes