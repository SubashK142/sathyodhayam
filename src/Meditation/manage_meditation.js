import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import '../News_feeds/manage_news.css';

const MeditationList = () => {
  const [feeds, setFeeds] = useState([]);
  const [editingFeed, setEditingFeed] = useState(null);

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "meditation"));
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
        await deleteDoc(doc(db, "meditation", id));
        fetchFeeds(); // Refresh feeds list
      } catch (error) {
        console.error('Error deleting feed:', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, thumbnail, video_link } = editingFeed;

    try {
      const feedDoc = doc(db, "meditation", id);
      await updateDoc(feedDoc, { thumbnail, video_link });
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
            <th>Thumbnail</th>
            <th>Video Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feeds.map(feed => (
            <tr key={feed.id}>
              <td>{feed.id}</td>
              <td><img src={feed.thumbnail} alt="Thumbnail" width="100" /></td>
              <td><a href={feed.video_link} target="_blank" rel="noopener noreferrer">Watch Video</a></td>
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
                <label htmlFor="thumbnail">Thumbnail URL:</label>
                <input
                  type="text"
                  id="thumbnail"
                  value={editingFeed.thumbnail}
                  onChange={(e) => setEditingFeed({ ...editingFeed, thumbnail: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="video_link">Video Link:</label>
                <input
                  type="url"
                  id="video_link"
                  value={editingFeed.video_link}
                  onChange={(e) => setEditingFeed({ ...editingFeed, video_link: e.target.value })}
                  required
                />
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

export default MeditationList;
