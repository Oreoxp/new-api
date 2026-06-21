# Claude Code Windows

Windows 下建议先创建本站的 `sk-` 令牌，再把中转地址和环境变量写好。

## 命令提示符

```
set ANTHROPIC_BASE_URL=https://omniapi.top
set ANTHROPIC_AUTH_TOKEN=sk-你的令牌
set CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
set CLAUDE_CODE_ATTRIBUTION_HEADER=0
claude
```

## PowerShell

```
$env:ANTHROPIC_BASE_URL="https://omniapi.top"
$env:ANTHROPIC_AUTH_TOKEN="sk-你的令牌"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1"
$env:CLAUDE_CODE_ATTRIBUTION_HEADER="0"
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

Windows 上把配置写进 `%USERPROFILE%\.claude\settings.json` 也可以；改完后重新打开终端再运行 Claude Code。
