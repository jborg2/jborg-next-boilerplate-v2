# Heading 1

This is a paragraph of text.

## Heading 2

This is another paragraph of text.

### Heading 3

# Heading 1.1

## Heading 2.2

```ts
export const createTOC = (node: any): TOC => {
  const headings: MarkdocHeading[] = collectMarkdocHeadings(node, []);
  console.log('/markdoc createTOC headings', headings);
  const toc: TOC = [];
  let h1Index = -1;
  let h2Index = -1;

  for (const heading of headings) {
    if (heading.level === 1) {
      toc.push({
        title: heading.title,
        slug: heading.id,
        children: [],
      });
      h1Index = toc.length - 1;
      h2Index = -1;
    } else if (heading.level === 2) {
      if (h1Index >= 0) {
        const h1Item = toc[h1Index];
        h1Item.children = [
          ...(h1Item?.children ?? []),
          {
            title: heading.title,
            slug: heading.id,
            children: [],
          },
        ];
        h2Index = h1Item.children.length - 1;
      } else {
        toc.push({
          title: heading.title,
          slug: heading.id,
          children: [],
        });
        h2Index = toc.length - 1;
      }
    } else if (heading.level === 3) {
      if (h2Index >= 0) {
        const parent = h1Index >= 0 ? toc[h1Index].children[h2Index] : toc[h2Index];
        parent.children = [
          ...(parent.children ?? []),
          {
            title: heading.title,
            slug: heading.id,
            children: [],
          },
        ];
      }
    }
  }

  console.log('/markdoc createTOC function', toc);

  return toc;
};
```

This is a list:

- Item 1
- Item 2
- Item 3

This is a numbered list:

1. First item
2. Second item
3. Third item

This is a blockquote:

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, sapien sapien bibendum sapien, vel bibendum sapien sapien vel sapien.

This is a code block:

```python
def hello_world():
    print('Hello, world!')
```

This is an inline code: `const greeting = 'Hello, world!';`

This is a horizontal rule:

---

This is a link: [Google](https://www.google.com/)

This is **bold** text.

This is *italic* text.

This is ~~strikethrough~~ text.

This is a table:

| Name | Age | Gender |
|------|-----|--------|
| John | 30  | Male   |
| Jane | 25  | Female |

This is a footnote[^1].

[^1]: This is a footnote.

This is a task list:

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

This is a definition list:

Term 1
: Definition 1

Term 2
: Definition 2

Term 3
: Definition 3