# 手动接入





## 如何创建令牌 API Key

1.  登录网站后进入控制台。
2.  打开“令牌”或“API令牌”页面。
3.  点击“新建令牌”。
4.  名称可以写 Codex、ChatBox、翻译插件等，方便区分用途。
5.  额度限制、过期时间、模型限制不懂就保持默认。
6.  创建后复制生成的 `sk-` 开头密钥。

API Key 只展示一次，请保存好。不要把 API Key 发给别人，别人拿到后可以消耗你的余额。





## 通用 API 配置

大多数支持 OpenAI 接口的软件，都按下面填写：

-   API Key：填写你创建的 `sk-` 开头令牌
-   Base URL / API Host：`https://omniapi.top/v1`
-   Chat Completions：`https://omniapi.top/v1/chat/completions`
-   Responses：`https://omniapi.top/v1/responses`

如果软件让你选择模型供应商，通常选择 OpenAI 或 OpenAI Compatible。





## Claude Code CLI 配置

Claude Code 使用本站 Claude 兼容接口时，先在本站创建 `sk-` 开头的令牌，再按下面配置。

### Command Prompt 临时配置

把 `sk-你的令牌` 换成你自己创建的 API Key。这些变量只在当前命令行窗口生效。

```
set ANTHROPIC_BASE_URL=https://omniapi.top
set ANTHROPIC_AUTH_TOKEN=sk-你的令牌
set CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

### VSCode Claude Code 配置

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

### macOS / Linux 终端

临时生效可以直接执行下面命令；需要永久生效时，把同样内容添加到 `~/.bashrc`、`~/.zshrc` 或你正在使用的 shell 配置文件中。

```
export ANTHROPIC_BASE_URL=https://omniapi.top
export ANTHROPIC_AUTH_TOKEN=sk-你的令牌
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export CLAUDE_CODE_ATTRIBUTION_HEADER=0
```

配置完成后重新打开终端或 VSCode，再运行 Claude Code。API Key 使用本站生成的令牌，不需要登录官方 Claude 账号。





## Claude Code Windows

Windows 下建议先创建本站的 `sk-` 令牌，再把中转地址和环境变量写好。

### 命令提示符

```
set ANTHROPIC_BASE_URL=https://omniapi.top
set ANTHROPIC_AUTH_TOKEN=sk-你的令牌
set CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
set CLAUDE_CODE_ATTRIBUTION_HEADER=0
claude
```

### PowerShell

```
$env:ANTHROPIC_BASE_URL="https://omniapi.top"
$env:ANTHROPIC_AUTH_TOKEN="sk-你的令牌"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1"
$env:CLAUDE_CODE_ATTRIBUTION_HEADER="0"
claude
```

### settings.json

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



## Claude Code Mac

Mac 上和 Linux 的思路一样，核心是让 Claude Code 走本站的中转接口。

### 终端临时配置

```
export ANTHROPIC_BASE_URL="https://omniapi.top"
export ANTHROPIC_AUTH_TOKEN="sk-你的令牌"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export CLAUDE_CODE_ATTRIBUTION_HEADER=0
claude
```

### settings.json

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



## Claude Code Linux

Linux 和 Mac 的配置写法基本一致，适合本地桌面环境，也适合服务器和 WSL。

### shell 临时配置

```
export ANTHROPIC_BASE_URL="https://omniapi.top"
export ANTHROPIC_AUTH_TOKEN="sk-你的令牌"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export CLAUDE_CODE_ATTRIBUTION_HEADER=0
claude
```

### settings.json

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





## Codex 配置教程 Windows

### 1. 设置环境变量

把 `sk-xxxx` 换成你自己创建的 API Key：

```
[Environment]::SetEnvironmentVariable("NEWAPI_API_KEY", "sk-xxxx", "User")
```

### 2. 配置 config.toml

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

### 3. 配置 auth.json

路径：`C:\Users\你的用户名\.codex\auth.json`

```
{
  "auth_mode": "apikey"
}
```

配置完成后完全退出 Codex 再重新打开。如果输入框右侧显示 New API Relay，说明已经走本站中转。







## Codex 配置教程 Mac

Mac 上同样可以不登录 ChatGPT 账号，直接让 Codex 使用本站的 API Key 和中转地址。

### 1. 找到 Codex 配置目录

打开“终端”，确认配置目录在 `~/.codex/`。主要看这两个文件：

-   `config.toml`：模型和接口地址配置。
-   `auth.json`：登录方式和 API Key。

```
mkdir -p ~/.codex
ls -la ~/.codex
```

### 2. 先备份原配置

修改前先备份，后面想恢复可以直接找回。

```
cp ~/.codex/config.toml ~/.codex/config.toml.bak-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
cp ~/.codex/auth.json ~/.codex/auth.json.bak-$(date +%Y%m%d-%H%M%S) 2>/dev/null || true
```

### 3. 写入 config.toml

用文本编辑器打开 `~/.codex/config.toml`，把下面这几行放进去。已经有同名字段时，以这里为准。

```
model = "gpt-5.4"
model_reasoning_effort = "medium"
openai_base_url = "https://omniapi.top/v1"
```

### 4. 写入 auth.json

把 `sk-xxxx` 换成你在本站创建的 API Key。注意 `auth_mode` 必须写 `apikey`，不要写成 `api_key`。

```
{
  "auth_mode": "apikey",
  "OPENAI_API_KEY": "sk-xxxx",
  "tokens": null,
  "last_refresh": null
}
```

### 5. 检查登录状态

执行下面命令，如果看到 `Logged in using an API key`，说明 Codex 已经识别 API Key 模式。

```
codex login status
```

### 6. 发送一次真实请求

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







## ChatBox 与浏览器插件配置

### ChatBox

1.  模型提供商选择 OpenAI。
2.  API Key 填写你的 `sk-` 令牌。
3.  API Host 填写 `https://omniapi.top/v1`。
4.  保存后选择模型开始使用。

### 沉浸式翻译等插件

1.  打开插件设置，找到自定义 OpenAI 或 OpenAI Compatible。
2.  API Key 填写你的 `sk-` 令牌。
3.  API 地址填写 `https://omniapi.top/v1`。
4.  保存后先做一次短文本测试。





## 开发者调用示例

### Node.js

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-xxxx",
  baseURL: "https://omniapi.top/v1",
});

const response = await client.chat.completions.create({
  model: "gpt-5.5",
  messages: [{ role: "user", content: "你好" }],
});

console.log(response.choices[0].message.content);
```

### Python

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-xxxx",
    base_url="https://omniapi.top/v1",
)

resp = client.chat.completions.create(
    model="gpt-5.5",
    messages=[{"role": "user", "content": "你好"}],
)

print(resp.choices[0].message.content)
```
