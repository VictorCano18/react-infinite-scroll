import { useMemo, useCallback, useRef } from "react";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useCombinedData } from "../hooks/useCombinedData";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { Alert } from "../components/ui/alert";

const Home = () => {
    const { data, isLoading, error, fetchNextPage, hasNextPage } = useCombinedData();
    const lastElementRef = useInfiniteScroll(fetchNextPage, isLoading, hasNextPage);

    // useMemo to optimize performance and avoid re-renders because we are using 2 API's
    const renderedContent = useMemo(() => {
        if (isLoading) {
            // The array is of length 10 because the initial amount of cards is 10 (results=10)
            // so we want to load 10 Skeleton components
            return Array.from({ length: 10 }, (_, index) => <Skeleton key={index} />);
        }
        if (error || !data?.pages.length) {
            return <Alert error={error} />
        }

        const allResults = data.pages.flatMap(page => page.results);

        return allResults.map((user, index) => (
            <Card
                user={user}
                key={user.id.value || index}
                ref={index === allResults.length - 1 ? lastElementRef : null}
            />
        ));
        
    }, [isLoading, error, data, lastElementRef]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
            {renderedContent}
            {isLoading && <Skeleton key="fetching" />}
        </div>
    );
}

export default Home;
