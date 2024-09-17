import { InputField } from './InputField';

export default {
    title: 'atom/InputField',
    component: InputField,
    args : {},
};

export const Default = { args : { children : 'InputField', type : "text", size : "thin", radius : "medium" } }

export const Text = { args : { type : 'text', children: "Text", radius : "medium" } }
export const Password = { args : { type : 'password', children: "Password", radius : "medium" } }



