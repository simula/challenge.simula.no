# Contributing

Thanks for your interest in contributing a challenge to
[challenge.simula.no](https://challenge.simula.no).

## Adding a challenge

1. Fork this repository and create a branch.
2. Create a new file at `challenges/<slug>.md` (e.g.
   `challenges/medico-2025.md`).
3. Fill in the YAML frontmatter:

   ```markdown
   ---
   title: 'Medico 2025'
   desc: 'A one-sentence description of what the challenge is about.'
   link: https://example.com/path-to-the-challenge
   ---
   ```

   Required fields:

   | Field   | Type   | Notes                                       |
   | ------- | ------ | ------------------------------------------- |
   | `title` | string | Display name of the challenge.              |
   | `desc`  | string | One sentence summarizing the challenge.     |
   | `link`  | string | Absolute `http(s)` URL to the challenge page. |

   Optional:

   | Field    | Type    | Notes                                       |
   | -------- | ------- | ------------------------------------------- |
   | `hidden` | boolean | Set `true` to keep an entry out of listings. |

4. Run the tests locally:

   ```sh
   npm install
   npm test
   ```

   The integration test walks `challenges/` and validates every entry's
   frontmatter — invalid entries fail CI before review.

5. Open a pull request. CI runs lint, unit/integration tests, and Playwright
   E2E tests. A maintainer will review and merge.

## Local development

```sh
make install   # npm install
make dev       # next dev → http://localhost:3000
make test      # vitest run
make test-e2e  # playwright (builds, serves /out, runs tests)
make lint      # eslint ./src
make format    # prettier --write .
make build     # next build → static export in ./out
```

## Questions?

Reach out to steven@simula.no.
