const Anecdote = ({ anecdote }) => {

    const { content, votes, info, author } = anecdote

    return (
        <div>
            <h2>{content} by {author}</h2>
            <p>has {votes} votes</p>
            <p>for more info see <a href={info} target='_blank' rel="noreferrer">{info}</a></p>
        </div>
    )
}

export default Anecdote