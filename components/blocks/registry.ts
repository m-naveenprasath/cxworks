/**
 * Block registry: maps the `type` of a block in content/pages/*.json to its component.
 *
 * To add a block type:
 *   1. Create components/blocks/MyBlock.tsx exporting `MyBlock({ b, page }: BlockProps<MyBlockData>)`.
 *   2. Register it below as `mytype: MyBlock`.
 *   3. Use `{ "type": "mytype", … }` in any page JSON.
 */
import type { ComponentType } from 'react';
import { Ai } from './Ai';
import { Aianswer } from './Aianswer';
import { Analogy } from './Analogy';
import { Cards } from './Cards';
import { Cases } from './Cases';
import { Catalog } from './Catalog';
import { Chart } from './Chart';
import { Checklist } from './Checklist';
import { Convert } from './Convert';
import { CtaBlock } from './CtaBlock';
import { Dbr } from './Dbr';
import { Doors } from './Doors';
import { Facts } from './Facts';
import { Faq } from './Faq';
import { Gatechips } from './Gatechips';
import { Gates } from './Gates';
import { Gatesall } from './Gatesall';
import { Hero } from './Hero';
import { Insrail } from './Insrail';
import { Journey } from './Journey';
import { Ladder } from './Ladder';
import { List } from './List';
import { Logos } from './Logos';
import { Loop } from './Loop';
import { Problem } from './Problem';
import { Related } from './Related';
import { Reviews } from './Reviews';
import { Routes } from './Routes';
import { Sample } from './Sample';
import { Seo } from './Seo';
import { Split } from './Split';
import { Stages } from './Stages';
import { Stats } from './Stats';
import { Steps } from './Steps';
import { Table } from './Table';
import { Text } from './Text';
import { Tools } from './Tools';
import type { BlockProps } from './types';
import { Upgrade } from './Upgrade';
import { Why } from './Why';

// Each component types its own `b`; the registry is the one place that trusts the JSON.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BLOCKS: Record<string, ComponentType<BlockProps<any>>> = {
  ai: Ai,
  aianswer: Aianswer,
  analogy: Analogy,
  cards: Cards,
  cases: Cases,
  catalog: Catalog,
  chart: Chart,
  checklist: Checklist,
  convert: Convert,
  cta: CtaBlock,
  dbr: Dbr,
  doors: Doors,
  facts: Facts,
  faq: Faq,
  gatechips: Gatechips,
  gates: Gates,
  gatesall: Gatesall,
  hero: Hero,
  insrail: Insrail,
  journey: Journey,
  ladder: Ladder,
  list: List,
  logos: Logos,
  loop: Loop,
  problem: Problem,
  related: Related,
  reviews: Reviews,
  routes: Routes,
  sample: Sample,
  seo: Seo,
  split: Split,
  stages: Stages,
  stats: Stats,
  steps: Steps,
  table: Table,
  text: Text,
  tools: Tools,
  upgrade: Upgrade,
  why: Why,
};

export const BLOCK_TYPES = Object.keys(BLOCKS);
