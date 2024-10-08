import React from 'react';
import { createRoot } from 'react-dom/client'; // تحديث الاستيراد
 
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';

// Dynamically import all CSS files from the "src/css" folder
function importAllCss(r) {
  r.keys().forEach(r);
}

// Import all CSS files in the "css" folder
importAllCss(require.context('./css', false, /\.css$/));

// الحصول على العنصر الجذر
const rootElement = document.getElementById('root');

// استخدام createRoot بدلاً من ReactDOM.render
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
