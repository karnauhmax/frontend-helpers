import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from './layoutMiddleware';

import HomeView from '@/views/HomeView.vue';
import ImageOptimiserView from '@/modules/image-optimiser/views/ImageOptimiserView.vue';
import GridBuilder from '@/modules/grid-builder/views/GridBuilder.vue';
import REMConverter from '@/modules/rem-converter/views/REMConverter.vue';
import ClampCalculator from '@/modules/clamp-calculator/views/ClampCalculator.vue';
import CodeMinifier from '@/modules/code-minifier/views/CodeMinifier.vue';
import GradientGenerator from '../components/gradient-generator/GradientGenerator.vue';
import FontFaceGenerator from '@/modules/font-face-generator/views/FontFaceGenerator.vue';
import TransformGenerator from '@/modules/transform-generator/views/TransformGenerator.vue';
import PerformanceReport from '@/modules/performance-report/views/PerformanceReport.vue';
import CSSUtilsGenerator from '../components/css-utils-generator/CSSUtilsGenerator.vue';
import TailwindConfigGenerator from '@/modules/tailwind-config-generator/views/TailwindConfigGenerator.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/grid-builder',
      name: 'GridBuilder',
      component: GridBuilder,
      meta: {
        title: 'Grid Builder',
        description:
          'Grid Builder allows you to create cards, shop products etc. layout using only one css property without any media queries! Check it out',
        layout: 'helper'
      }
    },
    {
      path: '/px-to-rem-converter',
      name: 'REMConverter',
      component: REMConverter,
      meta: {
        title: 'PX to REM converter',
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
        description:
          'Easily calculate CSS clamp function to make your application responsive without any additional media queries!',
        layout: 'helper'
      }
    },
    {
      path: '/minifier',
      name: 'CodeMinifier',
      component: CodeMinifier,
      meta: {
        title: 'Code Minifier',
        description: "Easily minify JS, SCSS, CSS, GraphQL code in one click! That's it!",
        layout: 'helper'
      }
    },
    {
      path: '/gradient-generator',
      name: 'GradientGenerator',
      component: GradientGenerator,
      meta: {
        title: 'Gradient Generator',
        description: 'Generate your wonderful gradient in a few clicks!',
        layout: 'helper'
      }
    },
    {
      path: '/font-face-generator',
      name: 'FontFaceGenerator',
      component: FontFaceGenerator,
      meta: {
        title: 'Font-Face Generator',
        description:
          'Get rid of the tedious manual prescribing of Font Face and do everything in two clicks (or maybe more than two)',
        layout: 'helper'
      }
    },
    {
      path: '/transform-generator',
      name: 'TransformGenerator',
      component: TransformGenerator,
      meta: {
        title: 'Transform Generator',
        description: "I don't know what to say. Transform generator :p",
        layout: 'helper'
      }
    },
    {
      path: '/performance-report',
      name: 'PerformanceReport',
      component: PerformanceReport,
      meta: {
        title: 'Performance Report',
        description: 'Test your website performance based on Pagespeed',
        layout: 'helper'
      }
    },
    {
      path: '/css-utils-generator',
      name: 'CSSUtilsGenerator',
      component: CSSUtilsGenerator,
      meta: {
        title: 'CSS Utils Generator',
        description: 'Generate CSS Utils easily',
        layout: 'helper'
      }
    },
    {
      path: '/tailwind-config-generator',
      name: 'TailwindConfigGenerator',
      component: TailwindConfigGenerator,
      meta: {
        title: 'Tailwind Config Generator',
        description:
          "Let's be honest, noone likes to create tailwind config manually. So do it easily and fast ",
        layout: 'helper'
      }
    },
    {
      path: '/image-optimiser',
      name: 'image-optimiser',
      component: ImageOptimiserView,
      meta: {
        title: 'Image Optimiser',
        description: 'Compress and convert your images to AVIF, JPEG, PNG, or WebP.',
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
