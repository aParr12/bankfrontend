import './Home.css';
import bankImg from '../bank.png';

export const Home = () => {
  return (
      <div className="PageWrapper">
        <div className="Home CardStyling card">
          <div className="card-header">Full-Stack Banking App</div>
          <div className="card-title">Full-Stack Banking App</div>
          <div className="card-text">Adam Parrington</div>
          <div className="card-body">
            <img src={bankImg} className="img-fluid" alt="Bank logo"/>
          </div>
        </div>
      </div>
  );
};
