import React, { useState } from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../Firebase/firebase';  // Import the Firestore instance
import '../News_feeds/news_feed.css';
import { Link } from 'react-router-dom';

const SubmitVoice = () => {
  const [formData, setFormData] = useState({
    sub_title: '',
    image: '',
    audio: '',
    paragraph: '',
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
      const newsFeedCollection = collection(db, "voice");  // Reference to your Firestore collection
      await addDoc(newsFeedCollection, formData);  // Add the document to Firestore

      alert('News submitted successfully!');
      setFormData({
        sub_title: '',
        image: '',
        audio: '',
        paragraph: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the article.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Voice of Master Sri JI Details</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="sub_title" style={styles.label}>Sub Title:</label>
          <input
            type="text"
            id="sub_title"
            name="sub_title"
            value={formData.sub_title}
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
          <label htmlFor="audio" style={styles.label}>Audio (URL):</label>
          <input
            type="text"
            id="audio"
            name="audio"
            value={formData.audio}
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
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      <Link to='/managenewsfeed'><button style={styles.link}>View All Articles</button></Link>
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

export default SubmitVoice;
