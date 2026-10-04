# Pipeline Lab

A small React + TypeScript app for learning GitHub, Jenkins CI, and Docker one step at a time. It has no application backend; the interactive stages are a lightweight learning checklist.

## Prerequisites

- Node.js 22 LTS and npm
- Docker Desktop for Windows, running with Linux containers
- VS Code with a PowerShell terminal

## Run locally

Open a terminal in this folder and run:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Verify the project

Run these commands in order from this folder:

```powershell
npm install
npm run lint
npm run test:run
npm run build
docker build -t react-jenkins-demo .
docker run -p 8080:80 react-jenkins-demo

#if already running use below
docker build -t react-jenkins-demo .
docker run --rm -p 8080:80 react-jenkins-demo
```

While the last command is running, open [http://localhost:8080](http://localhost:8080). Press `Ctrl+C` in the terminal to stop the container. If port 8080 is already in use, change the host-side port, for example `-p 8081:80`, and open `http://localhost:8081`.

`npm run test` starts Vitest in watch mode for development. Use `npm run test:run` for a single, CI-friendly test run.

## Project files

| File or folder | Purpose |
| --- | --- |
| `src/App.tsx` | The demo screen and interactive stage checklist. |
| `src/components/PipelineStage.tsx` | Reusable, accessible pipeline-stage button. |
| `src/utils/getCompletionPercentage.ts` | Small progress utility with boundary handling and unit tests. |
| `src/App.test.tsx` | Tests the screen and progress interaction. |
| `src/utils/getCompletionPercentage.test.ts` | Unit tests for progress calculations. |
| `vite.config.ts` | Vite and Vitest configuration, including the browser-like test environment. |
| `eslint.config.js` | ESLint flat configuration for TypeScript, React Hooks, and tests. |
| `package.json` / `package-lock.json` | Dependencies and the npm scripts used locally and by CI. |
| `Dockerfile` | Multi-stage build: Node compiles the app; Nginx serves the production files. |
| `nginx.conf` | Nginx static-file and single-page-app fallback configuration. |
| `Jenkinsfile` | Declarative CI pipeline for checkout, npm checks, app build, and Docker image build. |
| `.dockerignore` / `.gitignore` | Keep generated files and local dependencies out of Docker builds and Git. |

## Docker notes

The image uses `node:22-alpine` only in the build stage. The final image is based on `nginx:1.29-alpine`, serves the production bundle on container port 80, and does not include Node or the source tree. Docker Desktop can run this Linux-container image from a Windows terminal.

## GitHub workflow to practice

1. Create a GitHub repository and push this project.
2. Make a small change on a branch, commit it, and push the branch.
3. Open a pull request and review the diff before merging.
4. Merge to the main branch after the CI checks pass.

## Jenkins pipeline

The root `Jenkinsfile` defines a Declarative Pipeline with separate stages for checkout, dependency installation, lint, tests, the production app build, and Docker image creation. In Jenkins, create a Pipeline job configured to use this repository and its `Jenkinsfile`; you can run it manually with **Build Now**.

This starter pipeline uses Windows `bat` steps. Its Jenkins agent must be a Windows machine with Node.js 22, npm, and the Docker CLI on `PATH`. Docker Desktop must be running, and the account running the Jenkins agent must be able to access its Docker engine. If Jenkins itself runs in a container, configure a Windows agent with those tools for this pipeline, or adapt the steps for that agent's operating system and Docker access.

The Docker stage builds a local image tagged `react-jenkins-demo`; it does not push the image to a registry or deploy it. The next step after trying the pipeline is configuring a GitHub webhook so pushes or pull requests can trigger Jenkins automatically. That webhook is not configured by this project.
