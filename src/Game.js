import React, { useState, useEffect } from 'react';
import { get } from './mockBakend/fetch';
import "./index.css"

export default function Game() {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState({});

  useEffect(() => {
    get('/letters').then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory && !items[selectedCategory]) {
      get(`/items?category=${selectedCategory}`).then((response) => {
        setItems((prev) => ({ ...prev, [selectedCategory]: response.data }));
      });
    }
  }, [items, selectedCategory]);

  if (!categories) {
    return <p>Loading..</p>;
  }

  return (
    <div className='App'>
      <br></br><br></br>
      <h1>Name, Place, Animal and Thing</h1>
      <hr />
      <br></br>
      <nav>
        <h2>Click on one of the letters</h2>
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </nav>
      <h2>{selectedCategory}</h2>
      <ul>
        {!items[selectedCategory]
          ? null
          : items[selectedCategory].map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}