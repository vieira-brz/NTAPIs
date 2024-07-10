const app = require('./app')
const math = require('./math')

jest.mock('./math')

test('Sum calls math.add', () => { 
    math.add.mockImplementation((a, b) => a + b)

    const result = app.sum(1, 2)
    
    expect(result).toBe(3)
    expect(math.add).toHaveBeenCalledWith(1, 2)
})