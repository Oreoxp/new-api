# Claude Code CLI 配置

Claude Code 使用本站 Claude 兼容接口时，先在本站创建 `sk-` 开头的令牌，再按下面配置。

## Command Prompt 临时配置

把 `sk-你的令牌` 换成你自己创建的 API Key。这些变量只在当前命令行窗口生效。

```
set ANTHROPIC_BASE_URL=https://omniapi.top
set ANTHROPIC_AUTH_TOKEN=sk-你的令牌
set CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

## VSCode Claude Code 配置

配置文件路径：`%userprofile%\.claude\settings.json`

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

## macOS / Linux 终端

临时生效可以直接执行下面命令；需要永久生效时，把同样内容添加到 `~/.bashrc`、`~/.zshrc` 或你正在使用的 shell 配置文件中。

```
export ANTHROPIC_BASE_URL=https://omniapi.top
export ANTHROPIC_AUTH_TOKEN=sk-你的令牌
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export CLAUDE_CODE_ATTRIBUTION_HEADER=0
```

配置完成后重新打开终端或 VSCode，再运行 Claude Code。API Key 使用本站生成的令牌，不需要登录官方 Claude 账号。
