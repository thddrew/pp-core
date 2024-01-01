import { defineType } from "sanity";

export default defineType({
  name: "core",
  type: "document",
  title: "Core",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
  ],
});
