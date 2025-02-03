import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({ label: 'Published At' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        author: fields.object({
          name: fields.text({ label: 'Name' }),
          avatar: fields.image({ label: 'Avatar', directory: 'public/images/authors' }),
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts',
          validation: { isRequired: true },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          validation: { length: { min: 50, max: 200 } },
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { 
            label: 'Tags',
            itemLabel: props => props.value,
          }
        ),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),
      },
    }),
  },
});