import React from 'react';
import MyDocument from './Mydocument'; // Import your receipt component

const App = () => {
  const handleDownloadPDF = () => {
    const pdfBlob = new Blob([<MyDocument />], { type: 'application/pdf' });
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipt.pdf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownloadPDF}>Download Receipt</button>
    </div>
  );
};

export default App;
