import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonVariant, type ButtonSize } from './Button';

const variants: ButtonVariant[] = ['primary', 'secondary', 'link', 'destructive', 'accent', 'destructive-secondary'];
const sizes: ButtonSize[] = ['xlarge', 'large', 'medium', 'small'];

const meta: Meta<typeof Button> = {
  title: 'Trinity/Components/Molecules/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Content', variant: 'primary', size: 'xlarge', prefixIcon: 'e4d9', suffixIcon: 'e4d9', loading: false, disabled: false },
  argTypes: { variant: { control: 'select', options: variants }, size: { control: 'inline-radio', options: sizes } },
  parameters: { docs: { description: { component: 'Native `<button>` (Figma Button 30033:78562, 144 authored branches) built from the Icon and Spinner atoms. Enter and Space activate. Loading keeps the name, sets `aria-busy`, and ignores clicks. Icon-only (`showContent={false}`) needs `aria-label`.' } } },
};
export default meta;
type S = StoryObj<typeof Button>;

export const Playground: S = {};
const Grid = ({ size }: { size: ButtonSize }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, max-content)', gap: 12, alignItems: 'center' }}>
    {variants.map(v => <Button key={v + 'd'} variant={v} size={size} prefixIcon="e4d9" suffixIcon="e4d9">Content</Button>)}
    {variants.map(v => <Button key={v + 'h'} variant={v} size={size} state="hover" prefixIcon="e4d9" suffixIcon="e4d9">Hover</Button>)}
    {variants.map(v => <Button key={v + 'f'} variant={v} size={size} state="focus" prefixIcon="e4d9" suffixIcon="e4d9">Focus</Button>)}
    {variants.map(v => <Button key={v + 'a'} variant={v} size={size} state="active" prefixIcon="e4d9" suffixIcon="e4d9">Active</Button>)}
    {variants.map(v => <Button key={v + 'x'} variant={v} size={size} disabled prefixIcon="e4d9" suffixIcon="e4d9">Disabled</Button>)}
    {variants.map(v => <Button key={v + 'l'} variant={v} size={size} loading>Saving</Button>)}
  </div>
);
export const XLarge: S = { render: () => <Grid size="xlarge" /> };
export const Large: S = { render: () => <Grid size="large" /> };
export const Medium: S = { render: () => <Grid size="medium" /> };
export const Small: S = { render: () => <Grid size="small" /> };
