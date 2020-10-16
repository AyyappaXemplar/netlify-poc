import React, { useState, useEffect } from 'react';
import TitleRow from './TitleRow'

function SpinnerScreen({ title, t }) {
  const [displayedTitle, setDisplayedTitle] = useState('Loading')
  useEffect(() => {
    if (title) {
      setDisplayedTitle(title)
    }
  }, [title])

  return (
    <>
      <TitleRow colClassNames='text-center' title={displayedTitle}/>
      <div className="text-center">
        <div className="spinner-border"role="status">
          <span className="sr-only">{displayedTitle}</span>
        </div>
      </div>
    </>
  );
}

export default SpinnerScreen;
