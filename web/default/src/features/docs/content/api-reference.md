# 接口说明

OmniAPI 兼容 OpenAI 的 HTTP 接口规范。已有的 OpenAI SDK 或代码，通常只需替换基址与密钥即可直接使用。

## 基址（Base URL）

```text
https://omniapi.top/v1
```

基址以 `/v1` 结尾。不同 SDK 对基址的拼接方式略有差异——大多数官方 OpenAI SDK 只需填到 `https://omniapi.top/v1`，后续路径由 SDK 自动补全。

## 鉴权

所有请求通过 HTTP 头携带密钥：

```text
Authorization: Bearer sk-your-key
```

## 请求约定

- **方法**：对话 / 补全 / 向量等用 `POST`；模型列表等用 `GET`。
- **编码**：`Content-Type: application/json`。
- **模型**：在请求体 `model` 字段指定模型名。

## 常用接口

| 用途 | 路径 | 说明 |
|---|---|---|
| 对话补全 | `POST /v1/chat/completions` | 主力接口，绝大多数模型走这里 |
| 文本向量 | `POST /v1/embeddings` | 生成 Embedding |
| 图像生成 | `POST /v1/images/generations` | 文生图 |
| 模型列表 | `GET /v1/models` | 查询当前可用模型 |

> 具体可用接口以控制台展示与上游模型支持为准。
