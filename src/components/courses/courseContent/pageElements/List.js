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
                                <li><TextParagraph key={`listelem${index}${i}`} index={`listelem${index}${i}`} content={elem.content} klass={`page-paragraph ${elem.hasOwnProperty('bootstrap') ? elem.bootstrap : ''}`} /></li>

                            )
                        }
                        case 'link': {
                            return (
                                <li><a key={`listelem${index}${i}`} className={`${elem.hasOwnProperty('bootstrap') ? elem.bootstrap : ''}`} href={elem.link} target='_blank' rel='noopener noreferrer'>{elem.content}</a></li>

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
