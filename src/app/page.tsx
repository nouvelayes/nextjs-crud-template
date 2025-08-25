import React from "react";

const features = [
  {
    title: "Next.js 15+",
    description:
      "Latest app directory structure with Turbopack support for high-performance builds.",
  },
  {
    title: "TypeScript 5",
    description:
      "Full type safety for robust, predictable, and maintainable code.",
  },
  {
    title: "Tailwind CSS 4",
    description:
      "Utility-first styling for rapid, responsive, and maintainable UI design.",
  },
  {
    title: "clsx",
    description: "Conditional class management for dynamic UI styling.",
  },
  {
    title: "dotenv-safe",
    description:
      "Ensures all required environment variables exist in development and production.",
  },
  {
    title: "Prettier + ESLint",
    description:
      "Enforces consistent formatting and code quality across the team.",
  },
  {
    title: "Husky + lint-staged",
    description:
      "Pre-commit hooks that automatically lint and format staged files.",
  },
  {
    title: "Commitlint",
    description:
      "Enforces conventional commits for clean, standardized Git history.",
  },
  {
    title: "pnpm support",
    description: "Fast and reliable package management.",
  },
];

const gettingStarted = [
  <>
    Clone the repo{" "}
    <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">
      https://github.com/nouvelayes/nextjs-template
    </code>
    .
  </>,
  <>
    Duplicate{" "}
    <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">
      .env.example
    </code>
    , rename it as{" "}
    <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">.env</code> and
    fill in your environment variables.
  </>,
  <>
    Install dependencies:{" "}
    <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">
      pnpm install
    </code>
  </>,
  <>
    Start development server:{" "}
    <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">
      pnpm run dev
    </code>
  </>,
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <section className="max-w-4xl px-6 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
          Next.js Template
        </h1>
        <p className="mb-8 text-lg text-gray-700 md:text-xl dark:text-gray-300">
          A modern, enterprise-ready Next.js template built with
          industry-standard best practices for scalable, maintainable, and
          high-performance web applications.
        </p>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          Everything configured for professional development teams: type safety,
          code quality enforcement, environment management, and responsive
          styling.
        </p>
      </section>

      <section className="grid w-full max-w-6xl grid-cols-1 gap-8 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col rounded-xl bg-white p-6 shadow transition-shadow hover:shadow-lg dark:bg-gray-800"
          >
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="flex-grow text-gray-700 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section className="w-full max-w-3xl px-6 pb-20 text-left">
        <h2 className="mb-6 text-3xl font-bold">Getting Started</h2>
        <ol className="list-inside list-decimal space-y-3 text-left text-gray-700 dark:text-gray-300">
          {gettingStarted.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
