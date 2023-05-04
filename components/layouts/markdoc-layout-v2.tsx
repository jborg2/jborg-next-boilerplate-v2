// Adapted from: https://github.com/tailwindlabs/tailwindcss.com/blob/master/src/layouts/ContentsLayout.js

import React, {
  useState,
  useEffect,
  createContext,
  Fragment,
  useCallback,
  ReactNode,
  FC,
} from 'react';
import { cn } from '@/lib/utils';
import Markdoc, {
  Config,
  Node,
  RenderableTreeNode,
  SchemaAttribute,
  Tag,
} from '@markdoc/markdoc';
import { CodePanel } from '@/components/markprompt-ui/Code';
import { Heading } from '@/components/markprompt-ui/Heading';
import { Note } from '@/components/markprompt-ui/Note';
import { Language } from 'prism-react-renderer';
// import { Playground } from '@/components/markprompt-ui/Playground';
import { Collapse, CollapseGroup } from '@/components/markprompt-ui/Collapse';

import Layout from '@/components/layouts/landing-page-layout';
import { docsConfig } from '@/config/docs';
import { DocsSidebarNav } from '../shadcn-ui/sidebar-nav';

export const MarkdocContext = createContext<any>(undefined);

type MarkdocCodeFenceProps = {
  children: ReactNode;
  language: Language;
};

// !!! IF THIS THROWS CANNOT READ CONTEXT IN HEADING COMPONENT, GO TO THAT COMPONENT AND MAKE SURE TO IMPORT THE CONTEXT FROM THIS FILE

type MarkdocHeading = { title: string; id: string; level: number };

const collectMarkdocHeadings = (
  node: any,
  sections: MarkdocHeading[] = [],
): MarkdocHeading[] => {
  if (!node) {
    return sections;
  }

  if (node.name === 'Heading') {
    const title = node.children[0];

    if (typeof title === 'string') {
      sections.push({ ...node.attributes, title });
    }
  }

  for (const child of node.children || []) {
    collectMarkdocHeadings(child, sections);
  }

  return sections;
};

// This is the function that creates the table of contents from headings
// Right now its only for h2 and h3
export const createTOC = (node: any): TOC => {
  const headings = collectMarkdocHeadings(node, []);

  const toc: TOC = [];
  let h2Index = 0;
  for (const heading of headings) {
    if (heading.level === 2) {
      toc.push({
        title: heading.title,
        slug: heading.id,
        children: [],
      });
      h2Index = toc.length - 1;
    } else if (heading.level === 3) {
      toc[h2Index] = {
        ...toc[h2Index],
        children: [
          ...(toc[h2Index]?.children || []),
          {
            title: heading.title,
            slug: heading.id,
            children: [],
          },
        ],
      };
    }
  }

  return toc;
};

const generateID = (
  children: RenderableTreeNode[],
  attributes: { [key: string]: SchemaAttribute },
) => {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

export const headingNode = {
  render: 'Heading',
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateID(children, attributes);

    return new Tag(
      this.render,
      { ...attributes, id, level: node.attributes['level'] },
      children,
    );
  },
};

export const fenceNode = {
  render: 'Fence',
  attributes: {
    language: {
      type: String,
    },
  },
};

export const noteTag = {
  render: 'Note',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'info',
      matches: ['info', 'warning', 'error'],
    },
  },
};

export const collapseGroupTag = {
  render: 'CollapseGroup',
  children: ['paragraph', 'tag', 'list'],
};

export const collapseTag = {
  render: 'Collapse',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
    },
  },
};

// export const playgroundTag = {
//   render: 'Playground',
// };

const Fence = (props: MarkdocCodeFenceProps) => {
  const { children, language } = props;

  let code = '';
  if (!children) {
    code = '';
  } else if (typeof children === 'string') {
    code = children.trim();
  } else if (Array.isArray(children)) {
    code = children.join('\\n').trim();
  }

  return <CodePanel code={code} language={language} />;
};

// export const DocsPlayground = () => {
//   const [promptOpen, setPromptOpen] = useState(false);

