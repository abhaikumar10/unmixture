// Define the sec array
let sec = [ 
  { id: "topbar", htmvar: "{{topbar}}", linkloc:"/include/topbar.html" },
  { id: "header", htmvar: "{{header}}", linkloc:"/include/header.html" },
  {id: "footer", htmvar: "{{footer}}", linkloc:"/include/footer.html" }
];

// Execute the replacement on DOMContentLoaded
document.addEventListener("DOMContentLoaded", repacehtm);

// Replace content for each sec in the sec array
function repacehtm() {
  sec.forEach(sec => {
                        const targetNode = document.getElementById(sec.id);
                        
                        if (targetNode && targetNode.innerHTML.includes(sec.htmvar)) {
                            fetchContent(sec.linkloc).then(content => {
                                repacedata(targetNode, sec.htmvar, content);
                                observesec(sec); // Observe changes after initial replacement
                            });
                        } else {
                            observesec(sec); // Observe changes if placeholder is not initially found
                        }
                    });
}

// Fetch content from the given link location
function fetchContent(linkloc) {
  return fetch(linkloc)
      .then(response => response.text())
      .catch(error => {
          console.error('Error fetching content:', error);
          return null;
      });
}

// Replace placeholder content in the given element
function repacedata(element, placeholder, content) {
              if (element && content) {
                  element.innerHTML = element.innerHTML.replace(placeholder, content);
              }
}

// Set up a MutationObserver for a specific sec
function observesec(sec) {
                  const targetNode = document.getElementById(sec.id);
                  
                  if (!targetNode) return;

                  const observer = new MutationObserver((mutationsList, observer) => {
                      mutationsList.forEach(mutation => {
                          if (mutation.type === 'childList' || mutation.type === 'subtree') {
                              fetchContent(sec.linkloc).then(content => {
                                  repacedata(targetNode, sec.htmvar, content);
                                  observer.disconnect(); // Stop observing after replacing
                              });
                          }
                      });
                  });

                  observer.observe(targetNode, { childList: true, subtree: true });

                  // Initial check in case the placeholder is already present
                  if (targetNode.innerHTML.includes(sec.htmvar)) {
                      fetchContent(sec.linkloc).then(content => {
                          repacedata(targetNode, sec.htmvar, content);
                          observer.disconnect(); // Stop observing if already replaced
                      });
                  }
}

