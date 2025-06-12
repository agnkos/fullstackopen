import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Books from "./components/Books.jsx";
import Authors from "./components/Authors.jsx";
import NewBook from "./components/NewBook.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route index element={<Books />} /> */}
            <Route path="books" element={<Books />} />
            <Route path="authors" element={<Authors />} />
            <Route path="add" element={<NewBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
