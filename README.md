# NID Bengaluru Campus Operations Portal

A full-stack React + Node.js portal for the National Institute of Design, Bengaluru campus. The application is designed as a clean campus dashboard for student records, department archives, faculty and visiting faculty information, class schedules, project submissions, and faculty review workflows.

## Product Direction

The official NID site identifies Bengaluru as one of NID Ahmedabad's three campuses, located at Yeshwanthpur, Bengaluru. The campus was inaugurated in March 2006, operates from a compact 2-acre site, and offers five M.Des disciplines: Interaction Design, Digital Game Design, Information Design, Design for Retail Experience, and Universal Design.

This portal is therefore built around those five departments, not a generic college layout.

## Core Roles

- **Admin:** Owns all editable institutional data: students, faculty, visiting faculty, class/session schedules, photos, and directory information.
- **Faculty:** Reviews student project submissions and gives approval/rejection feedback.
- **Student:** Submits projects and views campus resources, departments, people, schedules, and map information.

## Current Features

- Department-wise dashboard for the five Bengaluru M.Des disciplines.
- Student database with department and semester fields.
- Faculty and visiting faculty directory with admin-maintained photos, expertise, room, and department.
- Class schedule with topic, faculty, visiting/permanent faculty type, start time, room, and batch.
- Student project archive with status filtering.
- Faculty project review workflow with feedback.
- Campus map and campus information surfaces.
- Local demo data fallback when MongoDB is unavailable.

## Recommended Next Modules

- Image upload storage for student and faculty photos instead of URL-only fields.
- Attendance and session notes for class records.
- Project review rubrics by department.
- Lab/resource booking.
- Public exhibition/portfolio export for approved student work.
- Audit log for admin edits.

## Tech Stack

- **Frontend:** React, Vite, React Router, Lucide Icons, Axios
- **Backend:** Node.js, Express.js, JWT, bcryptjs
- **Database:** MongoDB with Mongoose, with local demo store fallback

## Setup

Install dependencies:

```bash
npm.cmd run install:all
```

Create `server/.env` from the example:

```bash
copy server\.env.example server\.env
```

Run the app:

```bash
npm.cmd run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Demo Login

- **Student:** `student@nid.edu` / `password123`
- **Faculty:** `faculty@nid.edu` / `password123`
- **Admin:** `admin@nid.edu` / `password123`

## Official Reference Points

- NID home page: https://www.nid.edu/home
- NID campuses page: https://www.nid.edu/about/campuses
- NID Bengaluru campus page: https://www.nid.edu/about/campuses/bengaluru-campus
- NID programmes page: https://www.nid.edu/academics/programmes