//   return (
//     <div className="relative mt-8 mb-12 flex h-[500px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600">
//       <button
//         onClick={() => setPromptOpen(true)}
//         className="cursor-pointer rounded-lg bg-black/50 px-3 py-2 text-sm font-medium text-white transition hover:bg-black/60"
//       >
//         Open chat
//       </button>
//       {promptOpen && (
//         <div
//           className="absolute inset-0 z-0"
//           onClick={() => {
//             setPromptOpen(false);
//           }}
//         />
//       )}
//       <div
//         className={cn(
//           'absolute inset-16 rounded-xl border border-dashed bg-neutral-1000 px-8 py-4 opacity-0 dark:border-neutral-800',
//           {
//             'animate-prompt-window': promptOpen,
//             'pointer-events-none': !promptOpen,
//           },
//         )}
//       >
//         <Playground
//           forceUseProdAPI
//           projectKey={
//             process.env.NODE_ENV === 'production'
//               ? process.env.NEXT_PUBLIC_MARKPROMPT_WEBSITE_DOCS_PROJECT_KEY
//               : process.env.NEXT_PUBLIC_MARKPROMPT_WEBSITE_DOCS_PROJECT_KEY_TEST
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export const DocsSearch = () => {
//   const [promptOpen, setPromptOpen] = useState(false);

//   return (
//     <Popover.Root open={promptOpen} onOpenChange={setPromptOpen}>
//       <Popover.Trigger asChild>
//         <button
//           className="flex w-full transform flex-row items-center gap-2 rounded-md border border-neutral-900 p-2 text-left text-sm text-neutral-500 outline-none transition duration-300 hover:bg-neutral-1000"
//           aria-label="Ask docs"
//         >
//           <MagnifyingGlassIcon className="h-4 w-4 flex-none text-neutral-500" />
//           <div className="flex-grow truncate">Ask docs...</div>
//         </button>
//       </Popover.Trigger>
//       <Popover.Portal>
//         <Popover.Content className="animate-chat-window z-20 mr-4 mb-4 w-[calc(100vw-32px)] sm:w-full">
//           <div className="relative mt-4 h-[calc(100vh-240px)] max-h-[560px] w-full overflow-hidden rounded-lg border border-neutral-900 bg-neutral-1000 p-4 shadow-2xl sm:w-[400px]">
//             <Playground
//               forceUseProdAPI
//               projectKey={
//                 process.env.NODE_ENV === 'production'
//                   ? process.env.NEXT_PUBLIC_MARKPROMPT_WEBSITE_DOCS_PROJECT_KEY
//                   : process.env
//                       .NEXT_PUBLIC_MARKPROMPT_WEBSITE_DOCS_PROJECT_KEY_TEST
//               }
//             />
//             <Popover.Close
//               className="absolute top-3 right-3 z-20 rounded p-1 outline-none backdrop-blur transition hover:bg-neutral-900"
//               aria-label="Close"
//             >
//               <Cross2Icon className="h-4 w-4 text-neutral-300" />
//             </Popover.Close>
//           </div>
//         </Popover.Content>
//       </Popover.Portal>
//     </Popover.Root>
//   );
// };

type TableOfContentsProps = {
  toc: TOC;
  currentSection: string;
};

const TableOfContents: FC<TableOfContentsProps> = ({ toc, currentSection }) => {
  const isActive = (section: any) => {
    if (section.slug === currentSection) {
      return true;
    }
    if (!section.children) {
      return false;
    }
    return section.children.findIndex(isActive) > -1;
  };

  let pageHasSubsections = toc.some(
    (section: any) => section.children.length > 0,
  );

  return (
    <>
      <ul className="text-sm leading-6 text-neutral-500">
        {toc.map((section) => {
          const _isActive = isActive(section);
          return (
            <Fragment key={section.slug}>
              <li>
                <a
                  href={`#${section.slug}`}
                  className={cn('block py-1', {
                    'text-neutral-300': _isActive,
                    'hover:text-neutral-300': !_isActive,
                  })}
                >
                  {section.title}
                </a>
              </li>
              {section.children?.map((subsection) => {
                const _isActive = isActive(subsection);
                return (
                  <li className="ml-4" key={subsection.slug}>
                    <a
                      href={`#${subsection.slug}`}
                      className={cn('group flex items-start py-1', {
                        'text-neutral-300': _isActive,
                        'dark:hover:text-slate-300': !_isActive,
                      })}
                    >
                      {subsection.title}
                    </a>
                  </li>
                );
              })}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};

type ContentHeading = {
  id: string;
  top: number;
  level: number;
};

export type TOCEntry = { title: string; slug: string; children?: TOC };
export type TOC = TOCEntry[];

const useTableOfContents = (toc: TOC) => {
  let [currentSection, setCurrentSection] = useState(toc[0]?.slug);
  let [headings, setHeadings] = useState<ContentHeading[]>([]);

  const registerHeading = useCallback(
    (id: string, top: number, level: number) => {
      setHeadings((headings: any[]) => [
        ...headings.filter((h) => id !== h.id),
        { id, top, level },
      ]);
    },
    [],
  );

  const unregisterHeading = useCallback((id: string) => {
    setHeadings((headings) => headings.filter((h) => id !== h.id));
  }, []);

  useEffect(() => {
    if (toc.length === 0 || headings.length === 0) {
      return;
    }

    const onScroll = () => {
      const style: any = window.getComputedStyle(document.documentElement);
      let scrollMt = parseFloat(
        style.getPropertyValue('--scroll-margin-top').match(/[\d.]+/)?.[0] ?? 0,
      );
      const sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top);
      const top = window.pageYOffset + scrollMt + 1;
      let current = sortedHeadings[0].id;
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (
          top >= sortedHeadings[i].top &&
          (sortedHeadings[i].level === 2 || sortedHeadings[i].level === 3)
        ) {
          current = sortedHeadings[i].id;
        }
      }
      setCurrentSection(current);
    };

    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll, {
        capture: true,
        // passive: true,
      });
    };
  }, [headings, toc]);

  return { currentSection, registerHeading, unregisterHeading };
};

type MarkdocLayoutProps = {
  content: RenderableTreeNode;
  toc: TOC;
};


export const MarkdocLayout: FC<MarkdocLayoutProps> = ({
  content,
  toc,
}: any) => {
  const { currentSection, registerHeading, unregisterHeading } =
    useTableOfContents(toc);

  return (
    <>
      <Layout
        fadein={true}
      >
        <MarkdocContext.Provider value={{ registerHeading, unregisterHeading }}>
          <div className="relative flex flex-row">
            <div className="w-[400px] overflow-y-auto px-6 pb-10 sm:px-8 md:block">
              <div className="mt-[26px] flex flex-col gap-1 pb-12 ml-8">
                <DocsSidebarNav items={docsConfig.sidebarNav} />
              </div>
            </div>
            <div className="relative w-full max-w-full overflow-hidden">
              <div className={cn(
                "prose dark:prose-invert",
                "max-w-full pt-16 pb-16",
                "prose-h1:mt-12",
                "prose-code:rounded",
                "prose-code:border",
                "prose-code:px-1",
                "prose-code:py-0.5",
                "dark:prose-code:text-neutral-300",
                "prose-code:text-neutral-200",
                "prose-code:border-gray-700",
                "dark:prose-code:bg-neutral-900",
                "prose-code:bg-gray-900",
                "prose-code:font-normal",
                "sm:max-w-screen-md md:px-8",
                // ! Original
                // "prose-headings:text-neutral-300 prose-h1:mt-12 prose-p:text-neutral-400 prose-a:text-neutral-400 prose-strong:text-neutral-300 prose-code:rounded prose-code:border prose-code:border-neutral-900 prose-code:bg-neutral-1000 prose-code:px-1 prose-code:py-0.5 prose-code:text-neutral-400 prose-li:text-neutral-400 prose-thead:border-neutral-800 prose-tr:border-neutral-900",
              )}>
                {Markdoc.renderers.react(content, React, {
                  components: {
                    Collapse,
                    CollapseGroup,
                    Fence,
                    Heading,
                    Note,
                    // Playground: DocsPlayground,
                  },
                })}
              </div>
              <div className="fixed inset-0 top-24 right-[max(0px,calc(50%-40rem))] left-auto z-20 hidden lg:w-48 overflow-y-auto px-6 pb-10 sm:px-8 lg:block">
                <div className="mt-[26px] flex flex-col gap-1 pb-12">
                  {/* <div className="mb-4 w-full">
                  search goes here
                </div> */}
                  <TableOfContents toc={toc} currentSection={currentSection} />
                </div>
              </div>
            </div>
          </div>
        </MarkdocContext.Provider>
      </Layout>
    </>
  );
};
