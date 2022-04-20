import React from "react";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux'
import Card from "./components/Card/Card";

export default function Result() {
  const postId = '15'
  const post = useSelector(state => state['photos'].photos.find(photo => photo.id === postId));
  console.log(post)

  return (
    <div>
      <main>
        <h2>Result Page !</h2>
        <p>You can do this, I believe in you.</p>
        <Card
          data={post}
        />
      </main>
      <nav>
        <Link to="/">Main</Link>
      </nav>
    </div>
  );
}
