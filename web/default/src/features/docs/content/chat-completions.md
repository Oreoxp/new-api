# 对话补全

对话补全是最常用的接口，路径为 `POST /v1/chat/completions`。

## 请求示例

### curl

```bash
curl https://omniapi.top/v1/chat/completions \
  -H "Authorization: Bearer $OMNI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "system", "content": "你是一个简洁的助手。" },
      { "role": "user", "content": "你好" }
    ],
    "temperature": 0.7
  }'
```

### Python（openai SDK）

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://omniapi.top/v1",
)

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "你好"}],
)
print(resp.choices[0].message.content)
```

### Node.js（openai SDK）

```javascript
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'sk-your-key',
  baseURL: 'https://omniapi.top/v1',
})

const resp = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: '你好' }],
})
console.log(resp.choices[0].message.content)
```

## 常用参数

| 参数 | 类型 | 说明 |
|---|---|---|
| `model` | string | 模型名，必填 |
| `messages` | array | 对话消息列表，必填 |
| `temperature` | number | 采样温度，越大越发散（一般 0–2） |
| `max_tokens` | number | 限制本次回复的最大 token 数 |
| `stream` | boolean | 是否流式返回，见[流式输出](/docs/streaming) |

## 响应结构

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": { "role": "assistant", "content": "你好！有什么可以帮你的？" },
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 12, "completion_tokens": 9, "total_tokens": 21 }
}
```

生成的文本在 `choices[0].message.content`；`usage` 给出本次请求的 token 计量，用于计费。
