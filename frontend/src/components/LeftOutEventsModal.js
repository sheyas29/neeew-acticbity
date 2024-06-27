import React from 'react';
import './LeftOutEventsModal.css';

const LeftOutEventsModal = ({ activities, onClose, onCheckboxChange }) => {
  const leftOutEvents = activities.flatMap((topic, topicIndex) =>
    topic.events.map((event, index) => ({ ...event, topicIndex, index, activity_name: topic.activity_name }))
  ).filter(event => !event.status);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Left Out Events</h2>
        <table>
          <thead>
            <tr>
              <th>Activity Topic</th>
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
            {leftOutEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.activity_name}</td>
                <td>{event.hr}</td>
                <td>{event.min}</td>
                <td>{event.sec}</td>
                <td>{event.event_number}</td>
                <td>{event.event_name}</td>
                <td>{event.confirmation_by}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={event.status}
                    onChange={() => onCheckboxChange(event.topicIndex, event.index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeftOutEventsModal;
