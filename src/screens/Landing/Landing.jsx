import { useNavigate } from 'react-router-dom';
import './Landing.scss';
import { SingleActionButton } from '../../components/Button/SingleActionButton';

export const Landing = () => {
  const navigate = useNavigate();
  const routeToSignUp = {
    handler() {
      navigate('sign-up');
    },
    title: 'Sign Up',
  };

  const routeToSignIn = {
    handler() {
      navigate('sign-in');
    },
    title: 'Sign In',
  };

  return (
    <div className="landing-page">
      <div className="img-placeholder"></div>
      <h1 className="title">Bootcamper</h1>
      <h3 className="subtitle">Find your next project!</h3>
      <SingleActionButton payload={routeToSignUp} style="default" size="long" />
      <SingleActionButton payload={routeToSignIn} style="light" size="long" />
      <p className="text">Continue with</p>
      <div className="sso-wrapper">
        <div className="sso-item"></div>
        <div className="sso-item"></div>
        <div className="sso-item"></div>
      </div>
      <a className="trial-link" href="/roulette">
        Continue without logging in
      </a>
    </div>
  );
};
