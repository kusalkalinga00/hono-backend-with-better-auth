import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { todos, user, session, account } from "@/db/schema";


export type Todo = InferSelectModel<typeof todos>;