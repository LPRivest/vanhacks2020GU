import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTemplate from '../components/PageTemplate'

export default function Student(props) {
    // let progress = props.studentProgress.map((obj) => {
    //     return (
    //         <div>
    //             {obj.outcome}
    //             {obj.lesson}
    //             {obj.status}
    //         </div>
    //     )
    // })

    const courses = ["English", "Math","Science"]

    let buttonArray = courses.map(function (i){
        return <Button
                onClick={function progressPrint(){
                    alert(i)
                    let progress = (<div>Objective, Lesson, Status</div>)
                    return (progress)
                }}
                variant={"outline-secondary"}
                block
            >
            {i}
            </Button>
    })

    return (
        buttonArray
    )
}
