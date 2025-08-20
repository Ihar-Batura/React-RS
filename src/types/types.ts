export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  acceptedTerms: boolean;
  profilePicture: string;
  country: string;
}
