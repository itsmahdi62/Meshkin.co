import { useSelector } from "react";

const Main = () => {
  const tours = useSelector((state) => state.tours);

  return (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <div className="card">
            <div className="card__header">
              <div className="card__picture">
                <div className="card__picture-overlay">&nbsp;</div>
                <img
                  className="card__picture-img"
                  src={`/img/tours/${tour.imageCover}`}
                  alt={tour.name}
                />
              </div>
              <h3 className="heading-tertirary">
                <span>{tour.name}</span>
              </h3>
            </div>
            <div className="card__details">
              <h4 className="card__sub-heading">
                {`${tour.difficulty} ${tour.duration}-day tour`}
              </h4>
              <p className="card__text">{tour.summary}</p>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-map-pin" />
                </svg>
                <span>{tour.startLocation.description}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-calendar" />
                </svg>
                <span>{tour.startDates[0]}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-flag" />
                </svg>
                <span>{`${tour.locations.length} stops`}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/img/icons.svg#icon-user" />
                </svg>
                <span>{`${tour.maxGroupSize} people`}</span>
              </div>
            </div>
            <div className="card__footer">
              <p>
                <span className="card__footer-value">${tour.price}</span>
                <span className="card__footer-text">per person</span>
              </p>
              <p className="card__ratings">
                <span className="card__footer-value">
                  {tour.ratingsAverage}
                </span>
                <span className="card__footer-text">
                  rating (${tour.ratingsQuantity})
                </span>
              </p>
              <a
                className="btn btn--green btn--small"
                href="/tour/${tour.slug}">
                Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
