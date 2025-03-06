import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from './layoutMiddleware';

const HomeView = () => import('@/views/HomeView.vue');
const ImageOptimiserView = () => import('@/modules/image-optimiser/views/ImageOptimiserView.vue');
const GridBuilder = () => import('@/modules/grid-builder/views/GridBuilder.vue');
const REMConverter = () => import('@/modules/rem-converter/views/REMConverter.vue');
const ClampCalculator = () => import('@/modules/clamp-calculator/views/ClampCalculator.vue');
const CodeMinifier = () => import('@/modules/code-minifier/views/CodeMinifier.vue');
const GradientGenerator = () => import('@/components/gradient-generator/GradientGenerator.vue');
const FontFaceGenerator = () => import('@/modules/font-face-generator/views/FontFaceGenerator.vue');
const TransformGenerator = () =>
  import('@/modules/transform-generator/views/TransformGenerator.vue');
const PerformanceReport = () => import('@/modules/performance-report/views/PerformanceReport.vue');
const CSSUtilsGenerator = () => import('@/components/css-utils-generator/CSSUtilsGenerator.vue');
const TailwindConfigGenerator = () =>
  import('@/modules/tailwind-config-generator/views/TailwindConfigGenerator.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/grid-builder',
      name: 'GridBuilder',
      component: GridBuilder,
      meta: {
        title: 'Grid Builder',
        description: 'Create layouts without media queries!',
        layout: 'helper'
      }
    },
    {
      path: '/px-to-rem-converter',
      name: 'REMConverter',
      component: REMConverter,
      meta: {
        title: 'PX to REM Converter',
        description: 'Easily convert pixels to rems!',
        layout: 'helper'
      }
    },
    {
      path: '/clamp-calculator',
      name: 'ClampCalculator',
      component: ClampCalculator,
      meta: {
        title: 'CSS Clamp Calculator',
        description: 'Make your app responsive without media queries!',
        layout: 'helper'
      }
    },
    {
      path: '/minifier',
      name: 'CodeMinifier',
      component: CodeMinifier,
      meta: {
        title: 'Code Minifier',
        description: 'Minify JS, SCSS, CSS, and GraphQL in one click!',
        layout: 'helper'
      }
    },
    {
      path: '/gradient-generator',
      name: 'GradientGenerator',
      component: GradientGenerator,
      meta: {
        title: 'Gradient Generator',
        description: 'Generate beautiful gradients in a few clicks!',
        layout: 'helper'
      }
    },
    {
      path: '/font-face-generator',
      name: 'FontFaceGenerator',
      component: FontFaceGenerator,
      meta: {
        title: 'Font-Face Generator',
        description: 'Generate @font-face CSS easily!',
        layout: 'helper'
      }
    },
    {
      path: '/transform-generator',
      name: 'TransformGenerator',
      component: TransformGenerator,
      meta: {
        title: 'Transform Generator',
        description: 'CSS transform property helper',
        layout: 'helper'
      }
    },
    {
      path: '/performance-report',
      name: 'PerformanceReport',
      component: PerformanceReport,
      meta: {
        title: 'Performance Report',
        description: 'Test your website performance with Pagespeed',
        layout: 'helper'
      }
    },
    {
      path: '/css-utils-generator',
      name: 'CSSUtilsGenerator',
      component: CSSUtilsGenerator,
      meta: {
        title: 'CSS Utils Generator',
        description: 'Easily generate CSS utilities',
        layout: 'helper'
      }
    },
    {
      path: '/tailwind-config-generator',
      name: 'TailwindConfigGenerator',
      component: TailwindConfigGenerator,
      meta: {
        title: 'Tailwind Config Generator',
        description: 'Quickly generate a Tailwind config!',
        layout: 'helper'
      }
    },
    {
      path: '/image-optimiser',
      name: 'ImageOptimiser',
      component: ImageOptimiserView,
      meta: {
        title: 'Image Optimiser',
        description: 'Compress and convert images to AVIF, JPEG, PNG, or WebP.',
        layout: 'helper'
      }
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(loadLayoutMiddleware);

export default router;
