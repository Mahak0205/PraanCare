import React, { useState } from "react";
import DemographicForm from "../components/ProfileInfo/DemographicForm";
import PersonalityForm from "../components/ProfileInfo/PersonalityForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../auth";

const UserProfile = () => {
  const [step, setStep] = useState(1);
  const [demographicData, setDemographicData] = useState({});
  const [personalityData, setPersonalityData] = useState({});
  const navigate = useNavigate();
  const handleNext = (data) => {
    setDemographicData(data); // Save demographic info
    setStep(2); // Move to personality step
  };

  const handleSubmit = async (traits) => {
  setPersonalityData(traits);

  const fullUserData = {
    ...demographicData,
    personality: {
      "Extraverted - enthusiastic": traits.item1,
      "Critical - quarrelsome": traits.item2,
      "Dependable - self-disciplined": traits.item3,
      "Anxious - easily upset": traits.item4,
      "Open to new experiences - complex": traits.item5,
      "Reserved - quiet": traits.item6,
      "Sympathetic - warm": traits.item7,
      "Disorganized - careless": traits.item8,
      "Calm - emotionally stable": traits.item9,
      "Conventional - uncreative": traits.item10,
    },
  };

  const userId = getUserIdFromToken();
  const token = localStorage.getItem("token");

  try {
    console.log(token)
    const res = await axios.put(
      `http://localhost:5000/api/users/profile/${userId}`,
      fullUserData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Fixed this line
        },
      }
    );
    console.log("✅ User updated:", res.data);
    navigate("/dashboard");
  } catch (error) {
    console.error("❌ Error updating user:", error);
  }
};


  return (
    <>
      {step === 1 && <DemographicForm onNext={handleNext} />}
      {step === 2 && (
        <PersonalityForm onBack={() => setStep(1)} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default UserProfile;
