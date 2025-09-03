import React, { use } from 'react'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import locationServices from '../services/locationServices';
import '../styles/Clinic.css';

function Clinic() {

  const auth = useSelector((state) => state.auth);
  const location = auth.location;

  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await locationServices.getClinics(location);
        if (data.error) {
          console.error(data.error);
          return;
        }
        // console.log(data);
        setClinics(data);
      }
      catch (error) {
        console.error('Error fetching clinics:', error);
      }
    }
    fetchClinics();
  }, [auth.location])

  return (
    <div classname="clinic-container">
      <h3>
        Clinics near{" "}
        <span style={{ fontSize: "1.5rem", fontWeight: 900, textDecoration: "underline" }}>{location}</span> :
      </h3>
      <div className="clinic-list">
        {clinics.length > 0 ? (
          clinics.map((clinic, index) => (
            <div key={index} className="clinic-card">
              <h4>{clinic.clinic_name}</h4>
              <p>{clinic.local_body}</p>
              <p>{clinic.district}</p>
            </div>
          ))
        ) : (
          <p>No clinics found for this location.</p>
        )}
      </div>
    </div>
  )
}

export default Clinic