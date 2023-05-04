import { FC } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { ClipboardIcon } from '@radix-ui/react-icons';
import { toast } from 'react-hot-toast';
import { copyToClipboard } from '@/lib/utils';
import { cn } from '@/lib/utils';

type CodeProps = {
  code: string;
  language: Language;
  className?: string;
};

export const Code: FC<CodeProps> = ({ code, language, className }) => {
  return (
    <div className={cn(
      className,
      // 'bg-neutral-900'
    )}>
      <Highlight {...defaultProps} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className}`} style={style}>
            {tokens.map((line, i) => (
              <div key={`code-line-${i}`} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span
                    key={`code-line-${i}-${key}`}
                    {...getTokenProps({ token, key })}
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export const CodePanel: FC<CodeProps> = ({ code, language, className }) => {
  return (
    <div className="not-prose relative my-6 w-full rounded-lg border border-gray-700 p-4 text-sm bg-gray-900">
      <div className="overflow-x-auto">
        <Code language={language} code={code} className={className} />
      </div>
      <div
        className="absolute right-[12px] top-[12px] cursor-pointer rounded p-2 backdrop-blur transition hover:ring-2 ring-gray-500"
        onClick={() => {
          copyToClipboard(code);
          toast.success('Copied!');
        }}
      >
        <ClipboardIcon className="h-4 w-4 text-neutral-500" />
      </div>
    </div>
  );
};
