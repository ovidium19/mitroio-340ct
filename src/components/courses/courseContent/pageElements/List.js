import React from 'react'
import PropTypes from 'prop-types'
import TextParagraph from './textParagraph'
const List = ({content, klass, index}) =>
    (
        <ul className={klass}>
             {
                content.map((elem,i) => {
                    switch(elem.type) {
                        case 'text-paragraph': {
                            return (
                                <TextParagraph key={`listelem${index}${i}`} index={`listelem${index}${i}`} content={elem.content} klass={`page-paragraph ${elem.hasOwnProperty('bootstrap') ? elem.bootstrap : ''}`} />
                            )
                        }
                        case 'link': {
                            return (
                                <a key={`listelem${index}${i}`} href={elem.link} target='_blank' rel='noopener noreferrer'>{elem.content}</a>
                            )
                        }
                        default: {
                            return
                        }
                    }
                })
            }
        </ul>


    )
List.propTypes = {
    content: PropTypes.array.isRequired,
    klass: PropTypes.string,
    index: PropTypes.string.isRequired
}

export default List
