import { ProjectCard } from "./ProjectCard";
import NewYork from "../../../assets/img/NewYork.jpeg";

export default {
  title: "molecules/ProjectCard",
  component: ProjectCard,
};

export const Default = {
  args: {
    title: "New York",
    price: "$1,900",
    description:
      "great trip with many activities. I love how the trip was organized. I would recommend this trip to everyone.",
    duration: 5,
    rating: 5,
    img_url: NewYork,
  },
};
