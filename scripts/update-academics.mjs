// Run `node scripts/update-academics.mjs` after editing these arrays.
// Generates static, accessible HTML; no browser JavaScript or build dependency.
import { readFileSync, writeFileSync } from 'node:fs';

const skills = [
  { heading: 'Programming languages', items: ['Python', 'SQL', 'Java', 'C', 'HTML/CSS'] },
  { heading: 'Software & tools', items: ['PyTorch', 'Microsoft Azure', 'Databricks', 'R', 'Qualtrics', 'Figma', 'Unity', 'iMovie', 'Gamemaker Studio'] },
  { heading: 'Languages', items: ['English (native)', 'Chinese (professional)'] },
];

const coursework = [
  {
    heading: 'Computer Science + Math',
    items: [
      ['15-112', 'Fundamentals of Programming & Computer Science'],
      ['15-122', 'Principles of Imperative Computation'],
      ['15-150', 'Principles of Functional Programming'],
      ['21-127', 'Concepts of Mathematics'],
      ['21-120', 'Differential and Integral Calculus'],
      ['21-122', 'Integration and Approximation'],
    ],
  },
  {
    heading: 'Human-Computer Interaction',
    items: [
      ['05-360', 'Interaction Design Fundamentals'],
      ['05-391', 'Designing Human-Centered Software'],
      ['05-317', 'Design of Artificial Intelligence Products'],
      ['05-318', 'Human AI Interaction'],
      ['05-410', 'User-Centered Research and Evaluation'],
      ['05-472', 'Service Design'],
      ['05-571', 'Senior Capstone'],
    ],
  },
  {
    heading: 'Psychology',
    items: [
      ['85-211', 'Cognitive Psychology', 'Teaching Assistant, 2025–2026'],
      ['85-241', 'Social Psychology'],
      ['85-372', 'Cognition in the Age of AI'],
      ['85-472', 'How Brain Makes Meaning'],
      ['36-309', 'Experimental Design in Behavioral & Social Sciences'],
      ['88-120', 'Reason, Passion, Cognition'],
    ],
  },
];

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const categoryHeading = (heading) => `<h3 class="category-heading"><span>${escape(heading)}</span></h3>`;
const category = (group, renderItem) => `        <div class="detail-group">
          ${categoryHeading(group.heading)}
          <ul role="list">
${group.items.map((item) => `            <li>${renderItem(item)}</li>`).join('\n')}
          </ul>
        </div>`;
const course = ([code, title, note]) => `<span class="course-code">${escape(code)}</span><span class="course-title">${escape(title)}${note ? ` <span class="course-role">(${escape(note)})</span>` : ''}</span>`;

const section = `    <div class="skills-courses-grid">
      <section class="skills-column" aria-labelledby="skills-title">
        <header class="academic-header">
          <h2 id="skills-title">Skills</h2>
        </header>
${skills.map((group) => category(group, escape)).join('\n')}
      </section>
      <section class="coursework-column" aria-labelledby="courses-title">
        <header class="academic-header">
          <h2 id="courses-title">Relevant Courses</h2>
          <p class="section-note">All course codes correspond to CMU.</p>
        </header>
${coursework.map((group) => category(group, course)).join('\n')}
      </section>
    </div>`;

const path = new URL('../resume.html', import.meta.url);
const source = readFileSync(path, 'utf8');
const start = source.indexOf('    <div class="skills-courses-grid">');
const end = source.indexOf('\n  </main>', start);
if (start < 0 || end < 0) throw new Error('Could not locate the existing academics section.');
writeFileSync(path, source.slice(0, start) + section + '\n' + source.slice(end));
console.log('Updated Skills & Relevant Coursework in resume.html.');
