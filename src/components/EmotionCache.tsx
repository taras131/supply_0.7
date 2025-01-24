import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";

interface EmotionCacheProps {
    options: {
        key: string;
    };
    children: React.ReactNode;
}

export default function EmotionCache({ options, children }: EmotionCacheProps) {
    const cache = createCache(options);
    return <CacheProvider value={cache}>{children}</CacheProvider>;
}