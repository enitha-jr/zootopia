const path = require("path");
const clinicsRaw = require(path.join(__dirname, "../../public/data/clinics.json"));

class locationController {
    getClinics = async (req, res) => {
        const { location } = req.params;

        try {
            // Convert the clinics data to an proper json object
            const fieldLabels = clinicsRaw.fields.map(f => f.label);
            const clinics = clinicsRaw.data.map(row => {
                let obj = {};
                row.forEach((value, index) => {
                    obj[fieldLabels[index]] = value;
                });
                return obj;
            });

            //Filter by location in ANY field
            const filteredClinics = clinics.filter(clinic =>
                Object.values(clinic).some(val =>
                    String(val).toLowerCase() === location.toLowerCase()
                )
            );
            if (filteredClinics.length === 0) {
                return res.status(200).json({ message: "No clinics found for this location" });
            }
            res.json(filteredClinics);
        } catch (error) {
            console.error("Error fetching clinics:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}

module.exports = new locationController();
