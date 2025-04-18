import React, { useState } from 'react';

function ToggleMessage() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <h2>Üzenet váltó</h2>
      <button onClick={() => setShow(!show)}>Mutat/elrejt</button>
      {show && <p>Szia React!</p>}
    </div>
  );
}

export default ToggleMessage;
