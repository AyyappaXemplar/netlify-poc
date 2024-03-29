import React, { useState, useEffect } from 'react';

function SpinnerScreen({ title, t, mvrCopy }) {
  const [displayedTitle, setDisplayedTitle] = useState('Loading')
  useEffect(() => {
    if (title) {
      setDisplayedTitle(title)
    }
  }, [title])

  return (
    <div className="spinner-screen-wrapper text-center">
      <h1 className="mb-5">{displayedTitle}</h1>
      {mvrCopy && <p>{mvrCopy}</p>}
      <div className="spinner-border mt-5"role="status">
        <span className="sr-only">{displayedTitle}</span>
      </div>
    </div>
  );
}

export default SpinnerScreen;
