// 答案验证器
export function validateAnswer(userAnswer: string, correctAnswer: string): boolean {
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}

export function validateCodeAnswer(userCode: string, expectedOutput: string, actualOutput: string): boolean {
  return actualOutput.trim() === expectedOutput.trim();
}
