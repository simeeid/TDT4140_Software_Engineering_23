import { Logo } from "./Logo";

export default {
  title: "atom/Logo",
  component: Logo,
  args: {},
};

export const Default = {};

export const Current = {
  args: { mainColor: "rgb(21,49,111)", secondaryColor: "rgb(235,86,118)" },
};

export const Experimental = {
  args: { mainColor: "#093E84", secondaryColor: "#ff7001" },
};

export const Black = {
  args: { mainColor: "#000000", secondaryColor: "#000000" },
};
