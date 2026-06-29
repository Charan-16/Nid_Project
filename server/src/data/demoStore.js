import bcrypt from "bcryptjs";

const passwordHash = bcrypt.hashSync("password123", 10);

export const demoDepartments = [
  {
    id: "interaction-design",
    name: "Interaction Design",
    shortName: "IxD",
    description: "Human-centered digital products, services, interfaces, and connected campus systems.",
    lead: "Admin maintained",
    students: 38,
    projects: 12,
    focusAreas: ["UX Research", "Service Design", "Interface Prototyping", "Campus Systems"],
    labs: ["Interaction Studio", "Usability Testing Room", "Prototyping Lab"],
    programmeLevel: "M.Des discipline",
    campusRole: "Maintains student work, studio reviews, research notes, and interface/service design documentation for the Bengaluru campus.",
    facultyNote: "Faculty details are admin-maintained and should be updated from official campus records.",
    mvpModules: ["Student database", "Project review", "Faculty directory", "Class schedule"],
    nextModules: ["Lab booking", "Attendance", "Portfolio export"]
  },
  {
    id: "digital-game-design",
    name: "Digital Game Design",
    shortName: "DGD",
    description: "Game mechanics, playable systems, interactive storytelling, prototyping, and experiential media.",
    lead: "Admin maintained",
    students: 30,
    projects: 8,
    focusAreas: ["Game Systems", "Playable Media", "Interactive Storytelling"],
    labs: ["Game Lab", "Animation Lab"],
    programmeLevel: "M.Des discipline",
    campusRole: "Tracks game prototypes, review milestones, critique feedback, and playable media submissions.",
    facultyNote: "Faculty and visiting mentors can be added by the admin when sessions are scheduled.",
    mvpModules: ["Student database", "Project review", "Visiting mentor sessions"],
    nextModules: ["Playable build uploads", "Review rubrics"]
  },
  {
    id: "digital-retail-experience",
    name: "Design for Retail Experience",
    shortName: "DRE",
    description: "Retail journeys, phygital environments, service design, and customer experience systems.",    
    lead: "Admin maintained",
    students: 24,
    projects: 6,
    focusAreas: ["Retail Journeys", "Phygital Experience", "Service Prototyping"],
    labs: ["Retail Experience Studio"],
    programmeLevel: "M.Des discipline",
    campusRole: "Documents retail journeys, spatial-service prototypes, industry briefs, and customer experience research.",
    facultyNote: "Admin can maintain permanent and visiting faculty records as the semester changes.",
    mvpModules: ["Student database", "Project review", "Session schedule"],
    nextModules: ["Industry partner briefs", "Exhibition archive"]
  },
  {
    id: "information-design",
    name: "Information Design",
    shortName: "InfoD",
    description: "Visual representation and communication of complex data.",
    lead: "Admin maintained",
    students: 32,
    projects: 10,
    focusAreas: ["Data Design", "Wayfinding", "Visual Explanation"],
    labs: ["Information Design Studio", "Digital Hampi Lab"],
    programmeLevel: "M.Des discipline",
    campusRole: "Archives maps, data narratives, explanation systems, wayfinding work, and information visualization projects.",
    facultyNote: "Official faculty records should be updated only by the admin office.",
    mvpModules: ["Student database", "Project review", "Faculty directory"],
    nextModules: ["Research lab repository", "Dataset attachments"]
  },
  {
    id: "universal-design",
    name: "Universal Design",
    shortName: "UD",
    description: "Inclusive products, accessible systems, and human-centered research.",
    lead: "Admin maintained",
    students: 22,
    projects: 7,
    focusAreas: ["Accessibility", "Inclusive Research", "Assistive Systems"],
    labs: ["Universal Design Studio"],
    programmeLevel: "M.Des discipline",
    campusRole: "Maintains inclusive design research, accessibility audits, assistive system prototypes, and field study documentation.",
    facultyNote: "Visiting experts can be recorded with topic, date, and class schedule.",
    mvpModules: ["Student database", "Project review", "Accessibility notes"],
    nextModules: ["Accessibility audit templates", "Participant consent tracking"]
  }
];

