const db = require("../config/db");

const getStudent = async (req,res) =>{
    try{
        const data = await db.query("SELECT * FROM students");
        if(!data){
            return res.status(404).send({
                success: false,
                message: "no record found"
            })
        }
        res.status(200).send({
            success: true,
            message: "students records",
            totalStudents: data[0].length,
            data : data[0]
        })

    }catch(err){
        console.log(err)
    }
};

const getStudentById = async (req,res) =>{
    try{
        const id = req.params.id;
        // below command can lead to sql injection 
        // const data = db.query('SELECT * FROM students WHERE id='+id)
        // modify your query 
        console.log(id)
        const data = await db.query(`SELECT * FROM students WHERE id=?`,[
            id,
        ])
        console.log('SELECT * FROM students WHERE id=?',[
            id,
        ])
        if(!data){
            return res.status(404).send({
                success: false,
                message: "No Record Found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Desired record found",
            data: data[0]
        })
    }
    catch(err){
        res.send({
            success: false,
            error: err
        })
    };

};

const createUser = async (req,res) =>{
    try{
        const { name, rollno , fees, sclass, medium} = req.body;
        if(!name ||  !rollno || !fees || !sclass || !medium){
            return res.status(500).send({
                success: false,
                message: "all fields are compulsory"
            })
        }
        const data = await db.query("INSERT INTO students (name,rollno,fees,sclass,medium) VALUES (?, ?, ?, ?, ?)",[name, rollno, fees, sclass, medium]);
        if(!data){
            return res.send({
                success: false,
                message: "Something goes wrong, user not created"
            })
        }
        res.status(200).send({
            success: true,
            message: "User Created"
        })

    }catch(err){
        console.log(err)
    } 

};


module.exports = {getStudent, getStudentById, createUser}