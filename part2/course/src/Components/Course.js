import React from 'react';



const Header =  (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2> 
    </div>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(a => <Part key={a.id} name={a.name} exercises={a.exercises} />)}
    </div>
  )
}

const Part = (props) => {
  return (
        <p>{props.name} {props.exercises}</p>   
    )
  }

  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  const Total = ({course}) => {
    const total = course.parts.reduce((sum, part) => {return sum + part.exercises}, 0)
    return (
      <div>
        <p><b>total of {total} exercises </b></p>
      </div> 
    )
  }
  export default Course