import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Route, Router } from 'wouter-hono'

const app = new Hono()

app.get(
  '/*',
  jsxRenderer(({ children}) => {
    return (
      <html>
        <head>
        </head>
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    )
  }))

app.get("/*", (c) => {
  console.log(c.req.path)

  return c.render(
  <Router ssrPath={c.req.path}>
   <Route path='/hello'>hello</Route>
   <Route path='/test'>Test</Route>
  </Router>
)})

const port = 1337
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
