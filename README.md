# StackLab — Reverse a Word Stack

An interactive, responsive learning website that demonstrates how a stack reverses a sequence of words using the LIFO (Last In, First Out) principle.

## Features
- Push words onto a visual stack (up to 8 words).
- Reverse the stack with a single action.
- See the output sequence and a short explanation of the algorithm.
- Load a sample or reset the workspace.
- Responsive layout for desktop and mobile.
- Built with vanilla HTML, CSS and JavaScript. No build tools or dependencies required.

## Run locally
Open `index.html` in your browser.

## Deploy on GitHub Pages
1. Create a **public** repository on GitHub (for example, `reverse-word-stack`).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository's root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then save.
6. Wait for the deployment to finish. Your site will be available at `https://YOUR-USERNAME.github.io/reverse-word-stack/`.

## Algorithm
Words are pushed into an array. When the user selects Reverse, the program repeatedly pops from the end of a copy of that array and appends each popped word to the output. This demonstrates LIFO ordering.

Time complexity: **O(n)**. Auxiliary space: **O(n)** for the copied stack and output.
