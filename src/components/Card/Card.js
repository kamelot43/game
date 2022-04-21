import "./Card.scss";

import PropTypes from "prop-types";

const Card = ({data = []}) => {
  const {albumId, id, title, url} = data;

  return (
    <div className="card">
      <div>albumId is {albumId}</div>
      <div>id is {id}</div>
      <div>title is {title}</div>
      <img src={url} alt="" width={150} height={150}/>
    </div>
)}

Card.propTypes = {
  data: PropTypes.shape({
    albumId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
  })
}

export default Card;