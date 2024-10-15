import backgroundProperties from './backgroundProperties';
import spacingProperties from './spacingProperties';
import borderProperties from './borderProperties';
import gridProperties from './gridProperties';
import sizesProperties from './sizesProperties';
import colorProperties from './colorProperties';
import flexProperties from './flexProperties';
import effectsProperties from './effectsProperties';

import type { ICssCategory } from './properties.types';

const properties: ICssCategory[] = [
  backgroundProperties,
  spacingProperties,
  borderProperties,
  gridProperties,
  sizesProperties,
  colorProperties,
  flexProperties,
  effectsProperties,
];

export default properties;
