const Department = require("../models/departments");
const moment = require('moment');
// Controller: Get all departments


const sampleData = [
  {
      "name": "Solomon Gizaw",
      "Id": null,
      "employment_date": "July 1, 2018"
  },
  {
      "name": "Biniyam Tafete",
      "Id": null,
      "employment_date": "August 27, 2018"
  },
  {
      "name": "Mekdim Getahun",
      "Id": null,
      "employment_date": "May 9, 2019"
  },
  {
      "name": "Sisay Ashine",
      "Id": null,
      "employment_date": "July 1, 2022"
  },
  {
      "name": "Berutawit Fasil",
      "Id": null,
      "employment_date": "October 20, 2022"
  },
  {
      "name": "Mekdes Mintesinot",
      "Id": null,
      "employment_date": "December 10, 2022"
  },
  {
      "name": "Frehiwot Belay",
      "Id": "6062",
      "employment_date": "February 6, 2023"
  },
  {
      "name": "Bekelu Shiferaw",
      "Id": null,
      "employment_date": "December 3, 2019"
  },
  {
      "name": "Dr. Hayat Dino",
      "Id": null,
      "employment_date": "May 17, 2023"
  },
  {
      "name": "Yonatan Belayneh",
      "Id": null,
      "employment_date": "June 2, 2023"
  },
  {
      "name": "Nebiyu Mikre",
      "Id": null,
      "employment_date": "November 10, 2020"
  },
  {
      "name": "Yordanos Alemu",
      "Id": null,
      "employment_date": "August 21, 2018"
  },
  {
      "name": "Zelalem Fikre",
      "Id": null,
      "employment_date": "September 1, 2019"
  },
  {
      "name": "Hamelmal Alemnew",
      "Id": "1004",
      "employment_date": "October 31, 2022"
  },
  {
      "name": "Ermiyas T/Tsadik",
      "Id": null,
      "employment_date": "August 7, 2018"
  },
  {
      "name": "Etagegn Bizuwork",
      "Id": "1002",
      "employment_date": "September 21, 2022"
  },
  {
      "name": "Fitum Hailu",
      "Id": null,
      "employment_date": "August 12, 2019"
  },
  {
      "name": "Kebede Berecha",
      "Id": "1012",
      "employment_date": "May 9, 2020"
  },
  {
      "name": "Mahilet Hailu",
      "Id": null,
      "employment_date": "May 9, 2020"
  },
  {
      "name": "Mulu Mola",
      "Id": "1005",
      "employment_date": "March 29, 2022"
  },
  {
      "name": "Samrawit Mesfin",
      "Id": "6041",
      "employment_date": "October 7, 2022"
  },
  {
      "name": "Selamawit Tadesse",
      "Id": "1006",
      "employment_date": "September 21, 2022"
  },
  {
      "name": "Sisaynsh Tassaew",
      "Id": "1007",
      "employment_date": "May 20, 2018"
  },
  {
      "name": "Tesfansh Ayele",
      "Id": "1008",
      "employment_date": "May 3, 2022"
  },
  {
      "name": "Tigist Ashagre",
      "Id": "1010",
      "employment_date": "September 30, 2022"
  },
  {
      "name": "Tigist Belete",
      "Id": null,
      "employment_date": "April 9, 2018"
  },
  {
      "name": "Tiruwork Hassen",
      "Id": "4050",
      "employment_date": "August 11, 2022"
  },
  {
      "name": "Wudie Belay",
      "Id": "1011",
      "employment_date": "November 23, 2020"
  },
  {
      "name": "Esayas Fekadu",
      "Id": "1013",
      "employment_date": "April 13, 2018"
  },
  {
      "name": "Abinet Girma",
      "Id": "1117",
      "employment_date": "November 10, 2022"
  },
  {
      "name": "Firehiwot Abaynhe",
      "Id": "1103",
      "employment_date": "October 22, 2022"
  },
  {
      "name": "Mare Demoz",
      "Id": "1104",
      "employment_date": "October 22, 2022"
  },
  {
      "name": "Miraf Degefu",
      "Id": "1107",
      "employment_date": "October 22, 2022"
  },
  {
      "name": "Sindu Siyoum",
      "Id": "1118",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Tizita Kurgesa",
      "Id": "1112",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Yeshihareg Tesfaye",
      "Id": "1113",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Zumra Sindew",
      "Id": "1115",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Abel Mekuriya",
      "Id": "2001",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Eyob Kefyalew",
      "Id": "2008",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Girma Mekbebe",
      "Id": "2010",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Leul Samueal",
      "Id": "2014",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Nahom Eliyas",
      "Id": "3005",
      "employment_date": "July 8, 2022"
  },
  {
      "name": "Natneal Fekadu",
      "Id": "2016",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Ruth Alemu",
      "Id": "3006",
      "employment_date": "July 23, 2022"
  },
  {
      "name": "Samueal Abelnhe",
      "Id": "2021",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Samueal Mengistu",
      "Id": "2023",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Tibebe Solomon",
      "Id": "2027",
      "employment_date": "June 1, 2022"
  },
  {
      "name": "Alemu Ayalew Freda",
      "Id": "4004",
      "employment_date": "August 3, 2022"
  },
  {
      "name": "Dawit Bireda Dessie",
      "Id": "4015",
      "employment_date": "August 3, 2022"
  },
  {
      "name": "Rahel Kidane Mekonen",
      "Id": "4039",
      "employment_date": "August 3, 2022"
  },
  {
      "name": "Yohannes Mulugeta Zewde",
      "Id": "4061",
      "employment_date": "August 3, 2022"
  },
  {
      "name": "Abeba Takele Aleme",
      "Id": "4001",
      "employment_date": "August 19, 2022"
  },
  {
      "name": "Amanueal Bekele",
      "Id": "4006",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Biniyam Tekeste",
      "Id": "4011",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Danieal G/Libanos",
      "Id": "4013",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Dawit Abebe",
      "Id": "4014",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Matiyas Bedelu",
      "Id": "4025",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Mekedm Emashhtew",
      "Id": "4027",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Mezgbe Gidey Ariha",
      "Id": "4031",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Natneal Mekonnen",
      "Id": "4035",
      "employment_date": "August 17, 2022"
  },
  {
      "name": "Shalom Sisay G/Mariyam",
      "Id": "4044",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Solomon Waka",
      "Id": "4047",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Tesgaye Kirose",
      "Id": "4052",
      "employment_date": "August 15, 2022"
  },
  {
      "name": "Yeabsira Ashenafi",
      "Id": "4058",
      "employment_date": "August 18, 2022"
  },
  {
      "name": "Abrham Kifle",
      "Id": "5003",
      "employment_date": "September 19, 2022"
  },
  {
      "name": "Yohanan Alemayhu",
      "Id": "5023",
      "employment_date": "September 19, 2022"
  },
  {
      "name": "Gizachew Abebe",
      "Id": "5012",
      "employment_date": "September 19, 2022"
  },
  {
      "name": "Yared Ayalew",
      "Id": "4056",
      "employment_date": "September 19, 2022"
  },
  {
      "name": "Beka Tegeene",
      "Id": "6002",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Dagmawi Alemayhu",
      "Id": "6005",
      "employment_date": "October 4, 2022"
  },
  {
      "name": "Ehitebirhane Tadesse",
      "Id": "6057",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Elshaday Dereje",
      "Id": "7012",
      "employment_date": "June 15, 2023"
  },
  {
      "name": "Ermiyas Lelisa",
      "Id": "6013",
      "employment_date": "October 7, 2022"
  },
  {
      "name": "Fasika Kedir",
      "Id": "5011",
      "employment_date": "September 19, 2022"
  },
  {
      "name": "Girum Zegeye",
      "Id": "6019",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Henok Kefelgn",
      "Id": "6021",
      "employment_date": "October 4, 2022"
  },
  {
      "name": "Hilina Dagne",
      "Id": "6022",
      "employment_date": "October 4, 2022"
  },
  {
      "name": "Kalab Yitayh",
      "Id": "6024",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Kirubel Kassahun",
      "Id": "6030",
      "employment_date": "October 4, 2022"
  },
  {
      "name": "Natnaeal Belay",
      "Id": "6039",
      "employment_date": "October 4, 2022"
  },
  {
      "name": "Sofonyas Teshome",
      "Id": "6046",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Kaleab Fekadu",
      "Id": "6025",
      "employment_date": "October 17, 2022"
  },
  {
      "name": "Kefale Getahun",
      "Id": "7003",
      "employment_date": "November 10, 2022"
  },
  {
      "name": "Tamir Worku",
      "Id": "6047",
      "employment_date": "October 7, 2022"
  },
  {
      "name": "Etsub Feleke",
      "Id": "1310",
      "employment_date": "December 15, 2022"
  },
  {
      "name": "Eyerus Asfaw",
      "Id": "1311",
      "employment_date": "December 10, 2022"
  },
  {
      "name": "Eyob Asnake",
      "Id": "1309",
      "employment_date": "December 10, 2022"
  },
  {
      "name": "Yonatan Mekonnen",
      "Id": "1307",
      "employment_date": "December 10, 2022"
  },
  {
      "name": "Setota Mulunhe",
      "Id": "7011",
      "employment_date": "November 3, 2022"
  },
  {
      "name": "Tsegaye Yohannis",
      "Id": "1302",
      "employment_date": "December 24, 2022"
  },
  {
      "name": "Abdulkerim Worku",
      "Id": "1351",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Amanueal Mengesha",
      "Id": "1342",
      "employment_date": "January 27, 2023"
  },
  {
      "name": "Chernet Tebebu",
      "Id": "1355",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Danieal Deke",
      "Id": "1356",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Robel Bira",
      "Id": "1363",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Tigist Teshale",
      "Id": "1367",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Yoseph Awraris",
      "Id": "1334",
      "employment_date": "December 10, 2022"
  },
  {
      "name": "Menal Ibrahim",
      "Id": "1361",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Milago Wondsen",
      "Id": "1362",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Robel Tekle",
      "Id": "1324",
      "employment_date": "January 23, 2023"
  },
  {
      "name": "Yordanos Gebre w/mariyam",
      "Id": "1404",
      "employment_date": "February 21, 2023"
  },
  {
      "name": "Abrham Tilahun",
      "Id": "1387",
      "employment_date": "February 21, 2023"
  },
  {
      "name": "Alazar Bezabhi",
      "Id": "1400",
      "employment_date": "January 23, 2023"
  },
  {
      "name": "Alazar Mebrata",
      "Id": "1416",
      "employment_date": "February 27, 2023"
  },
  {
      "name": "Dawit Demisew",
      "Id": "1357",
      "employment_date": "February 7, 2023"
  },
  {
      "name": "Elias  Mekuanent",
      "Id": "1333",
      "employment_date": "January 23, 2023"
  },
  {
      "name": "Ermiyas Yifru",
      "Id": "1396",
      "employment_date": "February 27, 2023"
  },
  {
      "name": "Fasika Geletu",
      "Id": "1392",
      "employment_date": "February 21, 2023"
  },
  {
      "name": "Legesse Fentahun",
      "Id": "1377",
      "employment_date": "February 17, 2023"
  },
  {
      "name": "Meseret Birhanu",
      "Id": "1390",
      "employment_date": "February 27, 2023"
  },
  {
      "name": "Tesfalem Alemu",
      "Id": "1414",
      "employment_date": "February 21, 2023"
  },
  {
      "name": "Yared Mulatu",
      "Id": "1402",
      "employment_date": "February 27, 2023"
  },
  {
      "name": "Zaid  Tesafaye",
      "Id": "1399",
      "employment_date": "February 27, 2023"
  },
  {
      "name": "Zerubabel Girma",
      "Id": "1329",
      "employment_date": "January 23, 2023"
  },
  {
      "name": "Elias Tadesse",
      "Id": "7101",
      "employment_date": "July 27, 2023"
  },
  {
      "name": "Ahemed Yimer",
      "Id": "7102",
      "employment_date": "August 2, 2023"
  },
  {
      "name": "Befikir Alemayehu",
      "Id": "7104",
      "employment_date": "August 15, 2023"
  },
  {
      "name": "Meron Tegenachew",
      "Id": "7105",
      "employment_date": "August 22, 2023"
  },
  {
      "name": "Markos Aklog",
      "Id": "7072",
      "employment_date": "August 09, 2023"
  }
] 




