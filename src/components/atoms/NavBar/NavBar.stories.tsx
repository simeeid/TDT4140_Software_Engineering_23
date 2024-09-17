//Create component stories navbar

import { NavBar } from './NavBar';

export default {
    title: 'atom/NavBar',
    component: NavBar,
    args : {},
};

export const Default = { args : {backgroundtype : 'blur'} }

export const Clear = { args : {backgroundtype : 'clear'} }
export const Blur = { args : {backgroundtype : 'blur'} }


