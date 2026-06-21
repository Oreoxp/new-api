# Claude Code Mac

Mac 上和 Linux 的思路一样，核心是让 Claude Code 走本站的中转接口。

## 终端临时配置

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

Mac 上如果你想永久生效，把同样的内容写进 `~/.claude/settings.json`，然后重新打开终端即可。
