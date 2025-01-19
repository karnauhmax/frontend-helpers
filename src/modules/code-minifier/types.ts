export const MINIFY_TYPES = {
  JS: {
    title: 'JavaScript',
    value: 'JS'
  },
  CSS: {
    title: 'CSS',
    value: 'css'
  },
  SCSS: {
    title: 'SCSS',
    value: 'scss'
  },
  HTML: {
    title: 'HTML',
    value: 'html'
  }
} as const;
export type TMinifyValue = (typeof MINIFY_TYPES)[keyof typeof MINIFY_TYPES];

export interface IMinifyOption {
  title: TMinifyValue['title'];
  value: TMinifyValue['value'];
  checked: boolean;
}
