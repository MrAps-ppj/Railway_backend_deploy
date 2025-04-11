import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import {jwt} from "@elysiajs/jwt";
import { UserController } from "./controller/user";

const app = new Elysia()
.use(jwt({
    name: "jwt",
    secret: "secret",
  }))  
.use(cors())
.get("/", () => "Hello Elysia")
.post("/createuser", UserController.createUser)
.post("/signin", UserController.signin)

.listen(process.env.PORT || 3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
