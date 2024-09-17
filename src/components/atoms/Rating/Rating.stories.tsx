import { Rating } from './Rating';

export default {
    title: 'atom/Rating',
    component: Rating,
    args : { stars : 4, size : "small" },
  };
  
  export const Default = {}
  
  export const Large = { args : { size : 'large'} }
  export const Medium = { args : { size : 'medium'} }
  export const Small = { args : { size : 'small'} }