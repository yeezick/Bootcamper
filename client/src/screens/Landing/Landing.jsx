import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.scss';
import { SingleActionButton } from '../../components/Button/SingleActionButton';



export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="img-placeholder" data-testid="landing-image"></div>
      <h1 className="logo-placeholder">Bootcamper</h1>
      <SingleActionButton text="Sign Up" onClick={() => navigate('/sign-up')} />
      <SingleActionButton text="Log In" onClick={() => navigate('/sign-in')} />
      <h5>Want to take a test drive first?</h5>
      <a onClick={() => navigate('/roulette')}>continue without logging in</a>
      <h6>Help | Contact</h6>
    </div>
  );
};
