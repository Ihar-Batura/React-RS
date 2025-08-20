import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
import type { FormData } from '../../types/types';

export const HookForm = () => {
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>Hook Form</h2>
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
      </div>
      <div className={styles.container}>
        <label htmlFor="age" className={styles.label}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          {...register('age')}
          className={styles.input}
          placeholder="Enter your age"
          min="1"
        />
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
              {...register('gender')}
              value="female"
              className={styles.input}
            />
            Female
          </label>
        </div>
      </div>
      <div className={styles.container}>
        <label htmlFor="country" className={styles.label}>
          Country:
        </label>
        <select
          id="country"
          {...register('country')}
          className={styles.input}
          defaultValue=""
        >
          <option value="" disabled>
            Select your country
          </option>
        </select>
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
      </div>
      <div className={styles.container}>
        <label className={styles.label}>
          <input
            type="checkbox"
            {...register('acceptedTerms')}
            className={styles.input}
          />
          I accept the Terms and Conditions
        </label>
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};
