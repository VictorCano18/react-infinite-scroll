import { useInfiniteQuery } from "react-query";

export const useCombinedData = () => {
    return useInfiniteQuery(
        'combinedData',
        async ({ pageParam = 1 }) => {
            try {
                const [userResponse, catFactsResponse] = await Promise.all([
                    fetch(`https://randomuser.me/api?results=10&page=${pageParam}`),
                    fetch(`https://catfact.ninja/facts?page=${pageParam}`)
                ]);

                const userResults = await userResponse.json();
                const catFacts = await catFactsResponse.json();

                if (userResults.error || catFacts.error) {
                    throw new Error('Error fetching data');
                }

                // This variable store the users and facts results to be handled 
                // in Card component
                const mergedResults = userResults.results.map((user, idx) => ({
                    ...user,
                    ...catFacts.data[idx]
                }));

                // hasNextPage is based on the https://catfact.ninja/facts API
                // due the users API does not provide the last page info.
                const hasNextPage = catFacts.current_page < catFacts.last_page;

                return {
                    results: mergedResults,
                    hasNextPage,
                    page: pageParam
                };
            } catch (error) {
                throw new Error(error.message || 'Error fetching data');
            }
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.hasNextPage ? (lastPage.page + 1) : undefined;
            },
            keepPreviousData: true
        }
    );
};
