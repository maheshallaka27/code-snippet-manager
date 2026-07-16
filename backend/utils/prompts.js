export const explainPrompt = (language, code) => `
You are an expert software engineer.

Explain this ${language} code in simple language.

Code:

${code}
`;

export const optimizePrompt = (language, code) => `
Optimize the following ${language} code.

Return

1. Optimized code

2. Improvements

Code:

${code}
`;

export const bugPrompt = (language, code) => `
Find all bugs in this ${language} code.

Explain every bug.

Provide corrected code.

${code}
`;

export const complexityPrompt = (language, code) => `
Analyze this ${language} code.

Return

Time Complexity

Space Complexity

Reason

${code}
`;

export const testCasePrompt = (language, code) => `
Generate comprehensive test cases for this ${language} code.

${code}
`;
