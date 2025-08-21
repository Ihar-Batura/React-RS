import styles from './Forms.module.css';
import * as yup from 'yup';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { setSelectedCountry } from '../../store/slices/countriesSlice';
import { addFormData } from '../../store/slices/formSlice';
import type { PasswordStrength } from '../../types/types';
import { schema } from '../../utils/schema';
import { convertToBase64 } from '../../utils/convert-file-to-base64';

export const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const { list: countries } = useSelector(
    (state: RootState) => state.countries
  );

  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>('weak');

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const acceptedTermsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const password = passwordRef.current?.value || '';
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) setPasswordStrength('weak');
    else if (score === 3) setPasswordStrength('fair');
    else if (score === 4) setPasswordStrength('good');
    else setPasswordStrength('strong');
  }, [passwordRef.current?.value]);

  const handleCountrySelect = (country: string) => {
    setInputValue(country);
    if (countryRef.current) {
      countryRef.current.value = country;
    }
    dispatch(setSelectedCountry(country));
    setFilteredCountries([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value ? Number(ageRef.current.value) : 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderMaleRef.current?.checked
        ? 'male'
        : genderFemaleRef.current?.checked
          ? 'female'
          : undefined,
      country: countryRef.current?.value || '',
      profilePicture: profilePictureRef.current?.files || null,
      acceptedTerms: acceptedTermsRef.current?.checked || false,
    };

    try {
      await schema.validate(formData, { abortEarly: false });

      const file = formData.profilePicture?.[0];
      if (!file) {
        setErrors({ profilePicture: 'Profile picture is required' });
        return;
      }

      const base64String = await convertToBase64(file);

      dispatch(
        addFormData({
          name: formData.name,
          age: formData.age,
          email: formData.email,
          password: formData.password,
          gender: formData.gender as 'male' | 'female',
          country: formData.country,
          profilePicture: base64String,
          acceptedTerms: formData.acceptedTerms,
        })
      );
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        console.error('Unexpected error:', err);
        setErrors({ submit: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Uncontrolled Form</h2>

      <div className={styles.container}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          ref={nameRef}
          className={styles.input}
          placeholder="Enter your name"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="age" className={styles.label}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          ref={ageRef}
          className={styles.input}
          placeholder="Enter your age"
          min="1"
        />
        {errors.age && <p className={styles.error}>{errors.age}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={emailRef}
          className={styles.input}
          placeholder="Enter your email"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          className={styles.input}
          placeholder="Enter your password"
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        {passwordRef.current?.value && (
          <p className={styles.passwordStrength}>
            Password strength: {' ' + passwordStrength}
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
          name="confirmPassword"
          ref={confirmPasswordRef}
          className={styles.input}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}
      </div>

      <div className={styles.container}>
        <label className={styles.label}>Gender:</label>
        <div className={styles.radioContainer}>
          <label className={styles.label}>
            <input
              type="radio"
              name="gender"
              value="male"
              ref={genderMaleRef}
              className={styles.input}
            />
            Male
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              name="gender"
              value="female"
              ref={genderFemaleRef}
              className={styles.input}
            />
            Female
          </label>
        </div>
        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="country" className={styles.label}>
          Country:
        </label>
        <input
          type="text"
          id="country"
          name="country"
          ref={countryRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
        {errors.country && <p className={styles.error}>{errors.country}</p>}
      </div>

      <div className={styles.container}>
        <label htmlFor="profilePicture" className={styles.label}>
          Profile Picture:
        </label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          ref={profilePictureRef}
          className={styles.input}
          accept="image/jpeg,image/png"
        />
        {errors.profilePicture && (
          <p className={styles.error}>{errors.profilePicture}</p>
        )}
      </div>

      <div className={`${styles.container} ${styles.containerTerms}`}>
        <label className={styles.label}>
          <input
            type="checkbox"
            name="acceptedTerms"
            ref={acceptedTermsRef}
            className={styles.input}
          />
          I accept the Terms and Conditions
        </label>
        {errors.acceptedTerms && (
          <p className={styles.error}>{errors.acceptedTerms}</p>
        )}
      </div>

      {errors.submit && <p className={styles.error}>{errors.submit}</p>}

      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};
