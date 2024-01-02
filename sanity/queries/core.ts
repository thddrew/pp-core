import { client } from "../lib/client";
import core from "../schemas/core";
import { type Core } from "../types/schemas";

const query = `*[_type == "${core.name}"]`;

export const getCore = async () => client.fetch<Core[]>(query);
