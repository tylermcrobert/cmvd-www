export default {
  type: "document",
  name: "project",
  fields: [
    {
      type: "string",
      name: "title",
    },

    {
      name: "location",
      type: "string",
      description: '"Austin, Texas" For example',
    },

    {
      title: "Project Year",
      name: "year",
      type: "string",
    },

    {
      title: "Project Roles / Deliverables",
      name: "roles",
      type: "array",
      of: [{ type: "string" }],
    },

    {
      title: "Project Images",
      name: "images",
      type: "array",
      options: { layout: "grid" },
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
};
