import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add error handling for initial render
const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find root element');
}

const root = createRoot(container);

// Wrap render in try-catch
try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Error rendering application:', error);
  // Render fallback UI
  root.render(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load application</h2>
        <p className="text-gray-600 mb-6">We're sorry, but there was an error loading the application. Please try refreshing the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}