/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // PRODUCTION PERFORMANCE OPTIMIZATIONS
  // ============================================
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image Optimization (Critical for LCP & Performance)
  images: {
    unoptimized: false,
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
    minimumCacheTTL: 60 * 60 * 24 * 365,
    dangerouslyAllowSVG: false,
  },

  // Compression & Security Headers
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  // Disable strict mode in production (reduces unnecessary renders)
  reactStrictMode: false,

  // SWC Minification (faster & better than Terser)
  swcMinify: true,

  // Advanced Next.js Optimizations
  experimental: {
    // Reduce bundle size by optimizing imports
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-accordion',
      '@radix-ui/react-select',
    ],
    // CSS optimization
    optimizeCss: true,
    // Experimental client bundle optimization
    optimizeClientBundles: true,
  },

  // Advanced Webpack Configuration for Code Splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          maxAsyncRequests: 25,
          maxInitialRequests: 20,
          minSize: 20000,
          maxSize: 240000,
          cacheGroups: {
            // Framer Motion (largest animation lib)
            framer: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'framer-motion',
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 200000,
            },
            // Icon library
            lucide: {
              test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
              name: 'lucide-icons',
              priority: 24,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 150000,
            },
            // Radix UI components
            radix: {
              test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
              name: 'radix-ui',
              priority: 23,
              reuseExistingChunk: true,
              enforce: true,
              maxSize: 180000,
            },
            // React runtime
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react-vendor',
              priority: 22,
              reuseExistingChunk: true,
              maxSize: 200000,
            },
            // Other vendor libs
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor-libs',
              priority: 10,
              reuseExistingChunk: true,
              minSize: 0,
              maxSize: 200000,
            },
          },
        },
        runtimeChunk: {
          name: 'runtime',
        },
      }
    }
    return config
  },

  // Cache Headers for Production (Critical for FCP & LCP)
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, stale-while-revalidate=86400, immutable'
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
    // Cache Next.js static assets forever
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    // Fonts caching
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ],

  // Reduce on-demand entries (faster builds)
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 3,
  },

  // Output tracing for serverless
  outputFileTracing: true,
}

export default nextConfig
