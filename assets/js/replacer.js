<!--Head replace --> 

        // Function to replace {{head}} with content from an external file
        function replacePlaceholderWithHead(content) {
            // Find the placeholder {{head}} in the document head
            const headContent = document.head.innerHTML;
            const newHeadContent = headContent.replace('{{head}}', content);

            // Replace the head content with the new content
            document.head.innerHTML = newHeadContent;
        }

        // Fetch the head content from another HTML file   fetch('\include\header.js')
          fetch('\include\header.html')
            .then(response => response.text())
            .then(data => {
                replacePlaceholderWithHead(data);
            })
            .catch(error => console.error('Error fetching the head content:', error));
