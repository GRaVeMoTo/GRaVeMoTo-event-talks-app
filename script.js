const talks = [
    {
        title: "The Future of JavaScript",
        speakers: ["Jane Doe"],
        categories: ["JavaScript", "Web Development", "Future Tech"],
        description: "A deep dive into the upcoming features of JavaScript and how they will shape the future of web development."
    },
    {
        title: "Building Scalable APIs with Node.js",
        speakers: ["John Smith"],
        categories: ["Node.js", "APIs", "Backend"],
        description: "Learn how to design and build APIs that can handle millions of requests, using Node.js and best practices."
    },
    {
        title: "CSS Grid and Flexbox: A Modern Approach to Layout",
        speakers: ["Emily Jones"],
        categories: ["CSS", "Web Design", "Frontend"],
        description: "Master the power of CSS Grid and Flexbox to create complex and responsive layouts with ease."
    },
    {
        title: "Introduction to Machine Learning with Python",
        speakers: ["David Lee", "Sarah Miller"],
        categories: ["Machine Learning", "Python", "AI"],
        description: "A beginner-friendly introduction to the world of machine learning using Python and popular libraries like Scikit-learn."
    },
    {
        title: "The Rise of Serverless Architectures",
        speakers: ["Michael Brown"],
        categories: ["Serverless", "Cloud Computing", "Architecture"],
        description: "Explore the benefits and challenges of serverless computing and learn how to build serverless applications."
    },
    {
        title: "Cybersecurity in the Modern Age",
        speakers: ["Chris Wilson"],
        categories: ["Cybersecurity", "Security", "Networking"],
        description: "An overview of the current cybersecurity landscape and how to protect your applications and data from common threats."
    }
];

const scheduleContainer = document.getElementById('schedule-container');
const searchBar = document.getElementById('search-bar');

function generateSchedule(filter = '') {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    const filteredTalks = talks.filter(talk =>
        talk.categories.some(category => category.toLowerCase().includes(filter.toLowerCase()))
    );

    let talkCounter = 0;
    talks.forEach((talk) => {
        if (!filteredTalks.includes(talk)) {
            return;
        }
        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime.getTime() + 60 * 60 * 1000);

        const talkElement = document.createElement('div');
        talkElement.classList.add('talk');
        talkElement.innerHTML = `
            <div class="time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
            <h2>${talk.title}</h2>
            <div class="speakers">By: ${talk.speakers.join(', ')}</div>
            <p>${talk.description}</p>
            <div class="categories">
                ${talk.categories.map(category => `<span class="category">${category}</span>`).join('')}
            </div>
        `;
        scheduleContainer.appendChild(talkElement);

        currentTime.setTime(endTime.getTime() + 10 * 60 * 1000); // 10 minute break
        talkCounter++;

        if (talkCounter === 3) { // After the 3rd talk
            const lunchBreak = document.createElement('div');
            lunchBreak.classList.add('break');
            lunchBreak.textContent = 'Lunch Break (1 hour)';
            scheduleContainer.appendChild(lunchBreak);
            currentTime.setTime(currentTime.getTime() + 50 * 60 * 1000); // Add 50 minutes to the current time to make it a 1 hour break
        }
    });
}

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

searchBar.addEventListener('input', () => {
    generateSchedule(searchBar.value);
});

generateSchedule();