# challenge.simula.no

A collection of challenges published by Simula Research Laboratory and
SimulaMet, hosted at <https://challenge.simula.no>.

The site is a static Next.js export. Each challenge in `challenges/` is a
small markdown file with frontmatter; the home page renders a searchable grid
of cards that link out to the original challenge page.

## Stack

- [Next.js](https://nextjs.org/) (Pages Router, static export)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Vitest](https://vitest.dev/) for unit + integration tests
- [Playwright](https://playwright.dev/) for end-to-end tests

## Quickstart

```sh
make install       # npm install
make dev           # next dev → http://localhost:3000
make test          # vitest run
make test-e2e      # playwright
make build         # static export → ./out
```

## Adding a challenge

See [CONTRIBUTING.md](./CONTRIBUTING.md). Short version: drop a new
`challenges/<slug>.md` with `title`, `desc`, and `link` frontmatter, run
`npm test`, open a PR.

## Deployment

Pushes to `main` trigger
[`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml), which lints,
tests, builds, and rsyncs `./out/` to the production server over SSH.
