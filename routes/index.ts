import {randomUUID} from "node:crypto";

export default defineEventHandler(() => `<h1>cryptography is amazing!</h1> ${randomUUID()}`);