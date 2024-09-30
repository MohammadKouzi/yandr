import React from 'react';
import { createRoot } from 'react-dom/client'; // تحديث الاستيراد
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';

// الحصول على العنصر الجذر
const rootElement = document.getElementById('root');

// استخدام createRoot بدلاً من ReactDOM.render
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
