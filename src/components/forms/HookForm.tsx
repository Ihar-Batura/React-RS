import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
import type { FormInput } from '../../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../store/store';
import { setSelectedCountry } from '../../store/slices/countriesSlice';
import { addFormData } from '../../store/slices/formSlice';
import type { PasswordStrength } from '../../types/types';
import { schema } from '../../utils/schema';
import { convertToBase64 } from '../../utils/convert-file-to-base64';

type HookFormProps = {
  onClose: () => void;
};

export const HookForm = ({ onClose }: HookFormProps) => {
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

  const password = watch('password');
  const countryWatch = watch('country');

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return 'weak';

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return 'weak';
    if (score === 3) return 'fair';
    if (score === 4) return 'good';
    return 'strong';
  };

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
      onClose();
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
        {password && (
          <p className={styles.passwordStrength}>
            Password strength:
            {' ' + getPasswordStrength(password)}
          </p>
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
        <input
          type="checkbox"
          {...register('acceptedTerms')}
          className={styles.inputCheckbox}
        />
        I accept the Terms and Conditions
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
