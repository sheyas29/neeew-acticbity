import React, { useState } from 'react';
import './ActivityTable.css';

const ActivityTable = ({ activities, onCheckboxChange }) => {
  const [animationClass, setAnimationClass] = useState('');

  const handleCheckboxChange = (topicIndex, eventIndex) => {
    setAnimationClass('animate-checkbox');
    onCheckboxChange(topicIndex, eventIndex);
    setTimeout(() => setAnimationClass(''), 300); // Remove animation class after animation duration
  };

  return (
    <div>
      {activities.map((activity, topicIndex) => (
        <div key={activity.activity_id} className="activity-section">
          <h2>{activity.activity_name}</h2>
          <table>
            <thead>
              <tr>
                <th>HR</th>
                <th>MIN</th>
                <th>SEC</th>
                <th>Event Number</th>
                <th>Event Name</th>
                <th>Confirmed By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activity.events.map((event, eventIndex) => (
                <tr key={event.event_id} className={event.status ? 'checked' : ''}>
                  <td>{event.hr}</td>
                  <td>{event.min}</td>
                  <td>{event.sec}</td>
                  <td>{event.event_number}</td>
                  <td>{event.event_name}</td>
                  <td>{event.confirmation_by}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={event.status || false}
                      onChange={() => handleCheckboxChange(topicIndex, eventIndex)}
                      className={animationClass}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ActivityTable;
