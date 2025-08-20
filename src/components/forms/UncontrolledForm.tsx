import styles from './Forms.module.css';

export const UncontrolledForm = () => {
  return (
    <form onSubmit={() => console.log('submit')} className={styles.form}>
      <div className={styles.container}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
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
          name="age"
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
          name="email"
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
          name="password"
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
          name="confirmPassword"
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
              name="gender"
              value="male"
              className={styles.input}
            />
            Male
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              name="gender"
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
          name="country"
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
          name="profilePicture"
          className={styles.input}
          accept="image/jpeg,image/png"
        />
      </div>
      <div className={styles.container}>
        <label className={styles.label}>
          <input
            type="checkbox"
            name="acceptedTerms"
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
