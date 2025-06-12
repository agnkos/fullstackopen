import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";

const Authors = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const authors = useQuery(ALL_AUTHORS, {
    // pollInterval: 2000,
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log("error", messages);
      notify(messages);
    },
  });

  if (authors.loading) {
    return <div>loading...</div>;
  }

  const submit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: selectedAuthor, date: Number(date) } });
    console.log("date", Number(date));
    setName("");
    setDate("");
    setSelectedAuthor("");
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <h2>authors</h2>
      <table className="table">
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birth year</h3>
      <form onSubmit={submit} className="author-form">
        <div className="form-el">
          <label htmlFor="name">Name</label>
          <select
            name="name"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">--Select an author--</option>
            {authors.data.allAuthors.map((a) => (
              <option value={a.name} key={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            name="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        </div>
        <div className="form-el">
          <label htmlFor="date">Born</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

export default Authors;