const getAllDepartments = (req, res) => {
  // Calculate total leave and add the same password field to each item
  const updatedData = sampleData.map((item) => {
    // Convert employment_date to the desired format
    const formattedDate = moment(item.employment_date, 'MMMM D, YYYY').toDate();
    
    // Calculate employment duration in months
    const currentDate = new Date();
    const employmentDurationInMonths =
      (currentDate.getFullYear() - formattedDate.getFullYear()) * 12 +
      (currentDate.getMonth() - formattedDate.getMonth());

    // Calculate total leaves based on the provided logic
    const totalLeaves =
      employmentDurationInMonths >= 24
        ? 18
        : employmentDurationInMonths >= 12
        ? 16
        : Math.floor(employmentDurationInMonths * 1.3);

    // Add the calculated totalLeaves field to the item
    item.total_leaves = totalLeaves;

    // Add the same password to each item
    item.password = '$2a$10$2imFfw.ljIn4UpDr1dU70ea6pbk3RkPtp15rCCkkQQd.J0diiD2Ey';

    // Update the employment_date field
    item.employment_date = formattedDate.toISOString();
    // add role
    item.role ='user'

    return item;
  });

  // Send the updated data as JSON response
  res.json(updatedData);
};
// Controller: Create a department
const createDepartment = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    // Extract department data from the request body
    const { name, description } = req.body;

    // Check if both name and description are provided
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    // Create a new department object
    const department = new Department({
      name,
      description,
    });

    // Save the department to the database
    department
      .save()
      .then((savedDepartment) => {
        res.status(201).json(savedDepartment);
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(401)
      .json({ msg: "you're not authorized to perform this task'" });
  }
};

// Controller: Get a department by ID
const getDepartmentById = (req, res) => {
  const { id } = req.params;

  Department.findById(id)
    .then((department) => {
      if (!department) {
        res.status(404).json({ error: "Department not found" });
      } else {
        res.json(department);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
};

// Controller: Update a department by ID
const updateDepartmentById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;
    const updatedDepartmentData = req.body;

    Department.findByIdAndUpdate(id, updatedDepartmentData, { new: true })
      .then((updatedDepartment) => {
        if (!updatedDepartment) {
          res.status(404).json({ error: "Department not found" });
        } else {
          res.json(updatedDepartment);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(401)
      .json({ msg: "you're not authorized to perform this task'" });
  }
};

// Controller: Delete a department by ID
const deleteDepartmentById = (req, res) => {
  if (req.user.role === "hr" || req.user.role === "admin") {
    const { id } = req.params;

    Department.findByIdAndRemove(id)
      .then((deletedDepartment) => {
        if (!deletedDepartment) {
          res.status(404).json({ error: "Department not found" });
        } else {
          res.status(204).json({ msg: "succesfully deleted" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  } else {
    res
      .status(401)
      .json({ msg: "you're not authorized to perform this task'" });
  }
};

module.exports = {
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
