interface ScoreAndUnit {
    score: number;
    unit: number;
    semester: string;
  }


const filterScoresAndUnitsBySemester = (
    scoresAndUnits: Record<number, ScoreAndUnit>,
    semester: string
  ): Record<number, ScoreAndUnit> => {
    const filteredScoresAndUnits: Record<number, ScoreAndUnit> = {};
    
    for (const [courseIdString, courseData] of Object.entries(scoresAndUnits)) {

      const courseId: number = parseInt(courseIdString);
      
      if (courseData.semester === semester) {
        filteredScoresAndUnits[courseId] = courseData; 
      }
    }

    return filteredScoresAndUnits;
  };

  const calculatePoints = (score: number, unit: number) => {
    let points = 0;
    if (score >= 70 && score <= 100) points = 4 * unit;
    else if (score >= 60 && score <= 69) points = 3 * unit;
    else if (score >= 50 && score <= 59) points = 2 * unit;
    else if (score >= 45 && score <= 49) points = 1 * unit;
    return points;
  };

  export const calculateGPA = (semester: string, scoresAndUnits: Record<number, ScoreAndUnit>) => {
    const filteredScoresAndUnits = filterScoresAndUnitsBySemester(
      scoresAndUnits,
      semester
    );
    let totalPoints = 0;
    let totalUnits = 0;
    for (const [, { score, unit }] of Object.entries(filteredScoresAndUnits)) {
      totalPoints += calculatePoints(score, unit);
      totalUnits += unit;
    }

    const gpa = totalPoints / totalUnits;
    return gpa
  }; 
 

  export const calculateCGPA = (scoresAndUnits: Record<number, ScoreAndUnit>) => {
    const totalPoints = Object.values(scoresAndUnits).reduce(
      (acc, { score, unit }) => acc + calculatePoints(score, unit),
      0
    );
    const totalUnits = Object.values(scoresAndUnits).reduce(
      (acc, { unit }) => acc + unit,
      0
    );
    const cgpa = totalPoints / totalUnits;
    return cgpa
  };

  