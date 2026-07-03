const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses-container");
    const totalCreditsDisplay = document.getElementById("total-credits");
    
    const filterAllBtn = document.getElementById("filter-all");
    const filterCseBtn = document.getElementById("filter-cse");
    const filterWddBtn = document.getElementById("filter-wdd");

    function displayCourses(filteredCourses) {
        coursesContainer.innerHTML = "";
        
        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
            courseCard.textContent = `${course.subject} ${course.number}`;
            coursesContainer.appendChild(courseCard);
        });

        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
    }

    filterAllBtn.addEventListener("click", () => { setActive(filterAllBtn); displayCourses(courses); });
    filterCseBtn.addEventListener("click", () => { setActive(filterCseBtn); displayCourses(courses.filter(c => c.subject === 'CSE')); });
    filterWddBtn.addEventListener("click", () => { setActive(filterWddBtn); displayCourses(courses.filter(c => c.subject === 'WDD')); });

    function setActive(activeButton) {
        [filterAllBtn, filterCseBtn, filterWddBtn].forEach(btn => btn.classList.remove("active"));
        activeButton.classList.add("active");
    }

    displayCourses(courses);
});