export const demoUsers = [
  { id: "u-student-1", name: "Ananya Sharma", email: "student@nid.edu", passwordHash, role: "student", department: "Interaction Design", semester: "Semester 3" },
  { id: "u-student-2", name: "Rahul Varma", email: "rahul@nid.edu", passwordHash, role: "student", department: "Digital Game Design", semester: "Semester 1" },
  { id: "u-student-3", name: "Priya Singh", email: "priya@nid.edu", passwordHash, role: "student", department: "Information Design", semester: "Semester 3" },
  { id: "u-student-4", name: "Meera Nair", email: "meera@nid.edu", passwordHash, role: "student", department: "Design for Retail Experience", semester: "Semester 2" },
  { id: "u-student-5", name: "Karthik Iyer", email: "karthik@nid.edu", passwordHash, role: "student", department: "Universal Design", semester: "Semester 4" },
  { id: "u-faculty-1", name: "Dr. C. S. Susanth", email: "faculty@nid.edu", passwordHash, role: "faculty", department: "Administration", title: "Dean, NID Bengaluru Campus" },
  { id: "u-admin-1", name: "Campus Admin", email: "admin@nid.edu", passwordHash, role: "admin", department: "Administration", title: "Academic Office" }
];

export const demoProjects = [
  { id: "p-1", title: "Studio Wayfinding System", description: "A service and interface proposal for helping new students, faculty, and visitors navigate studios, KMC, labs, and admin touchpoints.", department: "Interaction Design", studentId: "u-student-1", studentName: "Ananya Sharma", facultyGuide: "Faculty reviewer", status: "approved", tags: ["Wayfinding", "Campus UX"], links: [], createdAt: "2026-06-01T08:00:00.000Z" },
  { id: "p-2", title: "Inclusive Lab Access Audit", description: "Accessibility audit for movement, signage, and equipment access across compact campus learning spaces.", department: "Universal Design", studentId: "u-student-5", studentName: "Karthik Iyer", facultyGuide: "Faculty reviewer", status: "pending", tags: ["Accessibility", "Audit"], links: [], createdAt: "2026-06-14T08:00:00.000Z" },
  { id: "p-3", title: "Retail Queue Experience Prototype", description: "A phygital queue and assistance model for high-traffic retail environments in Bengaluru.", department: "Design for Retail Experience", studentId: "u-student-4", studentName: "Meera Nair", facultyGuide: "Faculty reviewer", status: "completed", tags: ["Service Design", "Retail"], links: [], createdAt: "2026-05-21T08:00:00.000Z" }
];

