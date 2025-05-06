// App.jsx
import { useState } from "react";

export default function App() {
  const [tweet, setTweet] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="p-4 max-w-md mx-auto font-sans">
      <h1 className="text-xl font-bold mb-2">Hate Tweet Neutralizer</h1>
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        placeholder="Paste the hate tweet here..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Generate Response
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-100 border rounded">
          <strong>Suggested Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
