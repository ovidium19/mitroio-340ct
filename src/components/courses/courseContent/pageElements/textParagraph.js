import React from 'react'
import PropTypes from 'prop-types'
const TextParagraph = ({content, klass, index}) =>
    (
        <p className={klass}>
             {
                content.map((elem,i) => {
                    switch(elem.type) {
                        case 'plain': {
                            return (
                                <span key={`textparagraphelem${index}${i}`} className={elem.hasOwnProperty('bootstrap') ? elem.bootstrap : ''}>{elem.content}</span>
                            )
                        }
                        case 'link': {
                            return (
                                <a key={`textparagraphelem${index}${i}`} className={elem.hasOwnProperty('bootstrap') ? elem.bootstrap : ''} href={elem.link} target='_blank' rel='noopener noreferrer'>{elem.content}</a>
                            )
                        }
                        default: {
                            return
                        }
                    }
                })
            }
        </p>


    )
TextParagraph.propTypes = {
    content: PropTypes.array.isRequired,
    klass: PropTypes.string,
    index: PropTypes.string.isRequired
}

export default TextParagraph
