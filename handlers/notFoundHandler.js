/*
 * Title: Not Found Handler
 * Description: Not Found Handler
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 *
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) =>{

    callback(404, {
        message : 'not round',
    })
}

module.exports = handler;