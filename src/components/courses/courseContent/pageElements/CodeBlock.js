import React from 'react'
import PropTypes from 'prop-types'
const CodeBlock = ({content, klass, index}) => {
    return (
        <div className='bash-block bg-dark px-1 py-2 my-2'>
            <pre className={klass}>
                {content.split('\\n').map((line,i) => (
                    <span key={`${index}line${i}`}>{line}<br /></span>
                ))}
            </pre>
        </div>
    )
}

CodeBlock.propTypes = {
    content: PropTypes.string.isRequired,
    klass: PropTypes.string,
    index: PropTypes.string.isRequired
}

export default CodeBlock
