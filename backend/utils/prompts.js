export const explainPrompt = (language, code) => `
You are an expert software engineer.

Explain this ${language} code in simple language.

Code:

${code}
`;

export const optimizePrompt = (language, code) => `
Optimize the following ${language} code.

Return:

1. Optimized code

2. Improvements

3. Why it is better
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

export const convertPrompt = (sourceLanguage, targetLanguage, code) => `
Convert the following ${sourceLanguage} code into ${targetLanguage}.

Rules:

- Keep the same logic.
- Use best coding practices.
- Return only the converted code.
- Do not include explanations.

${code}
`;
