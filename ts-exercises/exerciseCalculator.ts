interface ExerciseSummary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseValues {
  hoursArray: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  const hoursArray = [];
  const target = Number(args[2]);

  let i=3;
  while (args[i] != undefined) {
    hoursArray.push(Number(args[i]));
    i++;
  }

  return {
    hoursArray: hoursArray,
    target: target
  };
};

export const exerciseCalculator = (hoursOfExercise: Array<number>, target: number): ExerciseSummary => {
  const periodLength = hoursOfExercise.length;
  let trainingDays = 0;
  let sumHours = 0;
  let ratingDescription = '';
  let rating = 0;

  for (const hours of hoursOfExercise) {
    if (hours != 0) {
      trainingDays = trainingDays + 1;
    }
    sumHours = sumHours + hours;
  }

  const averageTrainingHours = sumHours/periodLength;
  const targetReached = averageTrainingHours >= target;

  if (targetReached) {
    rating = 3;
    ratingDescription = "Awesome, you reached your target! Continue like this.";
  }
  if ((trainingDays/periodLength)>=0.6 && (!targetReached)) {
    rating = 2;
    ratingDescription = "Not too bad, but you can do batter and reach your target!";
  }
  if ((trainingDays/periodLength)<0.6 && (!targetReached)) {
    rating = 1;
    ratingDescription = "Try harder and everything will be okay.";
  }

  return {
    periodLength: periodLength, 
    trainingDays: trainingDays, 
    success: targetReached, 
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTrainingHours
  };
};

try {
  const { hoursArray, target } = parseExerciseArguments(process.argv);
  console.log(exerciseCalculator(hoursArray, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}