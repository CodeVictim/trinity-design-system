import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButtonField } from './RadioButtonField';
import { ModePanel, type SpecimenRow } from '../../../shared/mode-panels';

// Figma Radio Button Field 30173:78607 — all 8 authored variants (label "Label", as in Figma), shown in Light and
// Dark panels like the page's "Component Breakdown" frame. Disabled is only authored with state default.
const ROWS = (mode: string): SpecimenRow[] => [
  { label: 'Default', render: () => <RadioButtonField label="Label" name={`d-${mode}`} /> },
  { label: 'Selected', render: () => <RadioButtonField label="Label" name={`s-${mode}`} defaultChecked /> },
  { label: 'Hover', render: () => <RadioButtonField label="Label" name={`h-${mode}`} state="hover" /> },
  { label: 'Hover, selected', render: () => <RadioButtonField label="Label" name={`hs-${mode}`} state="hover" defaultChecked /> },
  { label: 'Focus', render: () => <RadioButtonField label="Label" name={`f-${mode}`} state="focus" /> },
  { label: 'Focus, selected', render: () => <RadioButtonField label="Label" name={`fs-${mode}`} state="focus" defaultChecked /> },
  { label: 'Disabled', render: () => <RadioButtonField label="Label" name={`x-${mode}`} disabled /> },
  { label: 'Disabled, selected', render: () => <RadioButtonField label="Label" name={`xs-${mode}`} disabled defaultChecked /> },
];

const meta: Meta<typeof RadioButtonField> = {
  title: 'Trinity/Components/Molecules/Radio Button Field',
  component: RadioButtonField,
  tags: ['autodocs'],
  args: { label: 'Label', showLabel: true, defaultChecked: false, disabled: false, name: 'playground' },
  parameters: { docs: { description: { component: 'Native radio + label (Figma Radio Button Field 30173:78607), built from the Radio Button Input atom. Standard radio behaviour: Space selects, arrow keys move the selection between radios with the same `name`, and a selected radio can\'t be unselected by clicking it. Clicking the label selects. Always use radios in a group with a legend. Target 24×24.' } } },
};
export default meta;
type S = StoryObj<typeof RadioButtonField>;

export const Playground: S = {};
export const LightMode: S = { name: 'Light Mode', parameters: { layout: 'padded', controls: { disable: true } }, render: () => <ModePanel mode="light" rows={ROWS('light')} /> };
export const DarkMode: S = { name: 'Dark Mode', parameters: { layout: 'padded', controls: { disable: true } }, render: () => <ModePanel mode="dark" rows={ROWS('dark')} /> };
