import React, { useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import View from '../components/View';
import Registration from '../models/Registration';

export default function SignUp() {
  const { email, updateEmail } = useState(null);
  const { signupFailed, signupFail } = useState(null);

  const validateEmail = () => {
    if (!email) {
      updateEmail(null);
      signupFail('Invalid email.');
    }
  };

  const handleSubmit = async () => {
    if (validateEmail()) {
      return;
    }
    try {
      await Registration.post(email);
    } catch (err) {
      signupFail(true);
    }
  };

  return (
    <View title="Sign Up" view="sign-up">
      <ErrorModal
        open={signupFailed}
        dialogText="Error submitting registration."
        handleClose={() => signupFail(false)}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email-registration">
          Email:
          <input
            id="email-registration"
            type="email"
            name="email"
            value={email}
            onChange={updateEmail}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </View>
  );
}
