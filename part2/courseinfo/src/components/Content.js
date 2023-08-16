import Part from "./Part"

const Content = ({ parts }) => {

    const partsElements = parts.map(part => (
        <Part key={part.id} part={part}/>
    ))

    return (
        <div>{partsElements}</div>
    )
}
export default Content