# Codex 配置教程 Windows

## 1. 设置环境变量

把 `sk-xxxx` 换成你自己创建的 API Key：

```
[Environment]::SetEnvironmentVariable("NEWAPI_API_KEY", "sk-xxxx", "User")
```

## 2. 配置 config.toml

路径：`C:\Users\你的用户名\.codex\config.toml`

```
model = "gpt-5.5"
model_provider = "newapi"
model_reasoning_effort = "xhigh"

[model_providers.newapi]
name = "New API Relay"
base_url = "https://omniapi.top/v1"
env_key = "NEWAPI_API_KEY"
wire_api = "responses"

[windows]
sandbox = "unelevated"
```

## 3. 配置 auth.json

路径：`C:\Users\你的用户名\.codex\auth.json`

```
{
  "auth_mode": "apikey"
}
```

配置完成后完全退出 Codex 再重新打开。如果输入框右侧显示 New API Relay，说明已经走本站中转。
