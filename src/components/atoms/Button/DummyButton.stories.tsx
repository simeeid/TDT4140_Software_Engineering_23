import { DummyButton } from './DummyButton';

export default {
  title: 'atom/DummyButton',
  component: DummyButton,
  args : { children : 'Button', size : "small" },
};

export const Default = {}

export const Large = { args : { size : 'large' } }
export const Medium = { args : { size : 'medium', children: "Medium" } }
export const Small = { args : { size : 'small', children: "Small" } }

