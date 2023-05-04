import { FC } from 'react';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Markdoc from '@markdoc/markdoc';
import {
    collapseGroupTag,
    collapseTag,
    createTOC,
    fenceNode,
    headingNode,
    MarkdocLayout,
    noteTag,
    // playgroundTag,
} from '@/components/layouts/markdoc-layout-v2';
import { SharedHead } from '@/components/markprompt-ui/SharedHead';
import fs from 'fs';
import path from 'path';
import { getAllContentFilePaths } from '../../lib/content';


export const getStaticProps: GetStaticProps = async (context) => {
    const filePath = path.join(process.cwd(), 'content', ...(context.params?.slug as string[])) + '.md';

    if (!fs.existsSync(filePath)) {
        return {
            notFound: true,
        };
    }

    console.log('filePath', filePath)

    const rawText = fs.readFileSync(filePath, 'utf8');

    const ast = Markdoc.parse(rawText);
    const config = {
        nodes: {
            fence: fenceNode,
            heading: headingNode,
        },
        tags: {
            // playground: playgroundTag,
            note: noteTag,
            collapsegroup: collapseGroupTag,
            collapse: collapseTag,
        },
    };

    const content = Markdoc.transform(ast, config);
    const toc = createTOC(content);
    console.log('/docs/index after create TOC', toc);

    if (!content) {
        return {
            notFound: true,
        };
    }

    return {
        props: { content: JSON.stringify(content), toc },
        revalidate: 60,
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllContentFilePaths().map((filePath) => {
        const slug = filePath
            .replace(/\.md$/, '')
            .split('/')
            .slice(1);
        return {
            params: { slug },
        };
    });

    return {
        paths,
        fallback: true,
    };
};


const DocsPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
    content,
    toc,
}) => {
    // console.log('content before parsing', content)
    return (
        <>
            <SharedHead
                title="Jborg Next.js Boilerplate | The ultimate Saas starter template."
            />
            {/* <MarkdocLayout content={JSON.parse(content)} toc={toc} /> */}
            {content && <MarkdocLayout content={JSON.parse(content)} toc={toc} />}
        </>
    );
};

export default DocsPage;