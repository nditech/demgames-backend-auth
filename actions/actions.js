export const Add_Question = 'Add_Question'

let nextQuestion = 0;

export function AddQuestion(question) {
   return {
      type: Add_Question,
      id: nextQuestion++,
      question
   };
}