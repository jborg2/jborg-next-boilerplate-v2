import { useEffect, useState, RefObject, MutableRefObject } from 'react';

type RefType = HTMLElement | null | undefined;

export const useTop = (ref: RefObject<RefType> | MutableRefObject<RefType>): number | null => {
    const [top, setTop] = useState<number | null>(null);

    useEffect(() => {
        const updateTop = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const newTop = rect.top + window.pageYOffset;
                if (newTop !== top) {
                    setTop(newTop);
                }
            }
        };

        updateTop();

        window.addEventListener('scroll', updateTop);
        window.addEventListener('resize', updateTop);

        return () => {
            window.removeEventListener('scroll', updateTop);
            window.removeEventListener('resize', updateTop);
        };
    }, [ref, top]);

    return top;
};