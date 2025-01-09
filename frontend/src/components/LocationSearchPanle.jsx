import 'remixicon/fonts/remixicon.css';
import PropTypes from 'prop-types';


const LocationSearchPanle = (props) => {
  const suggestions = [
    "Third Wave Coffee, Sarjapur - Marathahalli Road",
    "Third Wave Coffee, Outer Ring Road, Ambalipura",
    "Third Wave Coffee, 14th Main Road, Sector 7, HSR Layout",
    "Third Wave Coffee, 17th Cross Road, PWD Quarters, 1st Sector",
    "Third Wave Coffee, Marathahalli - Sarjapur Outer Ring Road",
  ];

  return (
    <div
      className={`relative md:mt-0 md:ml-12`}
    >
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md md:max-w-lg absolute top-0 left-0">
        {suggestions.map((suggestion, index) => (
          <div
          onClick={() => {
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }}
            key={index}
            className="flex gap-4 items-center p-3 active:border-black my-2 rounded-lg  border-2  hover:bg-gray-200 cursor-pointer"
          >
            <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="rgba(255,190,78,1)"
              >
                <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
              </svg>
            </h2>
            <p
              className="text-sm  font-medium text-gray-700"
           
            >
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

LocationSearchPanle.propTypes = {
  setVehiclePanel: PropTypes.func.isRequired,
  setPanelOpen: PropTypes.func.isRequired
};

export default LocationSearchPanle;

