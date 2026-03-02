/** @type {import('next').NextConfig} */
const nextConfig = {
    // ============================================
    // PRODUCTION PERFORMANCE OPTIMIZATIONS
    // ============================================

    typescript: {
        ignoreBuildErrors: true,
    },

    // ============================================
    // 1. CORE NEXT.JS OPTIMIZATIONS
    // ============================================

    // Compression (gzip/brotli at server level)
    compress: true,

    // Remove powered-by header
    poweredByHeader: false,

    // Disable source maps in production
    productionBrowserSourceMaps: false,

    // Enable strict mode during dev but allow optimization in production
    reactStrictMode: false,

    // ============================================
    // 2. IMAGE OPTIMIZATION (Critical for LCP)
    // ============================================
    images: {
        unoptimized: false,
        // Modern formats for all browsers
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.public.blob.vercel-storage.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "**.unsplash.com",
            },
        ],
        // 1-year cache for optimized images
        minimumCacheTTL: 60 * 60 * 24 * 365,
        dangerouslyAllowSVG: false,
    },

    // ============================================
    // 3. ADVANCED OPTIMIZATIONS
    // ============================================
    experimental: {
        // Tree-shake unused exports
        optimizePackageImports: [
            'lucide-react',
            'framer-motion',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-select',
            '@radix-ui/react-dialog',
            '@radix-ui/react-alert-dialog',
            'recharts',
        ],
        // Optimize CSS output
        optimizeCss: true,
        // Bundle analysis for debugging
        bundleAnalyzer: process.env.ANALYZE === 'true',
    },

    // ============================================
    // 4. CODE SPLITTING & BUNDLE OPTIMIZATION
    // ============================================
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                minimize: true,
                usedExports: true,
                sideEffects: false,
                splitChunks: {
                    chunks: 'all',
                    maxAsyncRequests: 30,
                    maxInitialRequests: 25,
                    minSize: 25000,
                    // Aggressive max size to reduce TBT
                    maxSize: 180000,
                    cacheGroups: {
                        // Heavy animation library - lazy load
                        framer: {
                            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
                            name: 'framer-motion-chunk',
                            priority: 25,
                            reuseExistingChunk: true,
                            enforce: true,
                            maxSize: 150000,
                        },
                        // Icon library - lazy load
                        lucide: {
                            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
                            name: 'lucide-chunk',
                            priority: 24,
                            reuseExistingChunk: true,
                            enforce: true,
                            maxSize: 80000,
                        },
                        // Charts library - lazy load
                        recharts: {
                            test: /[\\/]node_modules[\\/](recharts)[\\/]/,
                            name: 'recharts-chunk',
                            priority: 23,
                            reuseExistingChunk: true,
                            enforce: true,
                            maxSize: 120000,
                        },
                        // Radix UI components - split further
                        radix: {
                            test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
                            name: 'radix-ui-chunk',
                            priority: 22,
                            reuseExistingChunk: true,
                            enforce: true,
                            maxSize: 120000,
                        },
                        // React runtime
                        react: {
                            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                            name: 'react-vendor',
                            priority: 21,
                            reuseExistingChunk: true,
                            maxSize: 150000,
                        },
                        // All other vendors
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendor-libs',
                            priority: 10,
                            reuseExistingChunk: true,
                            minSize: 25000,
                            maxSize: 180000,
                        },
                    },
                },
                // Separate runtime chunk for caching
                runtimeChunk: {
                    name: 'webpack-runtime',
                },
            }
        }
        return config
    },

    // ============================================
    // 5. CACHING HEADERS (Critical for Performance)
    // ============================================
    headers: async () => [
        // All routes default caching
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=3600, stale-while-revalidate=86400'
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff'
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN'
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block'
                },
                {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin'
                },
                {
                    key: 'Permissions-Policy',
                    value: 'camera=(), microphone=(), geolocation=()'
                },
                // Enable brotli compression
                {
                    key: 'Accept-Encoding',
                    value: 'br, gzip'
                }
            ]
        },
        // Aggressive caching for images (1 year)
        {
            source: '/images/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable'
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff'
                }
            ]
        },
        // Next.js static assets forever
        {
            source: '/_next/static/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable'
                }
            ]
        },
        // Font caching (1 year)
        {
            source: '/fonts/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable'
                }
            ]
        },
        // API route caching
        {
            source: '/api/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=60, stale-while-revalidate=3600'
                }
            ]
        }
    ],

    // ============================================
    // 6. BUILD OPTIMIZATION
    // ============================================

    // Reduce on-demand entries
    onDemandEntries: {
        maxInactiveAge: 30 * 1000, // Reduced from 60s to 30s
        pagesBufferLength: 2, // Reduced from 3 to 2
    },



    // ============================================
    // 7. REDIRECTS & REWRITES FOR PERFORMANCE
    // ============================================

    rewrites: async () => ({
        beforeFiles: [],
        afterFiles: [],
        fallback: [],
    }),

    // ============================================
    // 8. VERCEL DEPLOYMENT OPTIMIZATIONS
    // ============================================

    // Optimize for Vercel deployment
    staticPageGenerationTimeout: 60,
}

export default nextConfig
