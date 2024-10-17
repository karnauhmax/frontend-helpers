/**
 *
 * @param value Value in px
 * @returns Value in rem
 */

const pxToRem = (value: number) => {
  const ROOT_FONT_SIZE = 16
  return (1 / ROOT_FONT_SIZE) * value
}

export { pxToRem }
