import { useState} from "react";
import Inputs from "./components/inputs";
import { calculateCGPA, calculateGPA } from "./utils";
import { Analytics } from "@vercel/analytics/react"
interface ScoreAndUnit {
  score: number;
  unit: number;
  semester: string;
}

interface Course {
  course: string;
  semester: string;
}

function App() {
  const [firstCourseCount, setFirstCourseCount] = useState<number[]>([0]);
  const [totalCourseCount, setTotalCourseCount] = useState<number>(1);

  const firstAddCourse = () => {
    setFirstCourseCount((prevCount) => [...prevCount, totalCourseCount]);
    setTotalCourseCount((prevCount) => prevCount + 1);
  };

  const [secondCourseCount, setSecondCourseCount] = useState<number[]>([]);
  const secondAddCourse = () => {
    setSecondCourseCount((prevCount) => [...prevCount, totalCourseCount]);
    setTotalCourseCount((prevCount) => prevCount + 1);
  };

  const [_courses, setCourses] = useState<Record<number, Course>>({});
  
  const [scoresAndUnits, setScoresAndUnits] = useState<
    Record<number, ScoreAndUnit>
  >({});

  const cgpa = calculateCGPA(scoresAndUnits);
  const firstgpa = calculateGPA("first", scoresAndUnits);
  const secondgpa = calculateGPA("second", scoresAndUnits);

  const getClassification = (cgpa: number): string =>
    cgpa >= 3.5
      ? "First Class"
      : cgpa >= 3.0
      ? "Second Class Upper"
      : cgpa >= 2.0
      ? "Second Class Lower"
      : cgpa >= 1.0
      ? "Third Class"
      : "Withdraw from University";

  const deleteInput = (semester: string, numToDelete: number) => {
    if (semester === "first") {
      setFirstCourseCount(
        firstCourseCount.filter((num) => num !== numToDelete)
      );
      setScoresAndUnits((prev) => {
        const newObj = { ...prev };
        delete newObj[numToDelete];
        return newObj;
      });
    } else if (semester === "second") {
      setSecondCourseCount(
        secondCourseCount.filter((num) => num !== numToDelete)
      );
      setScoresAndUnits((prev) => {
        const newObj = { ...prev };
        delete newObj[numToDelete];
        return newObj;
      });
    }
  };



  return (
    <>
    <Analytics/>
      <div className="navbar bg-base-100">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">4-POINT CGPA CALCULATOR</a>
        </div>
        <div className="navbar-end"></div>
      </div>

      <div
        className="hero min-h-96 p-5"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Welcome!</h1>
            <p className="mb-5 text-white">
              Quickly calculate your Grade Point Average (GPA) and Cumulative
              Grade Point Average (CGPA) using the tool below.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full p-10">
        <div className="grid rounded-box place-items-center">
          <h3 className="mb-1 text-2xl">First Semester</h3>
          {firstCourseCount.map((num) => (
            <Inputs
              key={num}
              id={num}
              deleteInput={() => deleteInput("first", num)}
              setScoresAndUnits={setScoresAndUnits}
              setCourses={setCourses}
              semester="first"
            />
          ))}
          <button onClick={firstAddCourse} className="btn mb-6 max-w w-full">
            Add course
          </button>
          <p>
            First Semester GPA:{" "}
            {isNaN(firstgpa) ? 0 : firstgpa.toFixed(2)}
          </p>
        </div>

        <div className="divider size-10 place-self-center"></div>

        <div className="grid rounded-box place-items-center">
          <h2 className="mb-1 text-2xl">Second Semester</h2>
          {secondCourseCount.map((num) => (
            <Inputs
              key={num}
              id={num}
              deleteInput={() => deleteInput("second", num)}
              setScoresAndUnits={setScoresAndUnits}
              setCourses={setCourses}
              semester="second"
            />
          ))}
          <button onClick={secondAddCourse} className="btn mb-4 max-w w-full">
            Add course
          </button>
          <p>
            Second Semester GPA:{" "}
            {isNaN(secondgpa) ? 0 : secondgpa.toFixed(2)}
          </p>
        </div>

        <div className="divider size-10 place-self-center"></div>

        <div className="stats place-content-center">
          <div className="stat">
            <div className="stat-title">Your CGPA is:</div>
            <div className="stat-value text-primary">
              {isNaN(cgpa) ? 0 : cgpa.toFixed(2)}
            </div>
            <div className="stat-desc">{getClassification(cgpa)}</div>
          </div>
        </div>
      </div>


      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Created by Aneousion, source code <a href="https://github.com/aneousion"><u>here</u></a>.</p>
        </aside>
      </footer>
    </>
  );
}

export default App;
