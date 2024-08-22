// SubmitNewsFeed.js
import React, { useState } from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../Firebase/firebase';  // Import the Firestore instance
import './news_feed.css'
import { Link } from 'react-router-dom';

const SubmitNewsFeed = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    image: '',
    paragraph: '',
    link: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newsFeedCollection = collection(db, "news_feeds");  // Reference to your Firestore collection
      await addDoc(newsFeedCollection, formData);  // Add the document to Firestore

      alert('News submitted successfully!');
      setFormData({
        title: '',
        date: '',
        image: '',
        paragraph: '',
        link: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the article.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Submit News Feed Details</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="date" style={styles.label}>Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>Image (URL):</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="paragraph" style={styles.label}>Paragraph:</label>
          <textarea
            id="paragraph"
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="link" style={styles.label}>Link:</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      <Link to ='/managenewsfeed'><button style={styles.link}>View All Articles</button></Link>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    margin: 0,
    marginTop:'-40px',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: 'calc(100% - 20px)',
    padding: '4px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
    resize: 'vertical',
    height: '100px',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    textAlign: 'center',
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  }
};

export default SubmitNewsFeed;
