import React from 'react'
import PropTypes from 'prop-types'
import TextParagraph from './pageElements/textParagraph'
import List from './pageElements/List'
import CodeBlock from './pageElements/CodeBlock'
import Image from './pageElements/Image'
const PageRedacter = ({page}) =>{
    let { title, elements } = page
    return (
        <div className='container'>
            <p className='display-4 page-title text-center'>{title}</p>
            <div className='page-content'>
            {
                elements.map((elem,i) => {
                    switch(elem.type) {
                        case 'text-paragraph': {
                            return (
                                <TextParagraph key={`pageelem${i}`} index={`${i}`} content={elem.content} klass={`page-paragraph ${elem.hasOwnProperty('bootstrap') ? elem.bootstrap : ''}`} />
                            )
                        }
                        case 'list': {
                            return (
                                <List key={`pageelem${i}`} index={`${i}`} content={elem.list_elements} klass={'page-list'} />
                            )
                        }
                        case 'code-block': {
                            return (
                                <CodeBlock key={`pageelem${i}`} index={`${i}`} content={elem.content} klass={'bash'} />
                            )
                        }
                        case 'image': {
                            return (
                                <Image key={`pageelem${i}`} index={`${i}`} content={elem.content} klass={'page-image'} />
                            )
                        }
                        default: {
                            return
                        }
                    }
                })
            }
            </div>

        </div>
    )
}

PageRedacter.propTypes = {
    page: PropTypes.object.isRequired
}

export default PageRedacter
