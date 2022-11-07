import React from "react";
import AdoptCard from "../../components/AdoptCard/AdoptCard";
import "./Adopt.css";
const Adopt = () => {
  const [Pets, setPets] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .get("http://localhost:8000/adoption/showAllPets/")
      .then((res) => {
        console.log(res.data.pets);
        setPets(res.data.pets);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="pet-Adoption">
      <AdoptCard></AdoptCard>
      <AdoptCard></AdoptCard>
      <AdoptCard></AdoptCard>
      <AdoptCard></AdoptCard>
      <AdoptCard></AdoptCard>
      <AdoptCard></AdoptCard>
      <AdoptCard></AdoptCard>
    </div>
  );
};

export default Adopt;
