import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt, framework, formats } = await req.json();

  const systemPrompt = `
## Role
You are an expert prompt engineer. Your task is to enhance the user's prompt using the "${framework}" framework.

## Framework Description
${getFrameworkDescription(framework)}

## Output Format
You must generate a JSON object with the following fields based on the requested formats: ${formats.join(', ')}.
Only populate the fields that correspond to the requested formats.

### Markdown
If "Markdown" is selected, provide a clean markdown version in the 'markdown' field.

### JSON
If "JSON" is selected, provide a structured JSON object with keys relevant to the framework in the 'json' field.
Example:
{
  "context": {
    "task": "Our favorite hikes together",
    "location": "Boulder",
    "season": "spring_2025"
  },
  "friends": ["ana", "luis", "sam"],
  "hikes": [
    {
      "id": 1,
      "name": "Blue Lake Trail",
      "distanceKm": 7.5,
      "elevationGain": 320,
      "companion": "ana",
      "wasSunny": true
    }
  ]
}

### TOON (Token Objected Oriented Notation)
If "TOON" is selected, provide a token-optimized representation in the 'toon' field.
Example:
context:
  task: Our favorite hikes together
  location: Boulder
  season: spring_2025
friends[3]: ana,luis,sam
hikes[3]{id,name,distanceKm,elevationGain,companion,wasSunny}:
  1,Blue Lake Trail,7.5,320,ana,true
  2,Ridge Overlook,9.2,540,luis,false
  3,Wildflower Loop,5.1,180,sam,true
`;

  const { object } = await generateObject({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    prompt: prompt,
    schema: z.object({
      markdown: z.string().optional().describe("The enhanced prompt in Markdown format"),
      json: z.any().optional().describe("The enhanced prompt in JSON format"),
      toon: z.string().optional().describe("The enhanced prompt in TOON format"),
    }),
  });

  return Response.json(object);
}

function getFrameworkDescription(framework: string): string {
  const descriptions: Record<string, string> = {
    RACE: "Role, Action, Context, Expectation. Define the persona, action, background, and desired outcome.",
    PAIN: "Problem, Agitate, Intrigue, Nurture. Identify pain, emphasize it, build curiosity, offer solution.",
    CARE: "Context, Action, Result, Example. Set scene, describe action, specify result, provide example.",
    RISE: "Role, Input, Steps, Expectation. Specify role, input data, steps, and output.",
    STAR: "Situation, Task, Action, Result. Describe situation, task, action, and result.",
    RTF: "Role, Task, Format. Define who acts, what they do, and output format.",
    TAG: "Task, Action, Goal. Focus on task, action, and goal.",
    APE: "Action, Purpose, Expectation. State action, reason, and expectation.",
  };
  return descriptions[framework] || "Standard prompt enhancement.";
}
