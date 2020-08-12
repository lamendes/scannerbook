/* eslint-disable no-plusplus */
import React, {useState} from 'react';

import Scanner from './Scanner';
import Results from './Results';

function Main() {
  const [isbn, setIsbn] = useState();
  return <Scanner onScan={setIsbn} />;
}

export default Main;
