import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import '../News_feeds/manage_news.css';

const VoiceList = () => {
  const [feeds, setFeeds] = useState([]);
  const [editingFeed, setEditingFeed] = useState(null);

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "voice"));
      const feedsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeeds(feedsData);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    }
  };

  const handleEdit = (feed) => {
    setEditingFeed(feed);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feed?')) {
      try {
        await deleteDoc(doc(db, "voice", id));
        fetchFeeds(); // Refresh feeds list
      } catch (error) {
        console.error('Error deleting feed:', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, sub_title, image, audio, paragraph } = editingFeed;

    try {
      const feedDoc = doc(db, "voice", id);
      await updateDoc(feedDoc, { sub_title, image, audio, paragraph });
      fetchFeeds(); // Refresh feeds list
      setEditingFeed(null);
    } catch (error) {
      console.error('Error updating feed:', error);
    }
  };

  return (
    <div className="feeds-container">
      <h1>Feeds List</h1>
      <table className="feeds-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sub Title</th>
            <th>Image</th>
            <th>Audio</th>
            <th>Paragraph</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feeds.map(feed => (
            <tr key={feed.id}>
              <td>{feed.id}</td>
              <td>{feed.sub_title}</td>
              <td><img src={feed.image} alt={feed.sub_title} width="100" /></td>
              <td><audio controls src={feed.audio}>Your browser does not support the audio element.</audio></td>
              <td>{feed.paragraph}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(feed)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(feed.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingFeed && (
        <div className="popup-container">
          <div className="popup-form">
            <h2>Edit Feed</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="sub_title">Sub Title:</label>
                <input
                  type="text"
                  id="sub_title"
                  value={editingFeed.sub_title}
                  onChange={(e) => setEditingFeed({ ...editingFeed, sub_title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL:</label>
                <input
                  type="text"
                  id="image"
                  value={editingFeed.image}
                  onChange={(e) => setEditingFeed({ ...editingFeed, image: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="audio">Audio URL:</label>
                <input
                  type="text"
                  id="audio"
                  value={editingFeed.audio}
                  onChange={(e) => setEditingFeed({ ...editingFeed, audio: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="paragraph">Paragraph:</label>
                <textarea
                  id="paragraph"
                  value={editingFeed.paragraph}
                  onChange={(e) => setEditingFeed({ ...editingFeed, paragraph: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="update-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => setEditingFeed(null)}>Cancel</button>
              </div>
            </form>
          </div>
          <div className="dim-background" onClick={() => setEditingFeed(null)}></div>
        </div>
      )}
    </div>
  );
};

export default VoiceList;
