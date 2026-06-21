# Claude Code Linux

Linux 和 Mac 的配置写法基本一致，适合本地桌面环境，也适合服务器和 WSL。

## shell 临时配置

```
export ANTHROPIC_BASE_URL="https://omniapi.top"
export ANTHROPIC_AUTH_TOKEN="sk-你的令牌"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export CLAUDE_CODE_ATTRIBUTION_HEADER=0
claude
```

## settings.json

```
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://omniapi.top",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的令牌",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}
```

Linux 也可以直接写入 `~/.claude/settings.json`，如果是 system 级部署再另外放到 `/etc/claude-code/`。
