import React from 'react'
import {mount, shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import UserMenu from './UserMenu'

function setup(propsPassed = {}) {
    const defaultProps = {
        username: 'mitroio',
        logged: true,
        location: '/'
    }
    const props = Object.assign({},defaultProps,propsPassed)

    const wrapper = shallow(<UserMenu {...props} />)
    return wrapper
}
describe('test UserMenu', () => {
    test('It was rendered', async done => {
        const wrapper = setup()
        expect(wrapper.find('ul').length).toBe(1)
        done()
    })
    test('When user is logged in, there should be a "Your Hub" button in the nav bar', async done => {
        const wrapper = setup()
        const lis = wrapper.find('li')
        expect(wrapper.contains('Your Hub')).toBe(true)
        done()
    })
    test('When user is not logged in, there should not be a "Your Hub" button in the nav bar', async done => {
        const wrapper = setup({logged: false})
        const lis = wrapper.find('li')

        expect(wrapper.contains('Your Hub')).toBe(false)
        done()
    })
})
