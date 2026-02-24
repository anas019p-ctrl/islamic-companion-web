import { Skeleton } from "./skeleton";

export const SkeletonPage = () => {
    return (
        <div className="min-h-screen bg-background p-8 pt-32 space-y-12">
            {/* Header Skeleton */}
            <div className="space-y-4 text-center max-w-2xl mx-auto">
                <Skeleton className="h-12 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4 p-6 glass rounded-[2rem]">
                        <Skeleton className="h-40 w-full rounded-2xl" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SkeletonList = () => {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 glass rounded-xl">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
};
