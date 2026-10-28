#!/usr/bin/env node
// @iris-code/mcp - the one-line install for the Iris Code MCP server.
//
// This SPAWNS the CLI rather than requiring it, and that is load-bearing rather
// than stylistic. The MCP server runs code analysis in a child process that
// re-launches `process.argv[1]`; if this wrapper required the CLI in-process,
// argv[1] would be THIS file, the child would be handed `check --format json`,
// and this wrapper does not understand that - the analysis tools would fail
// exactly the way `iris-lsp --mcp` did before 2026-08-27. Spawning gives the CLI
// its own process with its own correct argv[1].
//
// stdio is inherited so the JSON-RPC stream passes through untouched. Relaying it
// through pipes would put a second buffering layer on a newline-delimited
// protocol for no benefit.
const { spawn } = require('node:child_process')

let cliEntry
try {
  cliEntry = require.resolve('@iris-code/cli/dist/cli.js')
} catch {
  process.stderr.write(
    'Iris Code: could not resolve @iris-code/cli. Reinstall with `npm install @iris-code/mcp`,\n' +
    'or run the server directly with `npx -y @iris-code/cli mcp --root <directory>`.\n',
  )
  process.exit(1)
}

const child = spawn(process.execPath, [cliEntry, 'mcp', ...process.argv.slice(2)], {
  stdio: 'inherit',
  windowsHide: true,
})

child.on('error', (error) => {
  process.stderr.write(`Iris Code: failed to start the MCP server - ${error.message}\n`)
  process.exit(1)
})

// Mirror the child's fate rather than swallowing it: an MCP client reads the exit
// as the server going away, and a signal death must not report success.
child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code === null ? 1 : code)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    if (!child.killed) child.kill(signal)
  })
}
