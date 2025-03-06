import type { RouteLocationNormalized } from 'vue-router';
import { AppLayoutsEnum, AppLayoutToFileMap } from '@/layouts/layouts';

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
  const { layout } = route.meta as { layout?: AppLayoutsEnum };
  const normalizedLayoutName = layout || AppLayoutsEnum.default;
  const layoutComponent = AppLayoutToFileMap[normalizedLayoutName];
  route.meta.layoutComponent = layoutComponent;
}
