# Codex 配置教程 Mac

Mac 上同样可以不登录 ChatGPT 账号，直接让 Codex 使用本站的 API Key 和中转地址。

## 1. 找到 Codex 配置目录

打开“终端”，确认配置目录在 `~/.codex/`。主要看这两个文件：

-   `config.toml`：模型和接口地址配置。
-   `auth.json`：登录方式和 API Key。

```
mkdir -p ~/.codex
ls -la ~/.codex
```

## 2. 先备份原配置

修改前先备份，后面想恢复可以直接找回。

```
cp ~/.codex/config.toml ~/.codex/config.toml.bak-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
cp ~/.codex/auth.json ~/.codex/auth.json.bak-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
```

## 3. 写入 config.toml

用文本编辑器打开 `~/.codex/config.toml`，把下面这几行放进去。已经有同名字段时，以这里为准。

```
model = "gpt-5.4"
model_reasoning_effort = "medium"
openai_base_url = "https://omniapi.top/v1"
```

## 4. 写入 auth.json

把 `sk-xxxx` 换成你在本站创建的 API Key。注意 `auth_mode` 必须写 `apikey`，不要写成 `api_key`。

```
{
  "auth_mode": "apikey",
  "OPENAI_API_KEY": "sk-xxxx",
  "tokens": null,
  "last_refresh": null
}
```

## 5. 检查登录状态

执行下面命令，如果看到 `Logged in using an API key`，说明 Codex 已经识别 API Key 模式。

```
codex login status
```

## 6. 发送一次真实请求

用一个最短请求确认中转站能正常返回结果。

```
codex exec --skip-git-repo-check "Reply with exactly: OK"
```

正常情况下会返回：

```
OK
```

最终真正决定 Codex 走本站中转的是这三个字段：`openai_base_url`、`auth_mode`、`OPENAI_API_KEY`。

如果偶尔看到 `stream disconnected - retrying sampling request`，一般是流式响应重连提示。Codex 会自动重试，短任务通常不影响使用；长回复卡住时重新发一次即可。
