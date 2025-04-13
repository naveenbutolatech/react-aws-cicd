import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchHospitals, HospitalType } from "../../store/hospitalSlice";


const HospitalListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const hospitals = useAppSelector((state) => state.hospital.hospitals);
  const isLoading = useAppSelector((state) => state.hospital.isLoading);
  const error = useAppSelector((state) => state.hospital.error);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchHospitals({ limit: 10, offset }));
  }, [dispatch, offset]);

  const handleNext = () => setOffset(offset + 10);
  const handlePrevious = () => setOffset(Math.max(0, offset - 10));
  const handleRegisterClick = () => navigate('/hospital-registration');


  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  }
  

  return (
    <div className="wrapper-right-dashboard">
      <div className="table-listing">
      <div className="header-container">
        <h2>Hospital Listing</h2>
        <button 
          onClick={handleRegisterClick}
          className="register-button"
        >
          Add New Hospital
        </button>
      </div>
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="table-responsive-container">
          <table className="hospital-table">
            <thead>
              <tr>
                <th style={{width:'20%'}}>Name</th>
                <th style={{width:'20%'}}>Email</th>
                <th style={{width:'30%'}}>Address</th>
                <th style={{width:'20%'}}>Contact</th>
                <th style={{width:'10%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
            {hospitals.map((hospital: HospitalType) => (
                <tr key={hospital.id}>
                  <td>{hospital.firstname}</td>
                  <td>{hospital.email}</td>
                  <td>{truncateText(hospital.address, 4)}</td>
                  <td>{hospital.phonenumber}</td>
                  <td className="action-icons">
                    <button className="icon-button" title="Edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </button>
                    <button className="icon-button delete" title="Delete">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-controls">
          <button
            onClick={handlePrevious}
            disabled={offset === 0}
            className="pagination-button"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={hospitals.length < 10}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalListing;
