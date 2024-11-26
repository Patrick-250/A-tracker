import React, { useState, useEffect } from "react";
import axios from "axios";
import Inventory from "../../Pages/Inventory/Inventory";
import Card from "../../Components/Card/Card";
import "./Dashboard.scss";

const Dashboard = () => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalBeds, setTotalBeds] = useState(0);
  const [totalPowerStrips, setTotalPowerStrips] = useState(0);
  const [totalMedicalEquipment, setTotalMedicalEquipment] = useState(0);
  const [totalElectronicAppliances, setTotalElectronicAppliances] = useState(0);
  const [totalUpcomingMaintenance, setTotalUpcomingMaintenance] = useState(0);
  const [filterType, setFilterType] = useState("");
  const [assets, setAssets] = useState([]);
  const [upcomingMaintenanceAssets, setUpcomingMaintenanceAssets] = useState(
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const totalAssetsResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/dashboard/total-assets"
      );
      setTotalAssets(totalAssetsResponse.data.totalAssets);

      const totalBedsResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/dashboard/total-beds"
      );
      setTotalBeds(totalBedsResponse.data.totalBeds);

      const totalPowerStripsResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/dashboard/total-power-strips"
      );
      setTotalPowerStrips(totalPowerStripsResponse.data.totalPowerStrips);

      const totalMedicalEquipmentResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/dashboard/total-medical-equipment"
      );
      setTotalMedicalEquipment(
        totalMedicalEquipmentResponse.data.totalMedicalEquipment
      );

      const totalElectronicAppliancesResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL +
          "/dashboard/total-electronic-appliances"
      );
      setTotalElectronicAppliances(
        totalElectronicAppliancesResponse.data.totalElectronicAppliances
      );

      const totalUpcomingMaintenanceResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL +
          "/dashboard/total-upcoming-maintenance"
      );
      setTotalUpcomingMaintenance(
        totalUpcomingMaintenanceResponse.data.totalUpcomingMaintenance
      );

      const assetsResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/inventory"
      );
      setAssets(Array.isArray(assetsResponse.data) ? assetsResponse.data : []);

      const upcomingMaintenanceResponse = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/dashboard/upcoming-maintenance"
      );
      setUpcomingMaintenanceAssets(
        Array.isArray(upcomingMaintenanceResponse.data)
          ? upcomingMaintenanceResponse.data
          : []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAssetAdded = () => {
    fetchData();
  };

  const handleCardClick = (type) => {
    setFilterType(type);
  };

  const handleBackClick = () => {
    setFilterType("");
  };

  const filteredAssets = filterType
    ? assets.filter((asset) => asset.type === filterType)
    : assets;

  return (
    <div>
      {filterType === "" ? (
        <Card
          totalAssets={totalAssets}
          totalBeds={totalBeds}
          totalPowerStrips={totalPowerStrips}
          totalMedicalEquipment={totalMedicalEquipment}
          totalElectronicAppliances={totalElectronicAppliances}
          totalUpcomingMaintenance={totalUpcomingMaintenance}
          onCardClick={handleCardClick}
        />
      ) : (
        <div>
          <Inventory
            onAssetAdded={handleAssetAdded}
            assets={
              filterType === "Upcoming Maintenance"
                ? upcomingMaintenanceAssets
                : filteredAssets
            }
          />
          <button className="back" onClick={handleBackClick}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
