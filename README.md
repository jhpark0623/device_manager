# create-next-app

next.js typescript 프로젝트 생성

```
> npx create-next-app <폴더명> --typescript
```

# tailwind css 적용

1. Next.js tailwind css 설치
   [Next.js tailwind css 설치 링크](https://tailwindcss.com/docs/guides/nextjs)

   ```
   > npm install -D tailwindcss postcss autoprefixer
   > npx tailwindcss init -p
   ```

2. tailwind.config.js파일의 content부분에 입력

   ```
   module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
   }
   ```

3. 최상위 CSS파일(./styles/globals.css)에 입력

   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   tailwind CSS 관련 VSCODE 확장프로그램

   > tailwind CSS IntelliSense - tailwind CSS 자동완성 프로그램

---

## npm, npx

    npm: 패키지 설치 명령어
    npx: 패키지 실행 명령어

# prisma

database ORM 이다.

1. VSCODE `prisma` 확장프로그램 설치 (자동완성, Prettier)

   오른쪽 아래 종모양 눌러 적용시켜야함

2. `prisma` 패키지 설치

   ```
   > npm i prisma -D
   > npx prisma init
   ```

   `/prisma/schema.prisma` 파일 자동 생성

   `.env` 파일 자동 생성

   `.gitignore` 파일에 `.env` 추가

3. prisma 초기 설정

   .env 파일 설정

   ```
   // .env

   DATABASE_URL = "자신의 데이터베이스 주소"
   ```

   prisma/schema.prisma 파일 설정

   ```
   // prisma/schema.prisma

   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     // postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb
     provider = "mongodb"      // 사용할 데이터베이스 지정
     url      = env("DATABASE_URL")
   }
   ```

4. 데이터베이스에 스키마 업로드

   ```
   // prisma/schema.prisma

   model 스키마이름{ // 스키마이름은 첫글자 대문자
      ...
      name   String   @default("")
      열이름  타입     기본값
   }
   ```

   ```
   > npx prisma db push
   ```

5. prisma studio 실행 (데이터베이스 웹 클라이언트)

   ```
   > npx prisma studio
   ```

6. `prisma` client 설정
   ```
   > npm prisma generate
   ```

# prisma 추가 방법

클라이언트에서는 접근할 수 없고 서버에서만 가능

```
const user = await client.스키마이름.create({
      data: { ... },
    });
```

# 관련 자료

[prisma CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

# fatch를 이용하여 패칭

```
fetch("/api/alluser")               //
.then((res) => res.json())          //
.then((json) => console.log(json)); //
```

## @ts-ignore

타입스크립트를 잠시 우회하는 방법
// @ts-ignore(주석으로 사용해야함) \*필요할때도 쓰지 말자
