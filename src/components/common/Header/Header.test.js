import React from 'react'
import {mount, shallow} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import {Header} from './Header'
import { wrap } from 'module';

function setup(propsPassed = {}) {
    const defaultProps = {
        username: 'mitroio',
        logged: true,
        location: {pathname: '/'}
    }
    const props = Object.assign({},defaultProps,propsPassed)

    const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
            <Header {...props} />
        </MemoryRouter>
    )
    return wrapper
}
describe('test Header', () => {
    test('It was rendered and wrapped in withRouter', async done => {
        const wrapper = setup().find(Header)
        console.log(wrapper.props())
        expect(wrapper.prop('location').pathname).toBe('/')
        expect(wrapper.find('a.active').text()).toBe('Home')
        done()
    })
    test('Header is invisible on /login or /register', async done => {
        const wrapper = setup({location: {pathname:'/login'}}).find(Header)
        expect(wrapper.children().length).toBe(0)
        done()
    })
})
