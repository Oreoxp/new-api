# 快速开始

只需三步，五分钟内跑通你的第一个请求。

## 1. 获取 API 密钥

登录控制台，进入 **API 密钥** 页面，点击「创建」生成一个密钥（形如 `sk-xxxxxxxx`）。请妥善保存——密钥只在创建时完整展示一次。

> 密钥等同于账户凭证，请勿泄露，也不要提交到公开代码仓库。

## 2. 替换模型基址

把客户端 / SDK 的 `base_url`（有的叫「接口地址 / API Host」）改为：

```text
https://omniapi.top/v1
```

其余代码无需改动——OmniAPI 完全兼容 OpenAI 的请求与响应格式。

## 3. 发送第一个请求

```bash
curl https://omniapi.top/v1/chat/completions \
  -H "Authorization: Bearer $OMNI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{ "role": "user", "content": "用一句话介绍你自己" }]
  }'
```

收到 JSON 响应即代表成功。想换模型？把 `model` 改成任意受支持的模型名即可，其它都不用动。

## 接下来

- [对话补全](/docs/chat-completions)：完整请求参数与多语言示例
- [流式输出](/docs/streaming)：边生成边返回
- [客户端接入](/docs/clients)：在常用 App 里直接配置
