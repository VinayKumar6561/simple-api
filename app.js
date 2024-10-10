const express = require('express');
const app = express();
app.use(express.json());

let courses = [
  { id: 1, title: 'Introduction to AI', description: 'A basic course on AI concepts', duration: '4 weeks' },
  { id: 2, title: 'Web Development', description: 'Learn the basics of HTML, CSS, and JavaScript', duration: '6 weeks' }
];

// Get all courses
app.get('/courses', (req, res) => {
  res.send(courses);
});

// Add a new course
app.post('/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration
  };
  courses.push(course);
  res.status(201).send(course);
});

// Update a course by ID
app.put('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course not found.');

  course.title = req.body.title;
  course.description = req.body.description;
  course.duration = req.body.duration;

  res.send(course);
});

// Delete a course by ID
app.delete('/courses/:id', (req, res) => {
  const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
  if (courseIndex === -1) return res.status(404).send('Course not found.');

  const deletedCourse = courses.splice(courseIndex, 1);
  res.send(deletedCourse);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
