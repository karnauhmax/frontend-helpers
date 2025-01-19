/**
 * Converts a value from rem to px.
 *
 * @param rem - The value in rem to be converted.
 * @returns The equivalent value in px.
 */

const remToPx = (rem: number) => {
  const FONT_SIZE = 16;

  const px = rem / (1 / FONT_SIZE);

  return px;
};

export { remToPx };
