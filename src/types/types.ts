export type Gender = 'male' | 'female';

interface BaseFormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  acceptedTerms: boolean;
  country: string;
}

export interface FormInput extends BaseFormFields {
  confirmPassword: string;
  profilePicture: FileList | null;
}

export interface FormValues extends BaseFormFields {
  profilePicture: string;
}

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';
