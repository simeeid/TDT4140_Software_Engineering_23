import { DummyButtons } from './DummyButtons';

export default {
  title: 'molecules/DummyButtons',
  component: DummyButtons,
  args : { size: "large" , children : 'Button' },
  };
  
  export const Default = {}

  export const Large = { args : { size : 'large' } }
  export const Medium = { args : { size : 'medium' } }
  export const Small = { args : { size : 'small' } }
