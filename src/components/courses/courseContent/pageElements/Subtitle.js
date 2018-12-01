import React from 'react'
import PropTypes from 'prop-types'
const Subtitle = ({content, klass, index}) =>
    (
       <p className={`lead ${klass}`} key={`subtitle${index}`}>
            {content}
       </p>
    )
Subtitle.propTypes = {
    content: PropTypes.string.isRequired,
    klass: PropTypes.string,
    index: PropTypes.string.isRequired
}

export default Subtitle
