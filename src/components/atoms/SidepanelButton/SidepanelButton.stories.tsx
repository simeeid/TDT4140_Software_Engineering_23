import { SidepanelButton } from './SidepanelButton';
import { MdBackpack } from "react-icons/md";
import { AiFillHome, AiFillStar} from "react-icons/ai";

export default {
  title: 'atom/Sidepanelbutton',
  component: SidepanelButton,
};

export const Default = { args : { size : 'medium', icon: MdBackpack,selected : true, children : 'Backpack' } }
export const HomeIcon = { args : { size : 'small', icon: AiFillHome, selected : false, children : 'Home' } }
export const StarIcon = { args : { size : 'large', icon: AiFillStar, selected : true, children : 'Rated' } }