export const demoFaculty = [
  { id: "f-0", name: "Dr. C. S. Susanth", title: "Dean, NID Bengaluru Campus", department: "Administration", email: "deanblr@nid.edu", room: "Dean's Office", expertise: ["Campus leadership", "Academic coordination"], photoUrl: "/assets/faculty/faculty_6.png", sourceStatus: "Admin maintained", type: "Permanent" },
  { id: "f-1", name: "Interaction Design Faculty", title: "Faculty", department: "Interaction Design", email: "ixd.office@nid.edu", room: "Interaction Studio", expertise: ["UX research", "Service design"], photoUrl: "/assets/faculty/faculty_4.png", sourceStatus: "Admin maintained", type: "Permanent" },
  { id: "f-2", name: "Information Design Faculty", title: "Faculty", department: "Information Design", email: "infod.office@nid.edu", room: "Information Design Studio", expertise: ["Data visualization", "Wayfinding"], photoUrl: "/assets/faculty/faculty_3.png", sourceStatus: "Admin maintained", type: "Permanent" },
  { id: "f-3", name: "Digital Game Design Faculty", title: "Faculty", department: "Digital Game Design", email: "dgd.office@nid.edu", room: "Game Lab", expertise: ["Game systems", "Playable media"], photoUrl: "/assets/faculty/faculty_1.png", sourceStatus: "Admin maintained", type: "Permanent" },
  { id: "f-4", name: "Retail Experience Faculty", title: "Faculty", department: "Design for Retail Experience", email: "dre.office@nid.edu", room: "Retail Experience Studio", expertise: ["Retail journeys", "Service prototypes"], photoUrl: "/assets/faculty/faculty_0.png", sourceStatus: "Admin maintained", type: "Permanent" },
  { id: "f-5", name: "Universal Design Faculty", title: "Faculty", department: "Universal Design", email: "ud.office@nid.edu", room: "Universal Design Studio", expertise: ["Accessibility", "Inclusive systems"], photoUrl: "/assets/faculty/faculty_7.png", sourceStatus: "Admin maintained", type: "Permanent" },
  { id: "f-6", name: "Visiting Mentor - Service Design", title: "Visiting Faculty", department: "Interaction Design", email: "visiting.service@nid.edu", room: "Interaction Studio", expertise: ["Design critique", "Service blueprinting"], photoUrl: "", sourceStatus: "Admin maintained", type: "Visiting" },
  { id: "f-7", name: "Visiting Mentor - Accessibility", title: "Visiting Faculty", department: "Universal Design", email: "visiting.access@nid.edu", room: "UD Studio", expertise: ["Accessibility audits", "Assistive technology"], photoUrl: "", sourceStatus: "Admin maintained", type: "Visiting" }
];

export const demoStaff = [
  { id: "s-1", name: "Academic Office", role: "Coordinator", department: "Administration", desk: "Admin Block", contact: "080-23373006", responsibilities: ["Admissions"] }
];

export const demoStudentBatches = [
  { id: "b-ixd-26", department: "Interaction Design", year: "2026", currentSemester: "Semester 3", strength: 38, archiveStatus: "Current" },
  { id: "b-dgd-27", department: "Digital Game Design", year: "2027", currentSemester: "Semester 1", strength: 30, archiveStatus: "Current" },
  { id: "b-dre-27", department: "Design for Retail Experience", year: "2027", currentSemester: "Semester 2", strength: 24, archiveStatus: "Current" },
  { id: "b-infod-26", department: "Information Design", year: "2026", currentSemester: "Semester 3", strength: 32, archiveStatus: "Current" },
  { id: "b-ud-25", department: "Universal Design", year: "2025", currentSemester: "Semester 4", strength: 22, archiveStatus: "Archive ready" }
];

export const demoWorkshops = [
  { id: "w-1", title: "Spatial Storytelling", department: "Interaction Design", facilitator: "Jonak Das", date: "2026-07-15", time: "10:00 AM", venue: "Animation Lab", seats: 20, status: "upcoming" }
];

export const demoClasses = [
  { id: "c-1", title: "Information Architecture Studio", topic: "Navigation models for compact campus systems", department: "Interaction Design", faculty: "Interaction Design Faculty", date: "2026-06-20", time: "09:30 AM", room: "Interaction Studio", batch: "M.Des 2026", facultyType: "Permanent" },
  { id: "c-2", title: "Visiting Critique", topic: "Accessibility audit presentation and feedback", department: "Universal Design", faculty: "Visiting Mentor - Accessibility", date: "2026-06-24", time: "02:00 PM", room: "UD Studio", batch: "M.Des 2025", facultyType: "Visiting" },
  { id: "c-3", title: "Retail Systems Review", topic: "Customer journey evidence walls", department: "Design for Retail Experience", faculty: "Retail Experience Faculty", date: "2026-06-27", time: "11:00 AM", room: "Retail Experience Studio", batch: "M.Des 2027", facultyType: "Permanent" }
];

export const demoMapLocations = [
  { id: "m-1", name: "Main Gate", type: "Entry", description: "HMT Link Road", x: 12, y: 85 },
  { id: "m-2", name: "KMC", type: "Library", description: "Resource centre", x: 35, y: 45 },
  { id: "m-5", name: "Interaction Studio", type: "Studio", description: "IxD workspace", x: 65, y: 55 }
];
