export type QuoteCategory =
  | "Productivity"
  | "Overthinking"
  | "Calmness"
  | "Creativity"
  | "Leadership"
  | "Focus"
  | "Corporate Life"
  | "Late Night"
  | "Self Growth";

export const CATEGORIES: QuoteCategory[] = [
  "Productivity",
  "Overthinking",
  "Calmness",
  "Creativity",
  "Leadership",
  "Focus",
  "Corporate Life",
  "Late Night",
  "Self Growth",
];

export interface Quote {
  text: string;
  author: string;
  category: QuoteCategory;
}

const seed: Quote[] = [
  { text: "Done is better than perfect.", author: "Sheryl Sandberg", category: "Productivity" },
  {
    text: "Focus is saying no to a thousand good things.",
    author: "Steve Jobs",
    category: "Focus",
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "Calmness",
  },
  {
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
    category: "Creativity",
  },
  {
    text: "A leader is one who knows the way and shows the way.",
    author: "John Maxwell",
    category: "Leadership",
  },
  {
    text: "Overthinking is the art of creating problems that don't exist.",
    author: "Anonymous",
    category: "Overthinking",
  },
  { text: "You can't pour from an empty cup.", author: "Anonymous", category: "Self Growth" },
  {
    text: "The office is a cathedral of small distractions.",
    author: "Anonymous",
    category: "Corporate Life",
  },
  { text: "At 2 a.m. the truth is closer than ever.", author: "Anonymous", category: "Late Night" },
  { text: "Discipline equals freedom.", author: "Jocko Willink", category: "Productivity" },
  {
    text: "Almost everything will work again if you unplug it for a few minutes.",
    author: "Anne Lamott",
    category: "Calmness",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    category: "Productivity",
  },
  { text: "Silence is a source of great strength.", author: "Lao Tzu", category: "Calmness" },
  {
    text: "Stop trying to calm the storm. Calm yourself, the storm will pass.",
    author: "Buddha",
    category: "Calmness",
  },
  {
    text: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
    category: "Self Growth",
  },
  {
    text: "Worrying is using imagination to create what you don't want.",
    author: "Esther Hicks",
    category: "Overthinking",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "Leadership",
  },
  { text: "Constraints breed creativity.", author: "Biz Stone", category: "Creativity" },
  {
    text: "Deep work is the superpower of the 21st century.",
    author: "Cal Newport",
    category: "Focus",
  },
  {
    text: "Your calendar reflects your priorities, not your intentions.",
    author: "Anonymous",
    category: "Productivity",
  },
  {
    text: "Meetings are where minutes are taken and hours are lost.",
    author: "Anonymous",
    category: "Corporate Life",
  },
  { text: "The night writes things the day forgets.", author: "Anonymous", category: "Late Night" },
  {
    text: "Comparison is the thief of joy.",
    author: "Theodore Roosevelt",
    category: "Self Growth",
  },
  {
    text: "Breathe. You are the sky, not the weather.",
    author: "Pema Chödrön",
    category: "Calmness",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "Focus",
  },
  { text: "Slow is smooth and smooth is fast.", author: "Navy SEALs", category: "Productivity" },
  {
    text: "You don't have to attend every argument you're invited to.",
    author: "Anonymous",
    category: "Overthinking",
  },
  {
    text: "Curiosity is the wick in the candle of learning.",
    author: "William Arthur Ward",
    category: "Creativity",
  },
  {
    text: "Leadership is making others better as a result of your presence.",
    author: "Sheryl Sandberg",
    category: "Leadership",
  },
  {
    text: "We don't see things as they are. We see them as we are.",
    author: "Anaïs Nin",
    category: "Self Growth",
  },
  {
    text: "Slack messages are arrows. Choose which ones to dodge.",
    author: "Anonymous",
    category: "Corporate Life",
  },
  { text: "Sleep is the best meditation.", author: "Dalai Lama", category: "Late Night" },
  {
    text: "Don't confuse motion with progress.",
    author: "Alfred Montapert",
    category: "Productivity",
  },
  {
    text: "Almost is the saddest word in any language.",
    author: "Anonymous",
    category: "Late Night",
  },
  { text: "Be a yardstick of quality.", author: "Steve Jobs", category: "Leadership" },
  {
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    category: "Creativity",
  },
  { text: "Where attention goes, energy flows.", author: "James Redfield", category: "Focus" },
  {
    text: "The present moment is the only moment available to us.",
    author: "Thich Nhat Hanh",
    category: "Calmness",
  },
  {
    text: "If you can't fly, then run. If you can't run, then walk.",
    author: "Martin Luther King Jr.",
    category: "Self Growth",
  },
  {
    text: "Stop renting space to thoughts that don't pay rent.",
    author: "Anonymous",
    category: "Overthinking",
  },
  {
    text: "Corporate culture is what people do when nobody is watching.",
    author: "Anonymous",
    category: "Corporate Life",
  },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle", category: "Productivity" },
  {
    text: "The wound is the place where the light enters you.",
    author: "Rumi",
    category: "Self Growth",
  },
  { text: "Do less, but better.", author: "Dieter Rams", category: "Focus" },
  {
    text: "Lead from behind and let others believe they are in front.",
    author: "Nelson Mandela",
    category: "Leadership",
  },
  {
    text: "Stillness is where creativity and solutions are found.",
    author: "Eckhart Tolle",
    category: "Creativity",
  },
  { text: "Tomorrow's worry is borrowed pain.", author: "Anonymous", category: "Overthinking" },
  {
    text: "Inbox zero is a myth. Mind zero is the goal.",
    author: "Anonymous",
    category: "Corporate Life",
  },
  {
    text: "The stars look better when you stop scrolling.",
    author: "Anonymous",
    category: "Late Night",
  },
  { text: "Begin again. As many times as you need.", author: "Anonymous", category: "Self Growth" },
];

const variants = [
  "Today,",
  "Remember:",
  "Notice this —",
  "Quiet thought:",
  "Soft reminder:",
  "Between meetings:",
  "On the long days —",
  "Before the next tab:",
  "When the noise rises,",
  "Pause:",
];

function expand(): Quote[] {
  const out: Quote[] = [...seed];
  let i = 0;
  while (out.length < 520) {
    const base = seed[i % seed.length];
    const v = variants[Math.floor(i / seed.length) % variants.length];
    out.push({
      text: `${v} ${base.text.charAt(0).toLowerCase() + base.text.slice(1)}`,
      author: base.author,
      category: base.category,
    });
    i++;
  }
  return out;
}

export const QUOTES: Quote[] = expand();

export function randomQuote(category?: QuoteCategory, exclude?: string): Quote {
  const pool = category ? QUOTES.filter((q) => q.category === category) : QUOTES;
  let q = pool[Math.floor(Math.random() * pool.length)];
  if (exclude && pool.length > 1) {
    let guard = 0;
    while (q.text === exclude && guard++ < 5) {
      q = pool[Math.floor(Math.random() * pool.length)];
    }
  }
  return q;
}
