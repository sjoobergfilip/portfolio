export default {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: "title",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96
            }
        },
        {
            name: "date",
            type: "datetime"
        },
        {
            name: "place",
            type: "string"
        },
        {
            name: "mainDescription",
            title: "Main description",
            type: "text"
        },
        {
            name: "shortDescription",
            title: "Short description",
            type: "text"
        },
        {
            name: "projectType",
            title: "Project type",
            type: "string",
            options: {
                list: [
                    { value: "Personal", title: "Personal" },
                    { value: "Client", title: "Client" },
                    { value: "School", title: "School" },
                    { value: "Work", title: "Work" },
                    { value: "Internship", title: "Internship" },
                    { value: "Design", title: "Design" }
                ]
            }
        },
        {
            name: "link",
            type: "url"
        },
        {
            name: "tags",
            type: "array",
            of: [
                {
                    type: "string"
                }
            ],
            options: {
                layout: "tags"
            }
        },
        {
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true
            }
        },
        {
            name: "imagesGallery",
            title: "Images gallery",
            type: "array",
            of: [{ type: "image" }]
        }
    ]
};
