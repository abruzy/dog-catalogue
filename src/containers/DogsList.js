import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FETCHDOGS, FILTERDOGLIST } from '../actions';
import Dog from '../components/Dog';
import CategoryFilter from '../components/CategoryFilter';
import '../styles/scss/DogsList.scss';

const DogsList = ({
  dogs, FETCHDOGS, FILTERDOGLIST,
}) => {
  useEffect(() => FETCHDOGS(), []);

  const handleFilterChange = value => (value.toLowerCase() === 'all' ? FETCHDOGS() : FILTERDOGLIST(value));

  return dogs.length === 0 ? <p>Is Loading</p> : (
    <div className="book-list">
      <div className="header">
        <div className="header-title">Dog Catalogue</div>
        <div className="category-container">
          <CategoryFilter handleChange={handleFilterChange} />
        </div>
      </div>
      <div className="books-container">
        {dogs.map(dog => (
          <Link key={dog.idMeal} to={{ pathname: `/dog/${dog.idMeal}`, state: dog }}>
            <Dog key={dog.idMeal} dog={dog} />
          </Link>
        ))}
      </div>
    </div>
  );
};

DogsList.propTypes = {
  dogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  FETCHDOGS: PropTypes.func.isRequired,
  FILTERDOGLIST: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dogs: state.dogs.dog_clothes,
});

export default connect(mapStateToProps, { FETCHDOGS, FILTERDOGLIST }, null)(DogsList);
