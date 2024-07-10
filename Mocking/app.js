const math = require('./math')

function sum(a, b) {
    return math.add(a, b)
}

module.exports = { sum }