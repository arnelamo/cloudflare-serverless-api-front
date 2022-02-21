import "./App.css";
import { useState } from "react";

const getImages = async (query) => {
  // The base URL for our API
  const url = "https://serverless-api.arnepedersen.workers.dev/";

  const resp = await fetch(url, {
    // Send a POST request
    method: "POST",
    // With a JSON-stringified body containing the query from our input
    body: JSON.stringify({ query }),
    // Set the `Content-type` header so our API knows that the request
    // is sending JSON
    headers: { "Content-type": "application/json" },
  });
  return resp.json();
};

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const search = async () => {
    const results = await getImages(query);
    setImages(results);
  };

  const updateQuery = (evt) => setQuery(evt.target.value);

  return (
    <div className="App">
      <h1>Image search</h1>
      <div className="form">
        <input
          id="query"
          type="text"
          onChange={updateQuery}
          placeholder="Search query"
        />
        <button onClick={search}>Search</button>
      </div>

      {/* Map through the array of images and render a set of images */}
      {images.map((image) => (
        <a key={image.id} href={image.link} target="_blank" rel="noreferrer">
          <img src={image.image} alt="gitar" />
        </a>
      ))}
    </div>
  );
}

export default App;
