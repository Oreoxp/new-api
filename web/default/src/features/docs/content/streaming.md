# 流式输出

在请求体中加入 `"stream": true`，服务端会以 SSE（Server-Sent Events）方式边生成边返回，适合做打字机效果，降低首字延迟。

## 开启流式

```bash
curl https://omniapi.top/v1/chat/completions \
  -H "Authorization: Bearer $OMNI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{ "role": "user", "content": "写一句鼓励的话" }],
    "stream": true
  }'
```

## 返回格式

每个增量是一行 `data:` 事件，内容在 `choices[0].delta.content`：

```text
data: {"choices":[{"delta":{"content":"加"}}]}
data: {"choices":[{"delta":{"content":"油"}}]}
data: [DONE]
```

收到 `data: [DONE]` 表示本次输出结束。

## Python 示例

```python
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "写一句鼓励的话"}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)
```

> 提示：使用流式时，请确保 HTTP 客户端不缓冲响应体，否则会一次性收到全部内容、失去流式意义。
