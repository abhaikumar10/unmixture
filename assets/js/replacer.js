// scripts/head-replacement.js

function replaceHeadPlaceholder() {
  fetch('/include/header.html')
      .then(response => response.text())
      .then(data => {
          document.head.innerHTML = document.head.innerHTML.replace('{{header}}', data);
      })
      .catch(error => console.error('Error fetching the head content:', error));
}

// Set up the MutationObserver
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
          replaceHeadPlaceholder();
          observer.disconnect(); // Stop observing after replacing
      }
  }
});

// Start observing the head section for changes
observer.observe(document.head, { childList: true, subtree: true });

// Initial check if the head is already loaded
if (document.head.innerHTML.includes('{{header}}')) {
  replaceHeadPlaceholder();
  observer.disconnect(); // Stop observing if already replaced
}
