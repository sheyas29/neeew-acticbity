import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container-vertical">
      <div className="progress-bar-vertical">
        <div className="filler-vertical" style={{ height: `${progress}%` }}>
          <span className="label-vertical">{`${progress}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
