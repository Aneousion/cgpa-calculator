import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

interface Props {
  deleteInput: () => void;
  setCourses: Dispatch<
    SetStateAction<Record<number, { course: string; semester: string }>>
  >;
  setScoresAndUnits: Dispatch<
    SetStateAction<
      Record<number, { score: number; unit: number; semester: string }>
    >
  >;
  id: number;
  semester: string;
}

export default function Inputs({
  deleteInput,
  setCourses,
  setScoresAndUnits,
  id,
  semester,
}: Props) {
  const [course, setCourse] = useState("");
  const [score, setScore] = useState<number>();
  const [unit, setUnit] = useState<number>(0);

  const handleCourseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCourse(event.target.value);
    setCourses((prev) => ({
      ...prev,
      [id]: { ...prev[id], course: event.target.value },
    }));
  };

  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(event.target.value);
    setScore(newScore);
    setScoresAndUnits((prev) => ({
      ...prev,
      [id]: { ...prev[id], score: newScore, semester: semester },
    }));
  };

  const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newUnit = parseInt(event.target.value);
    setUnit(newUnit);
    setScoresAndUnits((prev) => ({
      ...prev,
      [id]: { ...prev[id], unit: newUnit, semester: semester },
    }));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Course Name or Code (Optional)"
        className="input input-bordered mb-2 input-sm mt-3 w-full max-w"
        maxLength={50}
        value={course}
        onChange={handleCourseChange}
      />
      <div className="join w-full max-w mb-6">
        <input
          type="number"
          placeholder="Score over 100"
          min={0}
          max={100}
          className="input input-bordered w-full max-w-xs join-item"
          value={score}
          onChange={handleScoreChange}
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className="select w-full select-bordered join-item"
        >
          <option value={0} disabled>
            Choose the course unit
          </option>
          <option value={4}>4 units</option>
          <option value={3}>3 units</option>
          <option value={2}>2 units</option>
          <option value={1}>1 unit</option>
        </select>
        <button
          onClick={deleteInput}
          className="btn btn-outline btn-error join-item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
