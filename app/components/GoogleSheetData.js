import { useEffect, useState } from 'react';

const useGoogleSheetData = ({ sheetId, range, apiKey }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );
        const result = await response.json();
        if (result.values) {
          setData(result.values);
          console.log(result.values);
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error('Error:', err);
      }
    };

    fetchData();
  }, [sheetId, range, apiKey]);

  return { data, error };
};

export default useGoogleSheetData;