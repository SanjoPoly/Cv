document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Intersection Observer for animations (optional, for future use)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Add a class for animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // JavaScript for the "Today Home Delivery Orders" Dashboard
    const toggleButton = document.getElementById('toggleTableButton');
    const tableWrapper = document.getElementById('detailsTableWrapper');

    // Event listener for the toggle button
    if (toggleButton && tableWrapper) {
        toggleButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the document click listener from immediately closing it

            const isHidden = tableWrapper.style.display === 'none';

            if (isHidden) {
                tableWrapper.style.display = 'block'; // Show the table
                toggleButton.textContent = 'Hide Details Table'; // Change button text
            } else {
                tableWrapper.style.display = 'none'; // Hide the table
                toggleButton.textContent = 'View Details Table'; // Change button text
            }
        });

        // Event listener to hide the table when clicking outside of it or the toggle button
        document.addEventListener('click', function(event) {
            // Only act if the table is currently visible
            if (tableWrapper.style.display !== 'none') {
                // Check if the click was outside the tableWrapper AND not on the toggleButton itself
                if (!tableWrapper.contains(event.target) && event.target !== toggleButton) {
                    tableWrapper.style.display = 'none'; // Hide the table
                    toggleButton.textContent = 'View Details Table'; // Reset button text
                }
            }
        });
    }


    // JavaScript for the Resume Download Modal
    const downloadButton = document.getElementById('myDownloadButton');
    const modal = document.getElementById('verificationModal');
    const closeButton = document.querySelector('.close-button');
    const verifyButton = document.getElementById('verifyCodeButton');
    const codeInput = document.getElementById('verificationCodeInput');

    // Replace with your desired verification code
    const correctCode = "QsaNjo@3885";
    const fileUrl = "https://drive.google.com/file/d/14TCTPIOY28ZA953ts1lAormEk39XsfRn/view?usp=drive_link"; // Replace with the actual file URL

    if (downloadButton && modal && closeButton && verifyButton && codeInput) {
        // When the user clicks the button, open the modal
        downloadButton.onclick = function() {
            modal.style.display = "flex";
        }

        // When the user clicks on <span> (x), close the modal
        closeButton.onclick = function() {
            modal.style.display = "none";
            codeInput.value = ""; // Clear the input field
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                codeInput.value = ""; // Clear the input field
            }
        }

        // When the user clicks the verify button
        verifyButton.onclick = function() {
            const enteredCode = codeInput.value;

            if (enteredCode === correctCode) {
                // Using a custom message box instead of alert()
                const messageBox = document.createElement('div');
                messageBox.style.cssText = `
                    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background-color: #4CAF50; color: white; padding: 15px 30px; border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 9999;
                    animation: fadeOut 3s forwards;
                `;
                messageBox.textContent = "Code matched! Downloading file...";
                document.body.appendChild(messageBox);

                // Define fadeOut animation
                const styleSheet = document.createElement('style');
                styleSheet.type = 'text/css';
                styleSheet.innerText = `
                    @keyframes fadeOut {
                        0% { opacity: 1; }
                        80% { opacity: 1; }
                        100% { opacity: 0; display: none; }
                    }
                `;
                document.head.appendChild(styleSheet);

                setTimeout(() => {
                    messageBox.remove();
                    // Trigger the file download
                    const link = document.createElement('a');
                    link.href = fileUrl;
                    link.download = fileUrl.split('/').pop() || 'downloaded_file'; // Suggest filename from URL or use a default
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    modal.style.display = "none"; // Close the modal
                    codeInput.value = ""; // Clear the input field
                }, 2000); // Wait for 2 seconds before download and hiding message

            } else {
                // Using a custom message box for error instead of alert()
                const messageBox = document.createElement('div');
                messageBox.style.cssText = `
                    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background-color: #f44336; color: white; padding: 15px 30px; border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 9999;
                    animation: fadeOut 3s forwards;
                `;
                messageBox.textContent = "Please contact through mail to get the download code";
                document.body.appendChild(messageBox);

                // Re-add fadeOut animation if it's not already there (though likely it is from the success case)
                if (!document.head.querySelector('style[data-animation="fadeOut"]')) {
                    const styleSheet = document.createElement('style');
                    styleSheet.type = 'text/css';
                    styleSheet.setAttribute('data-animation', 'fadeOut'); // Add a data attribute to identify it
                    styleSheet.innerText = `
                        @keyframes fadeOut {
                            0% { opacity: 1; }
                            80% { opacity: 1; }
                            100% { opacity: 0; display: none; }
                        }
                    `;
                    document.head.appendChild(styleSheet);
                }

                setTimeout(() => {
                    messageBox.remove();
                }, 3000); // Message disappears after 3 seconds

                codeInput.value = ""; // Clear the input field
            }
        };
    }
});
