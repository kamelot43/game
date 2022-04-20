import React from "react";
import {Link} from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <main>
        <h2>Welcome Page !</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/result">Result</Link>
      </nav>
    </div>
  );
}
