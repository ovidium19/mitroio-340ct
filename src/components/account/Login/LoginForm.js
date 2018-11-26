import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../common/formElements/TextInput'

const LoginForm = ({onChange, onSubmit, loading, errors, user}) => (
    <form name='loginForm'>
        <TextInput
        value={user.username}
        onChange={onChange}
        error={errors.username}
        name='username'
        label='Username'
        placeholder='Enter username...'
        type='text' />

        <TextInput
        value={user.password}
        onChange={onChange}
        error={errors.password}
        name='password'
        label='Password'
        placeholder='Enter password'
        type='password' />

        <input type='submit' onClick = {onSubmit} className='btn btn-primary' value='Submit' disabled={loading} />
    </form>
)
LoginForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.arrayOf(PropTypes.any),
    user: PropTypes.object.isRequired
}
export default LoginForm
