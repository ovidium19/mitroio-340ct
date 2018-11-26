import React from 'react'

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.setState({username: event.target.value})
    }

    render() {
        return (
            <input type='text' value={this.state.username} onChange={this.onChange} />
        )
    }
}

export default Test
