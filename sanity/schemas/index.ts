import { type SchemaTypeDefinition } from "sanity";

import Core from "./core";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Core],
};

// Note: Default export types so sanity-codegen can pick it up
export default schema.types;
