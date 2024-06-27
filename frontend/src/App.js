import React, { useState, useEffect } from 'react';
import ActivityTable from './components/ActivityTable';
import ProgressBar from './components/ProgressBar';
import LeftOutEventsModal from './components/LeftOutEventsModal';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showLeftOutModal, setShowLeftOutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Number of topics per page
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch('/api/activities')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched activities:', data);
        if (Array.isArray(data)) {
          setActivities(data);
          updateProgress(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  const updateProgress = (data) => {
    const totalActivities = data.reduce((acc, topic) => acc + topic.events.length, 0);
    const completedActivities = data.reduce(
      (acc, topic) => acc + topic.events.filter((activity) => activity.status).length,
      0
    );
    const progress = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
    setProgress(progress);
  };

  const handleCheckboxChange = (topicIndex, index) => {
    const newActivities = [...activities];
    const realTopicIndex = (currentPage - 1) * itemsPerPage + topicIndex;
    if (newActivities[realTopicIndex] && newActivities[realTopicIndex].events[index]) {
      newActivities[realTopicIndex].events[index].status = !newActivities[realTopicIndex].events[index].status;
      setActivities(newActivities);
      updateProgress(newActivities);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all statuses?')) {
      const newActivities = activities.map(topic => ({
        ...topic,
        events: topic.events.map(event => ({ ...event, status: false }))
      }));
      setActivities(newActivities);
      updateProgress(newActivities);

      fetch('/api/reset', { method: 'POST' })
        .then(response => response.json())
        .then(data => console.log('Reset successful:', data))
        .catch(error => console.error('Error resetting statuses:', error));
    }
  };

  const totalEvents = activities.reduce((acc, topic) => acc + topic.events.length, 0);
  const completedEvents = activities.reduce((acc, topic) => acc + topic.events.filter(event => event.status).length, 0);
  const leftOutEvents = totalEvents - completedEvents;

  const paginatedActivities = activities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <h1>Activity Tracker</h1>
        <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      <div className="info-boxes">
        <div className="info-box">
          <h3>Total Events</h3>
          <p>{totalEvents}</p>
        </div>
        <div className="info-box">
          <h3>Completed Events</h3>
          <p>{completedEvents}</p>
        </div>
        <div className="info-box" onClick={() => setShowLeftOutModal(true)}>
          <h3>Left Out Events</h3>
          <p>{leftOutEvents}</p>
        </div>
      </div>
      <ActivityTable activities={paginatedActivities} onCheckboxChange={handleCheckboxChange} />
      <ProgressBar progress={progress} />
      {showLeftOutModal && (
        <LeftOutEventsModal 
          activities={activities} 
          onClose={() => setShowLeftOutModal(false)} 
          onCheckboxChange={handleCheckboxChange} 
        />
      )}
      <div className="pagination">
        {Array.from({ length: Math.ceil(activities.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="reset-button-container">
        <button className="reset-button" onClick={handleReset}>Reset All</button>
      </div>
    </div>
  );
}

export default App;
