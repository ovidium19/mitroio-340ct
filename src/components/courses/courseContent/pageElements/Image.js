import React from 'react'
import PropTypes from 'prop-types'
const Image = ({content, klass, index}) => {
    return (
        <div className='image-container d-flex justify-content-center align-items-center flex-column my-2'>
            <img src={`${content.href}`} alt={content.subtitle} className={`img-fluid  ${klass}`} />
            <p className='img-subtitle text-center text-muted'>{content.subtitle}</p>
        </div>
    )
}

Image.propTypes = {
    content: PropTypes.object.isRequired,
    klass: PropTypes.string,
    index: PropTypes.string.isRequired
}

export default Image
