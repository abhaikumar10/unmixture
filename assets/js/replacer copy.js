
function replaceHeadPlaceholder() {
  console.log('log started')
  fetch('/include/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById("header").innerHTML = document.getElementById("header").innerHTML.replace('{{header}}', data);
      })
      .catch(error => console.error('Error fetching the head content:', error));
}
//console.log(data)
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
if (document.getElementById("header").innerHTML.includes('{{header}}')) {
  replaceHeadPlaceholder();
  observer.disconnect(); // Stop observing if already replaced
}