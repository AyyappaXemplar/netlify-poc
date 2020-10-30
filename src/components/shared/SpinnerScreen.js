import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

function SpinnerScreen({ title, t }) {
  const [displayedTitle, setDisplayedTitle] = useState('Loading')
  useEffect(() => {
    if (title) {
      setDisplayedTitle(title)
    }
  }, [title])

  return (
    <div className="spinner-screen-wrapper text-center">
      <h1 className="mb-5">{displayedTitle}</h1>

      <div className="spinner-border"role="status">
        <span className="sr-only">{displayedTitle}</span>
      </div>
    </div>
  );
}

export default SpinnerScreen;
