import { useAuth } from "../context/AuthContext";

// Each tile maps to a later increment (a CRUD entity from the ERD). They are disabled for now.
const STUDENT_TILES = [
  { title: "My class schedule", note: "CLASS_SCHEDULE: add, edit and delete classes" },
  { title: "Find jobs", note: "JOB: browse gigs that fit your free time" },
  { title: "My applications", note: "APPLICATION: track pending, accepted and completed gigs" },
  { title: "Saved jobs", note: "SAVED_JOB: bookmark gigs for later" },
  { title: "Skill badges", note: "BADGE, RATING, EXPERIENCE: your verified skills" },
];

const EMPLOYER_TILES = [
  { title: "Post a job", note: "JOB: create, edit and close job posts" },
  { title: "Applicants", note: "APPLICATION: review, accept or reject" },
  { title: "Rate students", note: "RATING: rate completed gigs to award badges" },
  { title: "Get verified", note: "EMPLOYER.is_verified: request a verified label" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const isStudent = user.role === "STUDENT";
  const tiles = isStudent ? STUDENT_TILES : EMPLOYER_TILES;

  return (
    <div className="dash">
      <header className="topbar">
        <span className="brand small">UniEarn</span>
        <button className="ghost" onClick={logout}>Log out</button>
      </header>

      <main className="dash-body">
        <h1>Hi, {user.name}</h1>
        <span className="pill">{isStudent ? "Student" : "Employer"}</span>

        <section className="card">
          <h2>Your profile</h2>
          <dl className="profile">
            <dt>Email</dt><dd>{user.email}</dd>
            {isStudent ? (
              <>
                <dt>School</dt><dd>{user.school}</dd>
                <dt>Course</dt><dd>{user.course}</dd>
              </>
            ) : (
              <>
                <dt>Company</dt><dd>{user.companyName}</dd>
                <dt>Address</dt><dd>{user.address || "—"}</dd>
                <dt>Status</dt>
                <dd>{user.verified ? "Verified employer" : "Not verified yet"}</dd>
              </>
            )}
          </dl>
        </section>

        <section>
          <h2>Coming in later increments</h2>
          <div className="tiles">
            {tiles.map((t) => (
              <button key={t.title} className="tile" disabled>
                <strong>{t.title}</strong>
                <span>{t.note}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
