import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();
const testLeaks = true;
export function DataProvider({ children }) {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
  const res = await fetch('http://localhost:4001/api/items?limit=500'); // Intentional bug: backend ignores limit
  const json = await res.json();
  testLeaks && await new Promise(resolve => setTimeout(resolve, 3000)); // 2-second delay
  setItems(json);
  }, []);

  return (
    <DataContext.Provider value={{ items, fetchItems }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);