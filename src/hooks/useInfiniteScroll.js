import { useCallback, useRef } from "react";

export const useInfiniteScroll = (fetchNextPage, isLoading, hasNextPage) => {
    const observer = useRef();

    const lastElementRef = useCallback(node => {
        if (isLoading || !hasNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasNextPage, fetchNextPage]);

    return lastElementRef;
};