interface BmiValues {
  height: number;
  weight: number;
}

interface BmiResult {
  weight: number,
  height: number,
  bmi: string
}

interface ErrorMessage {
  error: string
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


export const calculateBmi = (height: number, weight: number): BmiResult | ErrorMessage => {
  const heightToMeters = height/100;
  const bmiIndex = (weight)/(heightToMeters*heightToMeters);
  let message = '';

  if (isNaN(heightToMeters) || isNaN(bmiIndex)) {
    return {error: "Malformatted parameters"};
  }
  if (bmiIndex >= 18.5 && bmiIndex <=25) {
    message = 'Normal';
  }
  if (bmiIndex > 25 && bmiIndex <= 30) {
    message = 'Overweight';
  }
  if (bmiIndex > 30 && bmiIndex <= 40) {
    message = 'Obesity';
  }
  if (bmiIndex >= 40) {
    message = 'Morbid obesity';
  }
  if (bmiIndex < 18.5) {
    message = 'Something is not right';
  }
  return {weight: weight, height: height, bmi: message};
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}