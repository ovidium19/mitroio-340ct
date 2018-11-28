import React from 'react'
import PropTypes from 'prop-types'

const CourseMenuItem = ({klass, page, onClick, index, completed}) => (
    <div className={klass} id={`${page.title}.${index}`}>
        <div className='row'>
            {completed ?
             <div className='col-2'><i className='fas fa-check text-success'/></div>
             :
             <div className='col-2'><i className="fas fa-spinner text-warning"/></div>
            }

            <div className='col-6 text-center'><p>{page.title}</p></div>
            <div className='col-4'><button className='btn float-right go-to-page' disabled={!(completed)} onClick={onClick}  dataindex={index}><i className="fas fa-caret-right"  dataindex={index}/></button></div>
        </div>
    </div>
)
CourseMenuItem.propTypes = {
    klass: PropTypes.string,
    page: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    completed: PropTypes.bool
}
export default CourseMenuItem
