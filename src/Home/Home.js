import React from 'react';
import { Link } from 'react-router-dom';

const ThreeColumnLayout = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Data Management</h1>
      </header>
      <div style={styles.columnContainer}>
        <div style={styles.column}>
          <h2 style={styles.heading}>Tables</h2>
          <button style={styles.button}>News_feeds</button>
          <button style={styles.button}>Voice</button>
          <button style={styles.button}>Mediation</button>
        </div>

        <div style={styles.column}>
          <h2 style={styles.heading}>New Data</h2>
          <Link to='/newsfeed'>
            <button style={styles.button}>Add New Data in News_feeds</button>
          </Link>
          <Link to='/voice'>
          <button style={styles.buttonLink}>Add New Data in voice_masterji</button>
          </Link>

          <Link to='/meditation'>
          <button style={styles.buttonLink}>Add New Data in Mediation</button>
          </Link>
        </div>

        <div style={styles.column}>
          <h2 style={styles.heading}>Manage Data</h2>
          <Link to='/managenewsfeed'>
            <button style={styles.button}>Manage data in News_feeds</button>
          </Link>
          <Link to='/managevoice'>
          <button style={styles.buttonLink}>Manage data in voice_masterji</button>
          </Link>
          <Link to='/managemeditation'>
          <button  style={styles.buttonLink}>Manage Data in Mediation</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  headerTitle: {
    color: '#333',
    fontSize: '24px',
    margin: 0,
  },
  columnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    flex: '1',
    margin: '0 10px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '18px',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
  buttonLink: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
  },
};

export default ThreeColumnLayout;
