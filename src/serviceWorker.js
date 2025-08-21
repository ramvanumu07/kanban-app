// serviceWorker.js

// Adapted from CRA template.
// Registers service worker for offline support.

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          // Registration successful
        })
        .catch((error) => {
          // Registration failed
          // You could use toast here for alert!
          // console.error('SW registration failed:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
 
