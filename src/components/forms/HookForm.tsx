import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
import type { FormInput } from '../../types/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../store/store';
import { setSelectedCountry } from '../../store/slices/countriesSlice';
import { addFormData } from '../../store/slices/formSlice';

const schema: yup.ObjectSchema<FormInput> = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),

  age: yup
    .number()
    .required('Age is required')
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .min(1, 'Age must be at least 1'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

  password: yup
    .string()
    .required('Password is required')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .min(8, 'Password must be at least 8 characters'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),

  gender: yup
    .mixed<'male' | 'female'>()
    .oneOf(['male', 'female'], 'Gender is required')
    .required('Gender is required'),

  country: yup.string().required('Country is required'),

  profilePicture: yup
    .mixed<FileList>()
    .test('required', 'Profile picture is required', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return file.size <= 5 * 1024 * 1024;
    })
    .test('fileFormat', 'Only .png and .jpeg files are allowed', (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      return ['image/jpeg', 'image/png'].includes(file.type);
    }),

  acceptedTerms: yup
    .boolean()
    .required('You must accept the Terms and Conditions')
    .oneOf([true], 'You must accept the Terms and Conditions'),
}) as yup.ObjectSchema<FormInput>;

export const HookForm = () => {
  const dispatch = useDispatch();
  const { list: countries, selected: selectedCountry } = useSelector(
    (state: RootState) => state.countries
  );

  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      country: selectedCountry,
      profilePicture: null,
    },
  });

  const countryWatch = watch('country');

  const handleCountrySelect = (country: string) => {
    setValue('country', country);
    setInputValue(country);
    dispatch(setSelectedCountry(country));
  };

  useEffect(() => {
    if (inputValue) {
      setFilteredCountries(
        countries.filter((c) =>
          c.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredCountries([]);
    }
  }, [inputValue, countries]);

  useEffect(() => {
    if (countryWatch && countryWatch !== inputValue) {
      setInputValue(countryWatch);
    }
  }, [countryWatch, inputValue]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: FormInput) => {
    const file = data.profilePicture?.[0];
    if (!file) return;

    try {
      const base64String = await convertToBase64(file);

      dispatch(
        addFormData({
          name: data.name,
          age: data.age,
          email: data.email,
          password: data.password,
          gender: data.gender,
          country: data.country,
          profilePicture: base64String,
          acceptedTerms: data.acceptedTerms,
        })
      );
      console.log(data);
      console.log('base64String', base64String);
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  const isSubmitDisabled = !isValid || !isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Hook Form</h2>

      <div className={styles.container}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={styles.input}
          placeholder="Enter your name"
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="age" className={styles.label}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { valueAsNumber: true })}
          className={styles.input}
          placeholder="Enter your age"
        />
        {errors.age && <p className={styles.error}>{errors.age.message}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={styles.input}
          placeholder="Enter your email"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={styles.input}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <div className={styles.container}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          className={styles.input}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className={styles.container}>
        <label className={styles.label}>Gender:</label>
        <div className={styles.radioContainer}>
          <label className={styles.label}>
            <input
              type="radio"
              value="male"
              {...register('gender')}
              className={styles.input}
            />
            Male
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              value="female"
              {...register('gender')}
              className={styles.input}
            />
            Female
          </label>
        </div>
        {errors.gender && (
          <p className={styles.error}>{errors.gender.message}</p>
        )}
      </div>

      <div className={styles.container}>
        <label htmlFor="country" className={styles.label}>
          Country:
        </label>
        <input
          type="text"
          id="country"
          {...register('country')}
          className={styles.input}
          placeholder="Start typing to select country"
        />
        {filteredCountries.length > 0 && (
          <ul className={styles.suggestions}>
            {filteredCountries.map((country) => (
              <li
                key={country}
                onClick={() => handleCountrySelect(country)}
                className={styles.suggestionItem}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
        {errors.country && (
          <p className={styles.error}>{errors.country.message}</p>
        )}
      </div>

      <div className={styles.container}>
        <label htmlFor="profilePicture" className={styles.label}>
          Profile Picture:
        </label>
        <input
          type="file"
          id="profilePicture"
          {...register('profilePicture')}
          className={styles.input}
          accept="image/jpeg,image/png"
        />
        {errors.profilePicture && (
          <p className={styles.error}>{errors.profilePicture.message}</p>
        )}
      </div>

      <div className={`${styles.container} ${styles.containerTerms}`}>
        <label className={styles.label}>
          <input
            type="checkbox"
            {...register('acceptedTerms')}
            className={styles.input}
          />
          I accept the Terms and Conditions
        </label>
        {errors.acceptedTerms && (
          <p className={styles.error}>{errors.acceptedTerms.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={styles.button}
      >
        Submit
      </button>
    </form>
  );
};
