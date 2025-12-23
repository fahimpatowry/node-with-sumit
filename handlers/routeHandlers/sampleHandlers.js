/*
 * Title: Sample Handlers
 * Description: Sample Handlerss
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 *
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) =>{
    console.log(requestProperties)

    callback(200, {
        message : 'hi',
        user: 'Fahim'
    })
}

module.exports = handler;