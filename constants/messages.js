export const MESSAGES = {
  WELCOME_MESSAGE: [
    { id: 1, message: "Hi, what's on your mind?" },
    { id: 2, message: "Hi, what's that word you're thinking of?" },
    { id: 3, message: "Hi, got a word you're trying to recall?" },
    { id: 4, message: "Hi, got a near-miss word?" },
    { id: 5, message: "Hi, what's that elusive word?" },
  ],
  PREDICTION_ERROR_MESSAGE: [
    {
      id: 1,
      message: "Oops! Let's try again. \n Could you provide a bit more detail?",
    },
    {
      id: 2,
      message: "Well, nobody's perfect! \n Can you give me another clue?",
    },
    {
      id: 3,
      message: "Hmm... Got it, \n Could you refine your description a bit?",
    },
  ],
  PREDICTION_SUCCESS_MESSAGE: [
    {
      id: 1,
      message: "Awesome! \n Anything else you're trying to recall?",
    },
    {
      id: 2,
      message: "Perfect! Do you want to try again?",
    },
    {
      id: 3,
      message: "Terrific! Why don't you do it again?",
    },
  ],
};
