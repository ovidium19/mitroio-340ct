import React from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'
import {Line} from 'rc-progress'
// export class CourseItem extends React.Component {
//     constructor(props) {
//         super(props)
//     }
// }
const CourseItem = ({course, onClick, onRatingClick, courseClicked}) => {
    let bestGrades = 0
    let progressPercent = 0
    if (course.assessments && course.assessments.length > 0) {
        bestGrades = course.assessments.reduce((p,c,i) => {
            if (p < c.grades.total_points) return c.grades.total_points
            return p
        },0)
    }
    if (course.progress && course.progress.length > 0) {
       progressPercent = Math.floor((course.progress[0].current_page / course.pages) * 100)
    }

    function onStarClick(val,pre,name,e) {
        e.preventDefault()
        e.stopPropagation()

        onRatingClick && onRatingClick(val,pre,name)
    }
    return (
        <div className='course-item card' id={course.name.replace(/ /g,'').toLowerCase()}>
            <div className='card-header text-light bg-dark'>
                <h4 className='mb-2'>{course.name}</h4>
                {
                    progressPercent == 100 &&
                    <div className='row'>
                    {
                        course['_id'] !== courseClicked ?
                        <React.Fragment>
                            <div className='col-3'>Rate: </div>
                            <div className='col user-rating'>
                                <StarRatingComponent
                                name={course['_id']}
                                emptyStarColor = {'lightgray'}
                                starCount = {5}
                                value = {course.ratings.length > 0 ? course.ratings[0].rating : 0}
                                onStarClick={onStarClick} />
                            </div>
                        </React.Fragment> :
                        <div className='pl-2'>Saving rating...</div>
                    }

                </div>
                }

            </div>
            <div className='card-body text-light bg-dark'>
                <p className='card-subtitle small my-2'>Category: <span className='course-category'>{course.category}</span></p>
                <p className='card-text px-1v course-description'>{course.description &&  course.description.substring(0,80)+'...'}</p>
                <div className='row my-2'>
                    <div className='col-4'>
                        <button className='btn btn-success text-white' courseid={course['_id']} onClick={onClick}>Details</button>
                    </div>
                    <div className='col-2' />
                    <div className='col-4 text-right'>
                        <p className='p-0 m-0 mb-1'>Course Rating</p>
                        <StarRatingComponent
                            name={course['_id']}
                            emptyStarColor = {'lightgray'}
                            editing={false}
                            starCount = {5}
                            value = {course.avg_rating}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-start align-items-start'>
                    {
                        course.assessments && course.assessments.length > 0 &&
                        <div className='course-user-grade w-100 row'>
                            <div className='col-5 m-0 p-0'>
                                <p className='p-0 m-0'>Best Grade:</p>
                            </div>
                            <div className='col-5 m-0 p-0'>
                                <p className='p-0 m-0' style={{
                                    color: bestGrades > 50 ? 'greenyellow' : 'orange'
                                }}>{bestGrades + '%'}</p>
                            </div>
                        </div>
                    }
                    {
                        course.progress &&
                        <div className='course-progress-bar w-100 mt-auto'>
                            <div className='mb-1 text-right'>{`Progress: ${progressPercent}%`}</div>
                            <Line percent={progressPercent} strokeWidth="1" strokeColor="greenyellow" trailColor='white' />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onRatingClick: PropTypes.func,
    courseClicked: PropTypes.string
}
export default CourseItem
