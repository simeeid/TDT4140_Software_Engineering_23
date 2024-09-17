import { ProfileReviews } from './ProfileReviews';
import NewYork from "../../../assets/img/NewYork.jpeg";

export default {
  title: 'molecules/ProfileReviews',
  component: ProfileReviews,
};

export const Default = { args: {
  userNames: ['User1', 'User2', 'User3', 'User4'],
  reviews: [1,4,3,5],
  description: ['Description1', 'Description2', 'Description3', 'Description4'],
  profileURL: NewYork
  }
};
