<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Docker (Postgres + App + TypeORM migrations)

1. Create a `.env` from the sample below or rely on defaults from compose.
2. Build and start everything:

```bash
docker compose up -d --build
```

This will start Postgres, run TypeORM migrations, and launch the app on port 3000.

Example `.env`:

```bash
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mini_netflix
DB_USER=postgres
DB_PASSWORD=postgres
DB_LOGGING=true
```

Useful scripts:
- `pnpm migration:create`
- `pnpm migration:generate`
- `pnpm migration:run`
- `pnpm migration:revert`

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


docker-compose exec app pnpm run migration:generate
docker-compose exec app pnpm run migration:run

🚀 Chức năng KHÔNG cần đăng nhập (guest)

Xem danh sách phim (movies, genres, movie_genres)
→ Ai cũng xem được list phim, lọc theo thể loại, rating.

Xem chi tiết phim (movies, episodes nếu là series)
→ Ai cũng xem được description, trailer/video, episodes.

Xem comment (comments)
→ Ai cũng đọc được bình luận của user khác (chỉ không post được).

👤 Chức năng User (đã đăng nhập)

Comment phim (comments)
→ Thêm comment với user_id.

Yêu thích phim (favorites)
→ Thêm / xóa phim khỏi danh sách favorite của mình.

Quản lý tài khoản cá nhân (users)
→ Đăng ký, đăng nhập, đổi mật khẩu.

👑 Chức năng Admin

Upload phim mới (movies)
→ Thêm mới, update, soft delete (deleted_at).

Quản lý episode (episodes)
→ Thêm tập mới, sửa, xóa.

Quản lý user (users)
→ Ban / unblock, soft delete (deleted_at).

Quản lý comment (comments)
→ Xóa comment không phù hợp.

✅ Tóm lại:

Guest: chỉ được xem phim + xem comment.

User: ngoài xem phim, còn comment + yêu thích.

Admin: full quyền quản lý content + user.

## API Documentation (Postman Guide)

### Base URL and Headers

- Base URL: `http://localhost:3000`
- Default headers for JSON requests:

```http
Content-Type: application/json
```

- Authorization for protected endpoints:

```http
Authorization: Bearer <accessToken>
```

Access tokens are cached in Redis. If 401 Invalid/Expired token, call refresh to get a new access token, then retry.

### Auth

- POST `auth/login` (Public)
  - Body:

```json
{ "username": "user1", "password": "secret" }
```

  - Response:

```json
{ "accessToken": "...", "refreshToken": "..." }
```

- POST `auth/refresh` (Public)
  - Body:

```json
{ "refreshToken": "..." }
```

  - Response: same as login

- POST `auth/admin/login` (Public)
  - Body:

```json
{ "username": "admin1", "password": "secret" }
```

  - Response: tokens

- POST `auth/admin/refresh` (Public)
  - Body `{ "refreshToken": "..." }`, response tokens

- POST `auth/logout` (Protected)
  - Response:

```json
{ "success": true }
```

### Movies

- GET `movies` (Public) — List with filters and pagination
  - Query params (optional): `genreId`, `ratingMin`, `ratingMax`, `q`, `page`, `limit`
  - Response: array of movies

- GET `movies/:id` (Public) — Movie detail (includes genres, episodes)
  - Response example:

```json
{
  "movieId": 1,
  "title": "Example",
  "description": "...",
  "releaseDate": "2024-01-01",
  "duration": 120,
  "rating": 8.5,
  "posterUrl": null,
  "videoUrl": null,
  "uploadedBy": "<adminId>",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-02T00:00:00.000Z",
  "genres": [{ "genreId": 1, "name": "Action" }],
  "episodes": [{ "episodeId": 10, "title": "Ep 1", "episodeNo": 1, "duration": 45, "videoUrl": null }]
}
```

- POST `movies` (Admin)
  - Headers: Authorization Bearer admin access token
  - Body:

```json
{
  "title": "New Movie",
  "description": "...",
  "releaseDate": "2025-01-01",
  "duration": 100,
  "rating": 7.2,
  "posterUrl": "...",
  "videoUrl": "...",
  "genreIds": [1, 2]
}
```

- PATCH `movies/:id` (Admin) — Body like POST but all fields optional

- DELETE `movies/:id` (Admin) — Soft delete

### Genres

- GET `genres` (Public)
- POST `genres` (Admin)
  - Body: `{ "name": "Action" }`
- PATCH `genres/:id` (Admin)
  - Body: `{ "name": "Adventure" }`

### Comments

- GET `comments/movie/:movieId` (Public) — List comments for a movie
  - Response example:

```json
[
  {
    "commentId": "uuid",
    "content": "Great movie!",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "user": { "userId": "uuid", "username": "user1" }
  }
]
```

- POST `comments` (User)
  - Headers: Authorization Bearer user access token
  - Body:

```json
{ "movieId": 1, "content": "Great movie!" }
```

- DELETE `comments/:id` (Owner or Admin)

### Episodes (Admin)

- POST `episodes`
  - Body:

```json
{ "movieId": 1, "title": "Episode 1", "videoUrl": null, "duration": 45, "episodeNo": 1 }
```

- PATCH `episodes/:id` — Body fields optional
- DELETE `episodes/:id`

### Favorites (User)

- GET `favorites/me`
- POST `favorites/:movieId`
- DELETE `favorites/:movieId`

### Users

- POST `users`
  - Body:

```json
{ "username": "user1", "email": "user1@example.com", "password": "secret" }
```

- GET `users`
- GET `users/:id`
- PATCH `users/:id`
  - Body (any subset): `{ "email": "new@example.com", "password": "newpass" }`
- DELETE `users/:id` (soft delete)

Note: All user endpoints are protected by the global auth guard. If you want public self-registration, mark `@Public()` on `POST /users` in `UsersController`.

### Admins (Admin)

- POST `admins` — Create admin `{ "username": "admin2", "password": "secret", "role": "admin" }`
- GET `admins`
- GET `admins/:id`
- PATCH `admins/:id` — Update password/role
- DELETE `admins/:id` (soft delete)

### Common error responses

- 400 Bad Request — Invalid payload
- 401 Unauthorized — Missing/invalid/expired access token (call refresh)
- 403 Forbidden — Not enough permissions (requires admin or owner)
- 404 Not Found — Resource not found

### Postman Quick Start

1) Login to get tokens

```http
POST {{baseUrl}}/auth/login
Content-Type: application/json

{ "username": "user1", "password": "secret" }
```

Save `accessToken` and `refreshToken` to Postman variables.

2) Call a protected endpoint

```http
GET {{baseUrl}}/favorites/me
Authorization: Bearer {{accessToken}}
```

3) If 401, refresh token

```http
POST {{baseUrl}}/auth/refresh
Content-Type: application/json

{ "refreshToken": "{{refreshToken}}" }
```

Update `accessToken` with the new value and retry.