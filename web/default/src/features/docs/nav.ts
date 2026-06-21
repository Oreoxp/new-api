/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
/**
 * Documentation structure. Each page's body is a Markdown file under
 * `./content/*.md` (imported as a raw string via the rspack asset/source rule).
 * The 手动接入 (manual integration) section is split into one short page per
 * tool — keeps each page short so the sidebar never needs long scrolling.
 * To add or edit a page, edit the `.md` file and register it here.
 */
import apiReference from './content/api-reference.md'
import chatCompletions from './content/chat-completions.md'
import errors from './content/errors.md'
import faq from './content/faq.md'
import introduction from './content/introduction.md'
import claudeCli from './content/manual/claude-code-cli.md'
import claudeLinux from './content/manual/claude-code-linux.md'
import claudeMac from './content/manual/claude-code-mac.md'
import claudeWindows from './content/manual/claude-code-windows.md'
import chatbox from './content/manual/chatbox.md'
import codexMac from './content/manual/codex-mac.md'
import codexWindows from './content/manual/codex-windows.md'
import createKey from './content/manual/create-key.md'
import devExamples from './content/manual/dev-examples.md'
import generalConfig from './content/manual/general-config.md'
import models from './content/models.md'
import quickStart from './content/quick-start.md'
import streaming from './content/streaming.md'

export type DocPage = { slug: string; title: string; content: string }
export type DocSection = { title: string; pages: DocPage[] }

export const DOC_SECTIONS: DocSection[] = [
  {
    title: '开始',
    pages: [
      { slug: 'introduction', title: '介绍', content: introduction },
      { slug: 'quick-start', title: '快速开始', content: quickStart },
    ],
  },
  {
    title: '使用',
    pages: [
      { slug: 'api-reference', title: '接口说明', content: apiReference },
      { slug: 'chat-completions', title: '对话补全', content: chatCompletions },
      { slug: 'streaming', title: '流式输出', content: streaming },
    ],
  },
  {
    title: '手动接入',
    pages: [
      { slug: 'create-key', title: '创建令牌', content: createKey },
      { slug: 'general-config', title: '通用配置', content: generalConfig },
      { slug: 'claude-code-cli', title: 'Claude Code CLI', content: claudeCli },
      {
        slug: 'claude-code-windows',
        title: 'Claude Code · Windows',
        content: claudeWindows,
      },
      { slug: 'claude-code-mac', title: 'Claude Code · Mac', content: claudeMac },
      {
        slug: 'claude-code-linux',
        title: 'Claude Code · Linux',
        content: claudeLinux,
      },
      { slug: 'codex-windows', title: 'Codex · Windows', content: codexWindows },
      { slug: 'codex-mac', title: 'Codex · Mac', content: codexMac },
      { slug: 'chatbox', title: 'ChatBox 与插件', content: chatbox },
      { slug: 'dev-examples', title: '开发者示例', content: devExamples },
    ],
  },
  {
    title: '参考',
    pages: [
      { slug: 'models', title: '模型与计费', content: models },
      { slug: 'faq', title: '常见问题', content: faq },
      { slug: 'errors', title: '错误码', content: errors },
    ],
  },
]

export const DOC_PAGES: DocPage[] = DOC_SECTIONS.flatMap((s) => s.pages)
export const DEFAULT_DOC_SLUG = DOC_PAGES[0].slug

export function findDocPage(slug: string | undefined): DocPage {
  return DOC_PAGES.find((p) => p.slug === slug) ?? DOC_PAGES[0]
}

export function getAdjacentDocs(slug: string): {
  prev?: DocPage
  next?: DocPage
} {
  const index = DOC_PAGES.findIndex((p) => p.slug === slug)
  if (index < 0) return {}
  return { prev: DOC_PAGES[index - 1], next: DOC_PAGES[index + 1] }
}
