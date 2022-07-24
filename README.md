# RedWoodJs
`2022/07/20`  
RedWoodJs Doc : https://redwoodjs.com

## based on
- React
- GraphQL
- Prisma
- TypeScript
- Jest
- Storybook

## setup & installation
1. install
    ```shell
    yarn create redwood-app --ts .
    ```
2. start up
    ```shell
    yarn rw dev
    ```
＊ **for Docker Optional**
- redwood.toml
    ```toml
    [web]
      title = "Redwood App"
  +   host = "0.0.0.0"
      port = 8910
  -   apiUrl = "/.redwood/functions"
  +   apiUrl = "http://localhost:8911"
      includeEnvironmentVariables = []
    [api]
  +   host = "0.0.0.0"
      port = 8911
    [browser]
      open = true
    ```
- api/src/functions/graphql.ts
    ```ts
    export const handler = createGraphQLHandler({
      loggerConfig: { logger, options: {} },
      directives,
      sdls,
      services,
  +  cors: {
  +      origin: "http://localhost:8910"
  +  },
      onException: () => {
          db.$disconnect()
      },
    })
    ```

## development
1. **page**
   1. add new
        ```sh
        yarn rw generate page [name] [...dir]
        ```
2. **layout**
   1. add new
        ```sh
        yarn redwood g layout [name]
        ```
    2. set  
        `web/src/Routes.tsx`
        ```tsx
        import { Router, Route, Set } from '@redwoodjs/router'
        import BlogLayout from 'src/layouts/BlogLayout/BlogLayout'

        const Routes = () => {
            return (
                <Router>
                <Set wrap={BlogLayout}>
                    <Route path="/home" page={HomePage} name="home" />
                </Set>
                <Route notfound page={NotFoundPage} />
                </Router>
            )
        }
        ```
3. **Database**
    1. create table  
   `api/db/schema.prisma`
        ```prisma
        model Post {
            id        Int      @id @default(autoincrement())
            title     String
            body      String
            createdAt DateTime @default(now())
        }
        ```

        ```sh
        yarn rw prisma migrate dev
        ```
    2. CRUD on browser `Prisma studio`
        ```sh
        yarn rw prisma studio
          or
        npx prisma studio --schema ./api/db/schema.prisma -n 0.0.0.0
        ```
        ＊ default port on `5555`
    3. scaffold CRUD editor
        ```sh
        yarn rw g scaffold post
        ```
    4. create an SDL & Service
        ```sh
        yarn rw g sdl Contact[model名]
        ```
    5. table relation  
    `api/db/schema.prisma`
        ```prisma
        model Post {
            id        Int      @id @default(autoincrement())
            title     String
            body      String
            createdAt DateTime @default(now())
        }

        model Comment {
            id        Int      @id @default(autoincrement())
            name      String
            body      String
            post      Post     @relation(fields: [postId], references: [id])
            postId    Int
            createdAt DateTime @default(now())
        }
        ```
        ![post_comment-er](./docs/post-comment_table.svg)

4. **Cells**
    1. generate new cell
        ```sh
        yarn rw g cell Articles[Cell名]
        ```
5. **Components**
    1. generate new component
        ```sh
        yarn rw g component Article[component名]
        ```
6. **API**
    1. test on browser  
    `http://localhost:8911/graphql`
    1. generate all types
        ```sh
        yarn rw generate types
        ```
    2. create sdk & services
        ```sh
        yarn rw g sdl Comment --no-crud
        ```
7. **Authentication**
    1. setup
        ```sh
        yarn rw setup auth dbAuth
        ```
    2. create User model (example)  
        `api/db/schema.prisma`
        ```prisma
        model User {
          id                  Int       @id @default(autoincrement())
          name                String?
          email               String    @unique
          hashedPassword      String
          salt                String
          resetToken          String?
          resetTokenExpiresAt DateTime?
        }
        ```

        ```sh
        yarn rw prisma migrate dev
        ```
    3. generate **login** page
        ```sh
        yarn rw g dbAuth
        ```
    4. cookie set origin  
        `api/src/functions/auth.ts`
        ```ts
        const authHandler = new DbAuthHandler(event, context, {
            ~~~
            cookie: {
              HttpOnly: true,
              Path: '/',
              SameSite: 'Strict',
              Secure: process.env.NODE_ENV !== 'development',
            },
          + cors: {
          +   origin: 'http://localhost:8910',
          +   credentials: true,
          + },
            ~~~
        })
        ```
    5. **Optional** regenerate _SESSION_SECRET_
        ```sh
        yarn rw g secret
        ```

8. **Styling**  
`tailwindcss`
    ```sh
    yarn rw setup ui tailwindcss
    ```

9. **Storybook**
    1. setup
        ```sh
        yarn rw storybook
        ```
        ＊ default port on `7910`
    2. develop on console
        ```sh
        yarn rw console
        ```
