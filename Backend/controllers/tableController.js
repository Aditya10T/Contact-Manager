const Table = require("../models/tableModel");
const sendMail = require("../utils/sendEmail");

// Adding a data in the table
exports.createTable = async (req, res) => {
  try {
    const { name, phone, email, hobbies } = req.body;

    if(!name || !email || !phone){
        return res.status(400).json({
            message:"Please provide all the required fields"
        })
    }
    
    // Existing email
    const existingEmail = await Table.findOne({email});
    if(existingEmail){
        return res.status(400).json({
            message:"Email already exists"
        })
    }

    // existing Phone Number
    const existingPhone = await Table.findOne({phone});
    if(existingPhone){
        return res.status(400).json({
            message:"Phone number already exists"
        })
    }
    console.log(name);
    const newRow = new Table({name,phone,email,hobbies});
    const savedRow = newRow.save();
    res.status(200).json(savedRow);
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal Server Error"
    });
  }
};

// Updating a row
exports.updateRow = async (req,res) => {
    try {
        const {_id, ...rest} = req.body;

        // check if id exists or not
        const existingRow = await Table.findById(_id);
        if(!existingRow){
            res.status(404).json({
                message:"Row doesn't exist"
            })
        }
        const data = await Table.updateOne({_id:_id},rest);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
};

// Deleting a Row
exports.deleteRow = async(req,res) => {
    try {
        console.log(req.params)
    const id = req.params.id;
    console.log(id)

    // check if id exists or not
    const existingRow = await Table.findById(id);
    if(!existingRow){
        res.status(404).json({
            message:"Row doesn't exist"
        })
    }
    await Table.findByIdAndDelete(id);
    res.status(200).json("Row deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
};

// Getting all the rows in the Table
exports.getRows = async (req,res) => {
    try {
        const data = await Table.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

// sending Mail
exports.mail = async (req,res) => {
    try {
        const email = "info@redpositive.in"
        const {selectedRows} = req.body;

        const tableRows = selectedRows.map(row => {
            return `<tr>
                        <td>${row.name}</td>
                        <td>${row.phone}</td>
                        <td>${row.email}</td>
                        <td>${row.hobbies.join(', ')}</td>
                    </tr>`;
        });
        
        const htmlTable = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows.join('')}
                </tbody>
            </table>
        `;

        await sendMail({
            email : email,
            subject : `Selected Data`,
            message : htmlTable,
        });
        res.status(200).json({
            success:true,
            message : "Email sent successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}