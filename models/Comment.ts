export default interface Comment {
  _id?: string;
  text: string;
  name: string;
  email: string;
  eventId: string | string[] | undefined;
}
