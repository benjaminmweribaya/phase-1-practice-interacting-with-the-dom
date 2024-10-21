let counter = 0;
let isPaused = false;
let interval = setInterval(incrementCounter, 1000);
const likes = {};

// Increment the counter every second
function incrementCounter() {
    if (!isPaused) {
        counter++;
        updateCounterDisplay();
    }
}

// Update the counter display
function updateCounterDisplay() {
    document.getElementById('counter').innerText = counter;
}

// Toggle pause and resume functionality
function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pause').innerText = isPaused ? 'Resume' : 'Pause';
    document.getElementById('plus').disabled = isPaused;
    document.getElementById('minus').disabled = isPaused;
    document.getElementById('heart').disabled = isPaused;

    // Disable/Enable comment input and submit button
    document.getElementById('comment-input').disabled = isPaused;
    document.getElementById('submit').disabled = isPaused;
}

// Add a like for the current counter number
function addLike() {
    if (!likes[counter]) {
        likes[counter] = 1;
    } else {
        likes[counter]++;
    }
    displayLikes();
}

// Display the likes
function displayLikes() {
    const likesList = document.querySelector('.likes');
    likesList.innerHTML = '';
    for (const [key, value] of Object.entries(likes)) {
        const li = document.createElement('li');
        li.textContent = `Number ${key} has ${value} like${value > 1 ? 's' : ''}`;
        likesList.appendChild(li);
    }
}

// Add a comment from the input field
function addComment(event) {
    event.preventDefault(); // Prevents the default form submission behavior.
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentList = document.getElementById('list'); // Corrected the ID reference
        const li = document.createElement('li');
        li.textContent = commentText;
        commentList.appendChild(li);
        commentInput.value = ''; // Clears the input after submitting.
    }
}

// Event listeners
document.getElementById('comment-form').addEventListener('submit', addComment);

document.getElementById('plus').addEventListener('click', () => {
    counter++;
    updateCounterDisplay();
});

document.getElementById('minus').addEventListener('click', () => {
    counter--;
    updateCounterDisplay();
});

document.getElementById('heart').addEventListener('click', addLike);
document.getElementById('pause').addEventListener('click', togglePause);
