import HelperLayout from '@/layouts/HelperLayout.vue';
import AppLayoutDefault from '@/layouts/AppLayoutDefault.vue';

export enum AppLayoutsEnum {
  default = 'default',
  helper = 'helper'
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, any> = {
  default: AppLayoutDefault,
  helper: HelperLayout
};
