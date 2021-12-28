const mysql = require('mysql');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//My Function

function myFunction(query, renderpage, passvalue){
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        console.log(`Connected as ID` + connection.threadId);

        //use the connection
        connection.query(query, (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render(renderpage, passvalue);
            }
            else {
                console.log(err);
            }

            console.log(`The Data from user table: \n`, rows);

        });
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Render Login
exports.login = (req, res) => {
    res.render('login-page', {layout: false});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Render Login Auth
exports.loginauth = (req, res) => {
    //const login = req.params.login;
    //const password = req.params.password;

    console.log(req.params.id);
    
    if (login = 'admin'){
        if(password = 'admin'){
            res.render('home');
        }
    }
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//View Users
exports.view = (req, res) => {
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        //use the connection
        connection.query('SELECT * FROM user WHERE status="active"', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                let removedUser = req.query.removed
                res.render('home', {rows, removedUser});
            }
            else {
                console.log(err);
            }
        });
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Search Users
exports.search = (req, res) => {
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        let searchTerm = req.body.search;

        //use the connection
        connection.query('SELECT * FROM user WHERE ? AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ? OR emp_id LIKE ?)', [{"status":"active"},'%'+searchTerm +'%', '%'+searchTerm +'%', '%'+searchTerm +'%', '%'+searchTerm +'%'], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                //console.log(JSON.stringify(rows));
                res.render('home', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Render Add Users
exports.renderusers = (req, res) => {
    res.render('add-user');
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add Users
exports.adduser = (req, res) => {

    const { emp_id, first_name, middle_name, last_name, email, phone, address, sex, dob, civil_status, sp_firstname, sp_middlename, sp_lastname, sp_contact, sp_officename, appointment, position, salary_grade, doe, ldoe, eligible, eligibility, tin_num, gsis, philhealth, pagibig, sss} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('INSERT INTO user SET emp_id = ?, first_name = ?, middle_name = ?, last_name =?, email = ?, phone = ?, address = ?, sex = ?, dob = ?, civil_status = ?, sp_firstname = ?, sp_middlename =?, sp_lastname = ?, sp_contact = ?, sp_officename = ?, appointment = ?, position = ?, salary_grade = ?, doe = ?, ldoe = ?, eligible = ?, eligibility = ?, tin_num = ?, gsis = ?, philhealth = ?, pagibig = ?, sss = ?', [emp_id, first_name, middle_name, last_name, email, phone, address, sex, dob, civil_status, sp_firstname, sp_middlename, sp_lastname, sp_contact, sp_officename, appointment, position, salary_grade, doe, ldoe, eligible, eligibility, tin_num, gsis, philhealth, pagibig, sss], (err, rows) => {
            connection.release();
            if(!err){
                res.render('add-user', {alert: 'Employee ' + emp_id + ' - ' + last_name + ', ' + first_name + ' ' + middle_name + ' added successfuly.'});
            }
            else {
                console.log(err);
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Edit Users
exports.edituser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        const employee_id = req.params.id

        //use the connection
        connection.query('SELECT * FROM user WHERE id = ?', [employee_id], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('edit-user', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Update Users
exports.updateuser = (req, res) => {

    const { emp_id, first_name, middle_name, last_name, email, phone, address, sex, dob, civil_status, sp_firstname, sp_middlename, sp_lastname, sp_contact, sp_officename, appointment, position, salary_grade, doe, ldoe, eligible, eligibility, tin_num, gsis, philhealth, pagibig, sss } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        const employee_id = req.params.id   //get the user id

        //use the connection
        connection.query('UPDATE user SET emp_id = ?, first_name = ?, middle_name = ?, last_name =?, email = ?, phone = ?, address = ?, sex = ?, dob = ?, civil_status = ?, sp_firstname = ?, sp_middlename =?, sp_lastname = ?, sp_contact = ?, sp_officename = ?, appointment = ?, position = ?, salary_grade = ?, doe = ?, ldoe = ?, eligible = ?, eligibility = ?, tin_num = ?, gsis = ?, philhealth = ?, pagibig = ?, sss = ? WHERE id = ?', [emp_id, first_name, middle_name, last_name, email, phone, address, sex, dob, civil_status, sp_firstname, sp_middlename, sp_lastname, sp_contact, sp_officename, appointment, position, salary_grade, doe, ldoe, eligible, eligibility, tin_num, gsis, philhealth, pagibig, sss, employee_id], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.redirect('/');
            }
            else {
                console.log(err);
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Delete or Update to Removed Users
exports.deleteuser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        const employee_id = req.params.id
        //use the connection
        //if you want a delete,
        //connection.query('DELETE FROM user WHERE id = ?', [employee_id], (err, rows) => {
        connection.query('UPDATE user SET status = ? WHERE id = ?', ["deleted", employee_id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if(!err){
                let removedUser = encodeURIComponent('Employee successfully removed.')
                res.redirect('/?removed=' + removedUser);
            }
            else {
                console.log(err);
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//View Individual User
exports.viewuser = (req, res) => {
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        const employee_id = req.params.id
        //use the connection
        connection.query('SELECT * FROM user WHERE id = ?', [employee_id], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('view-user', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//View Employees in Leave MGMT
exports.viewempleave = (req, res) => {
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        //use the connection
        connection.query('SELECT *,  user.first_name, user.middle_name, user.last_name, user.position, user.appointment FROM empl_leave INNER JOIN user ON empl_leave.emp_id = user.emp_id', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('leave-mgmt', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Select Employees in Leave MGMT
exports.selectempl = (req, res) => {
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        //use the connection
        connection.query('SELECT * FROM user WHERE status="active"', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('leave-mgmt-add', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add Leave
exports.addleave = (req, res) => {

    const { emp_id, leave_type, leave_start, leave_end, num_days, remarks} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('INSERT INTO empl_leave SET emp_id = ?, leave_type = ?, leave_start = ?, leave_end = ?, num_days = ?, remarks = ?', [emp_id, leave_type, leave_start, leave_end, num_days, remarks], (err, rows) => {
            connection.release();
            if(!err){
                res.redirect('/leavemgmt');
            }
            else {
                console.log(err);
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Summary of Leave
exports.leavesummary = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        //use the connection
        connection.query('SELECT *,  user.first_name, user.middle_name, user.last_name, user.position, user.appointment, SUM(num_days) num_days FROM empl_leave INNER JOIN user ON empl_leave.emp_id = user.emp_id GROUP BY empl_leave.emp_id, leave_type', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('leave-mgmt-summary', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}


///////////////////////////// LOGIC CODES FOR JO CONTRIBUTION ///////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//View Employees in JO Contribution
exports.jocontri = (req, res) => {
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        //use the connection
        connection.query('SELECT *,  user.first_name, user.middle_name, user.last_name, user.position FROM emp_contribution INNER JOIN user ON emp_contribution.emp_id = user.emp_id', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('jocontribution', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Select Employees in Contribution Entry
exports.jocontribentry = (req, res) => {
    //Connecting to Database
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        //use the connection
        connection.query('SELECT * FROM user WHERE status="active"', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('jocontribution-add', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Add Leave
exports.addcontribution = (req, res) => {

    const { emp_id, collect_date, contri_type, remit_date, remit_amount, prn_num, ref_num, period, paid_thru} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('INSERT INTO emp_contribution SET emp_id = ?, collect_date = ?, contri_type = ?, remit_date = ?, remit_amount = ?, prn_num = ?, ref_num = ?, period = ?, paid_thru = ?', [emp_id, collect_date, contri_type, remit_date, remit_amount, prn_num, ref_num, period, paid_thru], (err, rows) => {
            connection.release();
            if(!err){
                res.redirect('/jocontri');
            }
            else {
                console.log(err);
            }
        });
    });
}

exports.jocontrisumm = (req, res) => {
    res.render('jocontribution-summary');
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Summary of Leave
exports.jocontrisumm = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
        //use the connection
        connection.query('SELECT *,  user.first_name, user.middle_name, user.last_name, user.position, SUM(remit_amount) remit_amount FROM emp_contribution INNER JOIN user ON emp_contribution.emp_id = user.emp_id GROUP BY emp_contribution.emp_id, contri_type', (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('jocontribution-summary', {rows});
            }
            else {
                console.log(err);
            }
        });
    });
}

