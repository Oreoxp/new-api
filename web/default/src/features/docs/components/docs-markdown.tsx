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
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

/**
 * Renders a docs Markdown string. Styling comes from the `.om-doc-content`
 * wrapper (src/styles/docs.css) — the app does not ship the Tailwind typography
 * plugin, so prose is styled explicitly there. Internal links (starting with
 * `/`) stay in the same tab; external links open in a new tab.
 */
export function DocsMarkdown(props: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ node, href, ...rest }) => {
          const url = typeof href === 'string' ? href : ''
          if (url.startsWith('/')) {
            return <a href={url} {...rest} />
          }
          return (
            <a href={url} target='_blank' rel='noopener noreferrer' {...rest} />
          )
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  )
}
