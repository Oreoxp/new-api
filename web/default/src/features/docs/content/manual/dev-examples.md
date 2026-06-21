# 开发者调用示例

## Node.js

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

## Python

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
