const EventEmitter = require('events') // it give us a class

const emitter = new EventEmitter() // object created

// ------- Example 1 -------
// register a listener for bellRing event
emitter.on('bellRing1', ()=>{ // it always should be top of raise
    console.log('we need to run!')
});

// raise an event
setTimeout(()=>{
    emitter.emit('bellRing1')
}, 2000)
// emitter.emit('bellRing')

// ------- Example 2 -------
// register a listener for bellRing event
emitter.on('bellRing2', ({period, text})=>{ // it always should be top of raise
    // console.log(`we need to run because ${period}`)
    console.log(`we need to run because ${period} ${text}`)
});

// raise an event
// emitter.emit('bellRing', 'second period ended')
emitter.emit('bellRing2', {
    period: 'first',
    text: 'period end'
})