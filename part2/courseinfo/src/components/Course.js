import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
    const sum = course.parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <h3>Total of {sum} exercises.</h3>
        </div>
    )
}
export default Course