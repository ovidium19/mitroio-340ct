jest.mock('./index')
import index from './index'
describe('Testing index', () => {

    test('It returns the sum of two numbers', done => {
        expect(index(2,3)).toEqual(5)
        done()
    })
})
