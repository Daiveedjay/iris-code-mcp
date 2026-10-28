# Iris Code MCP launcher

Give coding agents your project's real code-quality rules, findings, safe fixes and gate results.

This repository contains the **npm launcher and setup documentation** for Iris Code's local MCP server. It starts the published `@iris-code/cli` package, which carries the implementation. The analysis engine's source is maintained separately and is not included here. The launcher declares the MIT license; this repository does not claim the whole Iris Code product is open source.

## Install

Requires Node.js 18 or newer.

```sh
npx -y @iris-code/mcp
```

Add this to your client's MCP configuration:

```json
{
  "mcpServers": {
    "iris_code": {
      "command": "npx",
      "args": ["-y", "@iris-code/mcp"]
    }
  }
}
```

Clients normally supply the current workspace root. For a client that does not provide MCP roots, append `--root` and your absolute project path to `args`. In JetBrains IDEs, use Tools | Iris Code | Set Up MCP Server from the installed Iris Code plugin.

## What agents can do

| Tool                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `iris_check`            | Located findings and code-health measurements        |
| `iris_config`           | Resolved project thresholds and rules                |
| `iris_fix_safe`         | Preview and apply provable mechanical fixes          |
| `iris_refactor_plan`    | Located refactor suggestions and a captured baseline |
| `iris_verify_refactor`  | Verify improvement against a baseline                |
| `iris_schema`           | Real database tables, columns and relations          |
| `iris_explain`          | Rule details behind findings                         |
| `iris_gate`             | Quality-gate result and failing rules                |
| `iris_check_dependency` | Dependency advisory evidence                         |
| `iris_check_package`    | Package risk before installation                     |

Single-file workflows are Free and require no API key. Fresh project work requires sign-in and applicable access. Reopening owned evidence does not spend another project action. Paid access adds broader enforcement and project capabilities. See [current pricing](https://www.iriscode.co/pricing) and the [MCP guide](https://docs.iriscode.co/agents/mcp).

## Boundaries

Analysis runs locally. The server has no general shell-execution tool. Secret values are masked, and requested paths are confined to the project root, including symlink resolution. Safe fixes preview first; applying needs the preview's single-use token. Dependency and advisory lookups require network consent. Repository handoff policy and access checks still apply.

## Support and privacy

- [Homepage](https://www.iriscode.co/mcp)
- [MCP documentation](https://docs.iriscode.co/agents/mcp)
- [Support](https://www.iriscode.co/support)
- [Privacy](https://www.iriscode.co/privacy)
- [Terms](https://www.iriscode.co/terms)

The prepared `0.2.2` metadata adds the official MCP Registry ownership field. That version is not published until the maintainer completes the package release; the install command above resolves the current published npm version.
