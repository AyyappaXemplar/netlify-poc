const validate = require("validate.js");

export function needExplanation(question) {
  return new RegExp(/explain/).test(question.text)
}

validate.validators.questionPresence = (value, options, key, attributes) => {
  if (value.some(question => question.value === '' )) {
    return "^You need to answer all questions";
  } else {
    return null;
  }
};

validate.validators.questionExplanation = (value, options, key, attributes) => {
  if (value.some(question => needExplanation(question) && question.value && !question.explanation)) {
    return "explanation is missing";
  } else {
    return null;
  }
};

const questionsFormValidator = {
  questions: {
    questionPresence: true,
    questionExplanation: true
  }
}

export default function validateQuestions(attributes, options) {
  return validate(attributes, questionsFormValidator, options)
};
